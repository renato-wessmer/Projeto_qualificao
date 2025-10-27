"""

Configurações da API

@file config.py
@author Renato Wessner dos Santos
@date 2025-10-26
@project SOS Libras - Sistema de Emergência em Libras
@copyright (c) 2025 Renato Wessner dos Santos

"""

import os
from pathlib import Path

# Diretórios base
BASE_DIR = Path(__file__).parent.parent
MODELS_DIR = BASE_DIR / "models" / "trained"
DATASET_DIR = BASE_DIR / "data" / "dataset"

# Configurações do modelo
MODEL_PATH = MODELS_DIR / "best_gesture_model.h5"
GESTURE_MAPPING_PATH = DATASET_DIR / "gesture_mapping.json"
DATASET_INFO_PATH = DATASET_DIR / "dataset_info.json"

# Configurações da API
HOST = "0.0.0.0"
PORT = 5000
DEBUG = True

# Configurações de upload
MAX_VIDEO_SIZE = 10 * 1024 * 1024  # 10 MB
ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mov', 'webm'}

# Configurações do MediaPipe
MEDIAPIPE_CONFIDENCE = 0.5
MEDIAPIPE_COMPLEXITY = 2

# Limiar de confiança para reconhecimento
CONFIDENCE_THRESHOLD = 0.6