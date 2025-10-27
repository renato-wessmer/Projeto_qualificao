"""

Carregador e gerenciador do modelo treinado

 @file model_loader.py
 @author Renato Wessner dos Santos
 @date 2025-10-26
 @project SOS Libras - Sistema de Emergência em Libras
 @copyright (c) 2025 Renato Wessner dos Santos
 
"""

import json
import numpy as np
import tensorflow as tf
from tensorflow import keras
from pathlib import Path
from typing import Dict, Tuple, List

class GestureModelLoader:
    def __init__(self, model_path: Path, gesture_mapping_path: Path, dataset_info_path: Path):
        """Inicializa o carregador do modelo"""
        
        self.model_path = model_path
        self.model = None
        self.gesture_mapping = None
        self.idx_to_gesture = None
        self.dataset_info = None
        
        # Carregar configurações
        self._load_mappings(gesture_mapping_path, dataset_info_path)
        
        # Carregar modelo
        self._load_model()
    
    def _load_mappings(self, gesture_mapping_path: Path, dataset_info_path: Path):
        """Carrega mapeamentos e informações do dataset"""
        
        with open(gesture_mapping_path, 'r') as f:
            self.gesture_mapping = json.load(f)
        
        # Criar mapeamento inverso
        self.idx_to_gesture = {v: k for k, v in self.gesture_mapping.items()}
        
        with open(dataset_info_path, 'r') as f:
            self.dataset_info = json.load(f)
        
        print(f"✅ Mapeamentos carregados:")
        print(f"  Gestos: {list(self.gesture_mapping.keys())}")
        print(f"  Classes: {self.dataset_info['num_classes']}")
    
    def _load_model(self):
        """Carrega o modelo treinado"""
        
        if not self.model_path.exists():
            raise FileNotFoundError(f"Modelo não encontrado em: {self.model_path}")
        
        print(f"📦 Carregando modelo de: {self.model_path}")
        self.model = keras.models.load_model(self.model_path)
        print(f"✅ Modelo carregado com sucesso!")
        
        # Mostrar informações do modelo
        print(f"  Input shape: {self.model.input_shape}")
        print(f"  Output shape: {self.model.output_shape}")
    
    def pad_sequence(self, sequence: np.ndarray) -> np.ndarray:
        """Padroniza sequência para o tamanho esperado"""
        
        target_length = self.dataset_info['sequence_length']
        
        if len(sequence) < target_length:
            # Preencher com zeros
            padding = np.zeros((target_length - len(sequence), sequence.shape[1]))
            padded_sequence = np.vstack([sequence, padding])
        elif len(sequence) > target_length:
            # Truncar
            padded_sequence = sequence[:target_length]
        else:
            padded_sequence = sequence
        
        return padded_sequence
    
    def predict(self, keypoints_sequence: np.ndarray) -> Tuple[str, float, Dict]:
        """
        Faz predição de um gesto
        
        Returns:
            gesture_name: Nome do gesto predito
            confidence: Confiança da predição (0-1)
            probabilities: Probabilidades de todas as classes
        """
        
        # Padronizar sequência
        padded_sequence = self.pad_sequence(keypoints_sequence)
        
        # Adicionar dimensão de batch
        input_data = np.expand_dims(padded_sequence, axis=0)
        
        # Fazer predição
        predictions = self.model.predict(input_data, verbose=0)
        
        # Obter classe predita e confiança
        predicted_idx = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_idx])
        
        # Mapear para nome do gesto
        gesture_name = self.idx_to_gesture.get(predicted_idx, "desconhecido")
        
        # Criar dicionário de probabilidades
        probabilities = {
            self.idx_to_gesture[i]: float(predictions[0][i])
            for i in range(len(predictions[0]))
        }
        
        return gesture_name, confidence, probabilities
    
    def predict_batch(self, keypoints_sequences: List[np.ndarray]) -> List[Tuple[str, float]]:
        """
        Faz predições em lote
        
        Returns:
            Lista de tuplas (gesture_name, confidence)
        """
        
        results = []
        
        for sequence in keypoints_sequences:
            gesture_name, confidence, _ = self.predict(sequence)
            results.append((gesture_name, confidence))
        
        return results