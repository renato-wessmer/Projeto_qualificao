"""

Script 3: Extrai keypoints (poses) usando MediaPipe
Entrada: data/frames/
Saída: data/keypoints/

@file 3_extract_keypoints.py
@author Renato Wessner dos Santos
@date 2025-10-26
@project SOS Libras - Sistema de Emergência em Libras
@copyright (c) 2025 Renato Wessner dos Santos

"""

import os
import cv2
import mediapipe as mp
import json
import numpy as np
from tqdm import tqdm

# Configurar MediaPipe
mp_holistic = mp.solutions.holistic
holistic = mp_holistic.Holistic(
    static_image_mode=True,
    min_detection_confidence=0.5,
    model_complexity=2
)

def extract_keypoints_from_frame(image_path):
    """Extrai keypoints de uma imagem"""
    
    image = cv2.imread(image_path)
    if image is None:
        return None
    
    img_height, img_width = image.shape[:2]
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    
    # Detectar keypoints
    results = holistic.process(image_rgb)
    
    keypoints = {}
    
    # Pose (corpo)
    if results.pose_landmarks:
        keypoints['pose'] = []
        for landmark in results.pose_landmarks.landmark:
            keypoints['pose'].extend([
                landmark.x,
                landmark.y,
                landmark.z,
                landmark.visibility
            ])
    else:
        keypoints['pose'] = [0.0] * (33 * 4)  # 33 pontos * 4 valores
    
    # Mão esquerda
    if results.left_hand_landmarks:
        keypoints['left_hand'] = []
        for landmark in results.left_hand_landmarks.landmark:
            keypoints['left_hand'].extend([
                landmark.x,
                landmark.y,
                landmark.z
            ])
    else:
        keypoints['left_hand'] = [0.0] * (21 * 3)  # 21 pontos * 3 valores
    
    # Mão direita
    if results.right_hand_landmarks:
        keypoints['right_hand'] = []
        for landmark in results.right_hand_landmarks.landmark:
            keypoints['right_hand'].extend([
                landmark.x,
                landmark.y,
                landmark.z
            ])
    else:
        keypoints['right_hand'] = [0.0] * (21 * 3)
    
    # Face
    if results.face_landmarks:
        keypoints['face'] = []
        for i, landmark in enumerate(results.face_landmarks.landmark):
            if i < 70:  # Usar apenas primeiros 70 pontos
                keypoints['face'].extend([
                    landmark.x,
                    landmark.y,
                    landmark.z
                ])
    else:
        keypoints['face'] = [0.0] * (70 * 3)
    
    # Preencher face até 70 pontos se necessário
    if len(keypoints['face']) < 210:
        keypoints['face'].extend([0.0] * (210 - len(keypoints['face'])))
    
    return keypoints

def process_video_frames(frames_folder, output_folder):
    """Processa todos os frames de um vídeo"""
    
    frame_files = sorted([f for f in os.listdir(frames_folder) if f.endswith('.png')])
    
    video_keypoints = []
    
    for frame_file in frame_files:
        frame_path = os.path.join(frames_folder, frame_file)
        keypoints = extract_keypoints_from_frame(frame_path)
        
        if keypoints:
            video_keypoints.append(keypoints)
    
    # Salvar keypoints do vídeo
    output_file = os.path.join(output_folder, 'keypoints.json')
    with open(output_file, 'w') as f:
        json.dump(video_keypoints, f)
    
    return len(video_keypoints)

def extract_all_keypoints():
    """Extrai keypoints de todos os vídeos"""
    
    frames_dir = "data/frames"
    keypoints_dir = "data/keypoints"
    
    gesture_folders = [f for f in os.listdir(frames_dir) 
                      if os.path.isdir(os.path.join(frames_dir, f))]
    
    print(f"📁 Processando {len(gesture_folders)} gestos")
    
    total_videos = 0
    
    for gesture_folder in gesture_folders:
        input_gesture_folder = os.path.join(frames_dir, gesture_folder)
        output_gesture_folder = os.path.join(keypoints_dir, gesture_folder)
        os.makedirs(output_gesture_folder, exist_ok=True)
        
        video_folders = [f for f in os.listdir(input_gesture_folder)
                        if os.path.isdir(os.path.join(input_gesture_folder, f))]
        
        print(f"\n🎬 Gesto: {gesture_folder} ({len(video_folders)} vídeos)")
        
        for video_folder in tqdm(video_folders, desc="Extraindo keypoints"):
            frames_folder = os.path.join(input_gesture_folder, video_folder)
            output_folder = os.path.join(output_gesture_folder, video_folder)
            os.makedirs(output_folder, exist_ok=True)
            
            num_frames = process_video_frames(frames_folder, output_folder)
            total_videos += 1
    
    holistic.close()
    print(f"\n✅ KEYPOINTS EXTRAÍDOS DE {total_videos} VÍDEOS!")

if __name__ == "__main__":
    extract_all_keypoints()