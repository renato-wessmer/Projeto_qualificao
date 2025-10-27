"""

Script 1: Remove fundo verde dos vídeos e coloca fundo branco
Entrada: data/raw_videos/
Saída: data/processed_videos/

 @file 1_remove_background.py
 @author Renato Wessner dos Santos
 @date 2025-10-26
 @project SOS Libras - Sistema de Emergência em Libras
 @copyright (c) 2025 Renato Wessner dos Santos

"""

import os
import cv2
from rembg import remove
from PIL import Image
import numpy as np
from tqdm import tqdm

def remove_green_background(video_path, output_path):
    """Remove fundo verde de um vídeo e salva com fundo branco"""
    
    # Abrir vídeo
    cap = cv2.VideoCapture(video_path)
    
    # Propriedades do vídeo
    fps = int(cap.get(cv2.CAP_PROP_FPS))
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    
    # Criar escritor de vídeo
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(output_path, fourcc, fps, (width, height))
    
    frame_count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    
    for _ in tqdm(range(frame_count), desc=f"Processando {os.path.basename(video_path)}"):
        ret, frame = cap.read()
        if not ret:
            break
        
        # Converter para PIL Image
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        pil_image = Image.fromarray(frame_rgb)
        
        # Remover fundo
        output_image = remove(pil_image)
        
        # Criar fundo branco
        white_bg = Image.new("RGB", output_image.size, (255, 255, 255))
        white_bg.paste(output_image, (0, 0), output_image)
        
        # Converter de volta para OpenCV
        frame_processed = cv2.cvtColor(np.array(white_bg), cv2.COLOR_RGB2BGR)
        
        # Escrever frame
        out.write(frame_processed)
    
    cap.release()
    out.release()
    print(f"✅ Processado: {output_path}")

def process_all_videos():
    """Processa todos os vídeos da pasta raw_videos"""
    
    raw_dir = "data/raw_videos"
    processed_dir = "data/processed_videos"
    
    # Criar pasta de saída
    os.makedirs(processed_dir, exist_ok=True)
    
    # Listar todas as pastas de gestos
    gesture_folders = [f for f in os.listdir(raw_dir) if os.path.isdir(os.path.join(raw_dir, f))]
    
    print(f"📁 Encontradas {len(gesture_folders)} pastas de gestos")
    
    for gesture_folder in gesture_folders:
        input_folder = os.path.join(raw_dir, gesture_folder)
        output_folder = os.path.join(processed_dir, gesture_folder)
        os.makedirs(output_folder, exist_ok=True)
        
        # Listar vídeos
        videos = [f for f in os.listdir(input_folder) if f.endswith(('.mp4', '.avi', '.mov'))]
        
        print(f"\n🎬 Processando gesto: {gesture_folder} ({len(videos)} vídeos)")
        
        for video_file in videos:
            input_path = os.path.join(input_folder, video_file)
            output_path = os.path.join(output_folder, video_file)
            
            # Pular se já processado
            if os.path.exists(output_path):
                print(f"⏭️  Pulando (já existe): {video_file}")
                continue
            
            remove_green_background(input_path, output_path)
    
    print("\n✅ TODOS OS VÍDEOS PROCESSADOS!")

if __name__ == "__main__":
    process_all_videos()