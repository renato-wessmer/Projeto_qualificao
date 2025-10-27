"""

Script 2: Extrai frames dos vídeos processados
Entrada: data/processed_videos/
Saída: data/frames/

@file 2_extract_frames.py
@author Renato Wessner dos Santos
@date 2025-10-26
@project SOS Libras - Sistema de Emergência em Libras
@copyright (c) 2025 Renato Wessner dos Santos

"""

import os
import cv2
from tqdm import tqdm

def extract_frames(video_path, output_folder, max_frames=30):
    """Extrai frames de um vídeo"""
    
    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    
    # Calcular step para pegar frames uniformemente
    step = max(1, total_frames // max_frames)
    
    frame_idx = 0
    saved_count = 0
    
    while cap.isOpened() and saved_count < max_frames:
        ret, frame = cap.read()
        if not ret:
            break
        
        # Salvar frame a cada 'step' frames
        if frame_idx % step == 0:
            frame_name = f"frame_{saved_count:03d}.png"
            frame_path = os.path.join(output_folder, frame_name)
            cv2.imwrite(frame_path, frame)
            saved_count += 1
        
        frame_idx += 1
    
    cap.release()
    return saved_count

def extract_all_frames():
    """Extrai frames de todos os vídeos"""
    
    processed_dir = "data/processed_videos"
    frames_dir = "data/frames"
    
    gesture_folders = [f for f in os.listdir(processed_dir) 
                      if os.path.isdir(os.path.join(processed_dir, f))]
    
    print(f"📁 Processando {len(gesture_folders)} pastas de gestos")
    
    for gesture_folder in gesture_folders:
        input_folder = os.path.join(processed_dir, gesture_folder)
        
        videos = [f for f in os.listdir(input_folder) 
                 if f.endswith(('.mp4', '.avi', '.mov'))]
        
        print(f"\n🎬 Gesto: {gesture_folder} ({len(videos)} vídeos)")
        
        for video_file in tqdm(videos, desc="Extraindo frames"):
            video_path = os.path.join(input_folder, video_file)
            video_name = os.path.splitext(video_file)[0]
            
            # Criar pasta para os frames deste vídeo
            output_folder = os.path.join(frames_dir, gesture_folder, video_name)
            os.makedirs(output_folder, exist_ok=True)
            
            # Extrair frames
            num_frames = extract_frames(video_path, output_folder)
            # print(f"  ✅ {video_file}: {num_frames} frames extraídos")
    
    print("\n✅ TODOS OS FRAMES EXTRAÍDOS!")

if __name__ == "__main__":
    extract_all_frames()