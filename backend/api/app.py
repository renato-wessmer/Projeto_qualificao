"""

Aplicação Flask principal

@file app.py
@author Renato Wessner dos Santos
@date 2025-10-26
@project SOS Libras - Sistema de Emergência em Libras
@copyright (c) 2025 Renato Wessner dos Santos

"""

from flask import Flask, jsonify
from flask_cors import CORS
from .routes.gesture import gesture_bp, init_handlers
from . import config
import os

def create_app():
    """Factory para criar aplicação Flask"""
    
    app = Flask(__name__)
    
    # Configurar CORS
    CORS(app, resources={
        r"/api/*": {
            "origins": "*",  # Em produção, especifique o domínio do frontend
            "methods": ["GET", "POST", "OPTIONS"],
            "allow_headers": ["Content-Type"]
        }
    })
    
    # Registrar blueprints
    app.register_blueprint(gesture_bp, url_prefix='/api')
    
    # Rota raiz
    @app.route('/')
    def index():
        return jsonify({
            'message': 'SOS Libras API',
            'version': '1.0.0',
            'endpoints': {
                'health': '/api/health',
                'gestures': '/api/gestures',
                'recognize': '/api/recognize (POST)',
                'recognize_sequence': '/api/recognize-sequence (POST)'
            }
        })
    
    # Tratamento de erros
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Endpoint não encontrado'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'error': 'Erro interno do servidor'}), 500
    
    # Inicializar handlers no startup
    with app.app_context():
        print("🚀 Inicializando API...")
        init_handlers()
        print("✅ API pronta!")
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(
        host=config.HOST,
        port=config.PORT,
        debug=config.DEBUG
    )