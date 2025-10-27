"""

Script 4: Prepara dataset final para treinamento
Entrada: data/keypoints/
Saída: data/dataset/train.npy, data/dataset/val.npy, data/dataset/test.npy

 @file 4_prepare_dataset.py
 @author Renato Wessner dos Santos
 @date 2025-10-26
 @project SOS Libras - Sistema de Emergência em Libras
 @copyright (c) 2025 Renato Wessner dos Santos

"""

import os
import json
import numpy as np
from sklearn.model_selection import train_test_split
import pickle

def load_keypoints_sequence(video_keypoints_path):
    """Carrega sequência de keypoints de um vídeo"""
    
    with open(video_keypoints_path, 'r') as f:
        keypoints_list = json.load(f)
    
    # Concatenar todos os keypoints de cada frame em um vetor
    sequence = []
    for frame_kp in keypoints_list:
        # Juntar pose + mãos + face
        frame_vector = (
            frame_kp['pose'] + 
            frame_kp['left_hand'] + 
            frame_kp['right_hand'] + 
            frame_kp['face']
        )
        sequence.append(frame_vector)
    
    return np.array(sequence)

def prepare_dataset():
    """Prepara dataset completo"""
    
    keypoints_dir = "data/keypoints"
    output_dir = "data/dataset"
    os.makedirs(output_dir, exist_ok=True)
    
    # Mapear nomes de gestos para índices
    gesture_folders = sorted([f for f in os.listdir(keypoints_dir) 
                             if os.path.isdir(os.path.join(keypoints_dir, f))])
    
    gesture_to_idx = {gesture: idx for idx, gesture in enumerate(gesture_folders)}
    
    print(f"📊 Gestos encontrados: {gesture_folders}")
    print(f"📊 Mapeamento: {gesture_to_idx}")
    
    # Salvar mapeamento
    with open(os.path.join(output_dir, 'gesture_mapping.json'), 'w') as f:
        json.dump(gesture_to_idx, f, indent=2)
    
    X = []  # Sequências de keypoints
    y = []  # Labels (índices dos gestos)
    
    max_sequence_length = 0
    
    print("\n📦 Carregando dados...")
    
    for gesture_name in gesture_folders:
        gesture_path = os.path.join(keypoints_dir, gesture_name)
        gesture_idx = gesture_to_idx[gesture_name]
        
        video_folders = [f for f in os.listdir(gesture_path)
                        if os.path.isdir(os.path.join(gesture_path, f))]
        
        print(f"  🎬 {gesture_name}: {len(video_folders)} vídeos")
        
        for video_folder in video_folders:
            keypoints_file = os.path.join(gesture_path, video_folder, 'keypoints.json')
            
            if not os.path.exists(keypoints_file):
                continue
            
            try:
                sequence = load_keypoints_sequence(keypoints_file)
                
                if len(sequence) > 0:
                    X.append(sequence)
                    y.append(gesture_idx)
                    max_sequence_length = max(max_sequence_length, len(sequence))
            
            except Exception as e:
                print(f"    ⚠️ Erro em {video_folder}: {e}")
    
    print(f"\n✅ Carregados {len(X)} vídeos")
    print(f"📏 Sequência mais longa: {max_sequence_length} frames")
    
    # Padronizar todas as sequências para o mesmo tamanho
    print(f"\n🔧 Padronizando sequências para {max_sequence_length} frames...")
    
    X_padded = []
    for sequence in X:
        if len(sequence) < max_sequence_length:
            # Preencher com zeros
            padding = np.zeros((max_sequence_length - len(sequence), sequence.shape[1]))
            padded_sequence = np.vstack([sequence, padding])
        else:
            padded_sequence = sequence
        
        X_padded.append(padded_sequence)
    
    X_padded = np.array(X_padded)
    y = np.array(y)
    
    print(f"📊 Shape final: X={X_padded.shape}, y={y.shape}")
    
    # Dividir em treino/validação/teste (70%/15%/15%)
    X_train, X_temp, y_train, y_temp = train_test_split(
        X_padded, y, test_size=0.3, random_state=42, stratify=y
    )
    
    X_val, X_test, y_val, y_test = train_test_split(
        X_temp, y_temp, test_size=0.5, random_state=42, stratify=y_temp
    )
    
    print(f"\n📂 Divisão do dataset:")
    print(f"  Treino: {len(X_train)} samples")
    print(f"  Validação: {len(X_val)} samples")
    print(f"  Teste: {len(X_test)} samples")
    
    # Salvar datasets
    np.save(os.path.join(output_dir, 'X_train.npy'), X_train)
    np.save(os.path.join(output_dir, 'y_train.npy'), y_train)
    np.save(os.path.join(output_dir, 'X_val.npy'), X_val)
    np.save(os.path.join(output_dir, 'y_val.npy'), y_val)
    np.save(os.path.join(output_dir, 'X_test.npy'), X_test)
    np.save(os.path.join(output_dir, 'y_test.npy'), y_test)
    
    # Salvar informações do dataset
    dataset_info = {
        'num_classes': len(gesture_folders),
        'gestures': gesture_folders,
        'sequence_length': max_sequence_length,
        'feature_dim': X_padded.shape[2],
        'train_size': len(X_train),
        'val_size': len(X_val),
        'test_size': len(X_test)
    }
    
    with open(os.path.join(output_dir, 'dataset_info.json'), 'w') as f:
        json.dump(dataset_info, f, indent=2)
    
    print(f"\n✅ DATASET PREPARADO E SALVO EM {output_dir}/")
    print(f"📊 Info: {dataset_info}")

if __name__ == "__main__":
    prepare_dataset()