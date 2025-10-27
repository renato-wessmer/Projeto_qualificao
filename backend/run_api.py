"""
Script para iniciar a API
"""

from api.app import create_app
from api import config

if __name__ == '__main__':
    print("="*70)
    print("🚀 SOS LIBRAS API")
    print("="*70)
    print(f"🌐 Host: {config.HOST}:{config.PORT}")
    print(f"📁 Modelo: {config.MODEL_PATH}")
    print(f"🐛 Debug: {config.DEBUG}")
    print("="*70)
    
    app = create_app()
    app.run(
        host=config.HOST,
        port=config.PORT,
        debug=config.DEBUG
    )