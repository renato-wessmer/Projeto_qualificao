"""

Handler do MediaPipe para extração de keypoints

@file mediapipe_handler.py
@author Renato Wessner dos Santos
@date 2025-10-26
@project SOS Libras - Sistema de Emergência em Libras
@copyright (c) 2025 Renato Wessner dos Santos

"""

import cv2
import mediapipe as mp
import numpy as np
from typing import List, Dict, Optional

class MediaPipeHandler:
    def __init__(self, confidence=0.5, complexity=2):
        """Inicializa MediaPipe"""
        self.mp_holistic = mp.solutions.holistic
        self.holistic = self.mp_holistic.Holistic(
            static_image_mode=False,
            min_detection_confidence=confidence,
            model_complexity=complexity
        )
    
    def extract_keypoints_from_frame(self, frame: np.ndarray) -> Optional[Dict]:
        """Extrai keypoints de um frame"""
        
        # Converter para RGB
        image_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
        # Processar com MediaPipe
        results = self.holistic.process(image_rgb)
        
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
            keypoints['pose'] = [0.0] * (33 * 4)
        
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
            keypoints['left_hand'] = [0.0] * (21 * 3)
        
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
                if i < 70:
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
    
    def extract_keypoints_from_video(self, video_path: str, max_frames: int = 30) -> List[np.ndarray]:
        """Extrai keypoints de todos os frames de um vídeo"""
        
        cap = cv2.VideoCapture(video_path)
        total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
        
        # Calcular step para pegar frames uniformemente
        step = max(1, total_frames // max_frames)
        
        keypoints_sequence = []
        frame_idx = 0
        
        while cap.isOpened() and len(keypoints_sequence) < max_frames:
            ret, frame = cap.read()
            if not ret:
                break
            
            # Processar frame a cada 'step' frames
            if frame_idx % step == 0:
                keypoints = self.extract_keypoints_from_frame(frame)
                
                if keypoints:
                    # Concatenar todos os keypoints em um vetor
                    frame_vector = (
                        keypoints['pose'] + 
                        keypoints['left_hand'] + 
                        keypoints['right_hand'] + 
                        keypoints['face']
                    )
                    keypoints_sequence.append(frame_vector)
            
            frame_idx += 1
        
        cap.release()
        
        return np.array(keypoints_sequence)
    
    def extract_keypoints_from_bytes(self, video_bytes: bytes, max_frames: int = 30) -> List[np.ndarray]:
        """Extrai keypoints de vídeo em bytes"""
        
        # Salvar temporariamente
        import tempfile
        with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as tmp_file:
            tmp_file.write(video_bytes)
            tmp_path = tmp_file.name
        
        # Extrair keypoints
        keypoints = self.extract_keypoints_from_video(tmp_path, max_frames)
        
        # Remover arquivo temporário
        import os
        os.remove(tmp_path)
        
        return keypoints
    
    def close(self):
        """Fecha o MediaPipe"""
        self.holistic.close()