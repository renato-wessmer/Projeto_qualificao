"""

Rotas da API de reconhecimento de gestos

@file gesture.py
@author Renato Wessner dos Santos
@date 2025-10-26
@project SOS Libras - Sistema de Emergência em Libras
@copyright (c) 2025 Renato Wessner dos Santos

"""

from flask import Blueprint, request, jsonify
from werkzeug.utils import secure_filename
import os
import tempfile
from ..utils.mediapipe_handler import MediaPipeHandler
from ..utils.model_loader import GestureModelLoader
from .. import config

gesture_bp = Blueprint('gesture', __name__)

# Inicializar handlers globais
mediapipe_handler = None
model_loader = None

def init_handlers():
    """Inicializa handlers (chamado no startup)"""
    global mediapipe_handler, model_loader
    
    if mediapipe_handler is None:
        print("🦴 Inicializando MediaPipe...")
        mediapipe_handler = MediaPipeHandler(
            confidence=config.MEDIAPIPE_CONFIDENCE,
            complexity=config.MEDIAPIPE_COMPLEXITY
        )
    
    if model_loader is None:
        print("🤖 Inicializando Model Loader...")
        model_loader = GestureModelLoader(
            model_path=config.MODEL_PATH,
            gesture_mapping_path=config.GESTURE_MAPPING_PATH,
            dataset_info_path=config.DATASET_INFO_PATH
        )

@gesture_bp.route('/health', methods=['GET'])
def health_check():
    """Verifica saúde da API"""
    return jsonify({
        'status': 'ok',
        'model_loaded': model_loader is not None,
        'mediapipe_ready': mediapipe_handler is not None
    })

@gesture_bp.route('/gestures', methods=['GET'])
def get_gestures():
    """Retorna lista de gestos disponíveis"""
    init_handlers()
    
    return jsonify({
        'gestures': list(model_loader.gesture_mapping.keys()),
        'num_classes': model_loader.dataset_info['num_classes']
    })

@gesture_bp.route('/recognize', methods=['POST'])
def recognize_gesture():
    """
    Reconhece gesto de um vídeo
    
    Body: multipart/form-data
        - video: arquivo de vídeo
    
    Response:
        - gesture: nome do gesto
        - confidence: confiança (0-1)
        - probabilities: dict com probabilidades de cada classe
    """
    
    init_handlers()
    
    # Verificar se arquivo foi enviado
    if 'video' not in request.files:
        return jsonify({'error': 'Nenhum vídeo enviado'}), 400
    
    video_file = request.files['video']
    
    if video_file.filename == '':
        return jsonify({'error': 'Nome de arquivo vazio'}), 400
    
    try:
        # Salvar arquivo temporariamente
        with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as tmp_file:
            video_file.save(tmp_file.name)
            tmp_path = tmp_file.name
        
        # Extrair keypoints
        print(f"📹 Extraindo keypoints do vídeo...")
        keypoints_sequence = mediapipe_handler.extract_keypoints_from_video(tmp_path)
        
        if len(keypoints_sequence) == 0:
            return jsonify({'error': 'Não foi possível extrair keypoints do vídeo'}), 400
        
        print(f"✅ {len(keypoints_sequence)} frames processados")
        
        # Fazer predição
        print(f"🤖 Realizando predição...")
        gesture_name, confidence, probabilities = model_loader.predict(keypoints_sequence)
        
        # Remover arquivo temporário
        os.remove(tmp_path)
        
        # Verificar confiança mínima
        if confidence < config.CONFIDENCE_THRESHOLD:
            return jsonify({
                'gesture': 'incerto',
                'confidence': confidence,
                'message': f'Confiança abaixo do limiar ({config.CONFIDENCE_THRESHOLD})',
                'probabilities': probabilities
            }), 200
        
        return jsonify({
            'gesture': gesture_name,
            'confidence': confidence,
            'probabilities': probabilities,
            'num_frames': len(keypoints_sequence)
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@gesture_bp.route('/recognize-sequence', methods=['POST'])
def recognize_sequence():
    """
    Reconhece sequência de gestos (ex: CEP)
    
    Body: multipart/form-data
        - videos[]: múltiplos arquivos de vídeo
    
    Response:
        - sequence: lista de gestos reconhecidos
        - formatted: sequência formatada (ex: CEP)
    """
    
    init_handlers()
    
    # Verificar se arquivos foram enviados
    if 'videos' not in request.files:
        return jsonify({'error': 'Nenhum vídeo enviado'}), 400
    
    video_files = request.files.getlist('videos')
    
    if len(video_files) == 0:
        return jsonify({'error': 'Lista de vídeos vazia'}), 400
    
    try:
        results = []
        
        for idx, video_file in enumerate(video_files):
            print(f"\n📹 Processando vídeo {idx + 1}/{len(video_files)}...")
            
            # Salvar arquivo temporariamente
            with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as tmp_file:
                video_file.save(tmp_file.name)
                tmp_path = tmp_file.name
            
            # Extrair keypoints
            keypoints_sequence = mediapipe_handler.extract_keypoints_from_video(tmp_path)
            
            # Fazer predição
            gesture_name, confidence, _ = model_loader.predict(keypoints_sequence)
            
            results.append({
                'gesture': gesture_name,
                'confidence': confidence,
                'index': idx
            })
            
            # Remover arquivo temporário
            os.remove(tmp_path)
        
        # Extrair sequência de gestos
        sequence = [r['gesture'] for r in results]
        
        # Formatar (assumindo números para CEP)
        formatted = ''.join(sequence)
        
        # Se for CEP (8 dígitos), formatar
        if len(formatted) == 8 and formatted.isdigit():
            formatted = f"{formatted[:5]}-{formatted[5:]}"
        
        return jsonify({
            'sequence': sequence,
            'formatted': formatted,
            'details': results,
            'count': len(results)
        }), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500