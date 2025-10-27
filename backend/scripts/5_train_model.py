"""

Script 5: Treina modelo LSTM para reconhecimento de gestos
Entrada: data/dataset/
Saída: models/trained/gesture_model.h5

 @file 5_train_model.py
 @author Renato Wessner dos Santos
 @date 2025-10-26
 @project SOS Libras - Sistema de Emergência em Libras
 @copyright (c) 2025 Renato Wessner dos Santos

"""

import os
import json
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras.callbacks import ModelCheckpoint, EarlyStopping, ReduceLROnPlateau
import matplotlib.pyplot as plt
from datetime import datetime

def build_model(sequence_length, feature_dim, num_classes):
    """Constrói modelo LSTM para classificação de gestos"""
    
    model = keras.Sequential([
        # Input layer
        layers.Input(shape=(sequence_length, feature_dim)),
        
        # Camadas LSTM
        layers.LSTM(128, return_sequences=True, dropout=0.3),
        layers.LSTM(64, return_sequences=True, dropout=0.3),
        layers.LSTM(32, dropout=0.3),
        
        # Camadas Dense
        layers.Dense(64, activation='relu'),
        layers.Dropout(0.4),
        layers.Dense(32, activation='relu'),
        layers.Dropout(0.3),
        
        # Output layer
        layers.Dense(num_classes, activation='softmax')
    ])
    
    return model

def plot_training_history(history, save_path):
    """Plota histórico de treinamento"""
    
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 5))
    
    # Accuracy
    ax1.plot(history.history['accuracy'], label='Train Accuracy')
    ax1.plot(history.history['val_accuracy'], label='Val Accuracy')
    ax1.set_title('Model Accuracy')
    ax1.set_xlabel('Epoch')
    ax1.set_ylabel('Accuracy')
    ax1.legend()
    ax1.grid(True)
    
    # Loss
    ax2.plot(history.history['loss'], label='Train Loss')
    ax2.plot(history.history['val_loss'], label='Val Loss')
    ax2.set_title('Model Loss')
    ax2.set_xlabel('Epoch')
    ax2.set_ylabel('Loss')
    ax2.legend()
    ax2.grid(True)
    
    plt.tight_layout()
    plt.savefig(save_path)
    print(f"📊 Gráfico salvo em: {save_path}")

def train_model():
    """Treina o modelo"""
    
    # Diretórios
    dataset_dir = "data/dataset"
    models_dir = "models/trained"
    os.makedirs(models_dir, exist_ok=True)
    
    print("📂 Carregando dataset...")
    
    # Carregar dados
    X_train = np.load(os.path.join(dataset_dir, 'X_train.npy'))
    y_train = np.load(os.path.join(dataset_dir, 'y_train.npy'))
    X_val = np.load(os.path.join(dataset_dir, 'X_val.npy'))
    y_val = np.load(os.path.join(dataset_dir, 'y_val.npy'))
    X_test = np.load(os.path.join(dataset_dir, 'X_test.npy'))
    y_test = np.load(os.path.join(dataset_dir, 'y_test.npy'))
    
    # Carregar informações
    with open(os.path.join(dataset_dir, 'dataset_info.json'), 'r') as f:
        dataset_info = json.load(f)
    
    with open(os.path.join(dataset_dir, 'gesture_mapping.json'), 'r') as f:
        gesture_mapping = json.load(f)
    
    print(f"\n📊 Dataset Info:")
    print(f"  Train: {X_train.shape}")
    print(f"  Val: {X_val.shape}")
    print(f"  Test: {X_test.shape}")
    print(f"  Classes: {dataset_info['num_classes']}")
    print(f"  Gestos: {dataset_info['gestures']}")
    
    # Converter labels para one-hot encoding
    y_train_cat = keras.utils.to_categorical(y_train, dataset_info['num_classes'])
    y_val_cat = keras.utils.to_categorical(y_val, dataset_info['num_classes'])
    y_test_cat = keras.utils.to_categorical(y_test, dataset_info['num_classes'])
    
    # Construir modelo
    print("\n🏗️ Construindo modelo...")
    model = build_model(
        sequence_length=dataset_info['sequence_length'],
        feature_dim=dataset_info['feature_dim'],
        num_classes=dataset_info['num_classes']
    )
    
    # Compilar modelo
    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=0.001),
        loss='categorical_crossentropy',
        metrics=['accuracy']
    )
    
    # Mostrar arquitetura
    model.summary()
    
    # Callbacks
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    model_path = os.path.join(models_dir, f'gesture_model_{timestamp}.h5')
    best_model_path = os.path.join(models_dir, 'best_gesture_model.h5')
    
    callbacks = [
        ModelCheckpoint(
            best_model_path,
            monitor='val_accuracy',
            save_best_only=True,
            mode='max',
            verbose=1
        ),
        EarlyStopping(
            monitor='val_loss',
            patience=15,
            restore_best_weights=True,
            verbose=1
        ),
        ReduceLROnPlateau(
            monitor='val_loss',
            factor=0.5,
            patience=5,
            min_lr=1e-7,
            verbose=1
        )
    ]
    
    # Treinar modelo
    print("\n🚀 Iniciando treinamento...")
    print("=" * 70)
    
    history = model.fit(
        X_train, y_train_cat,
        validation_data=(X_val, y_val_cat),
        epochs=100,
        batch_size=16,
        callbacks=callbacks,
        verbose=1
    )
    
    # Salvar modelo final
    model.save(model_path)
    print(f"\n💾 Modelo salvo em: {model_path}")
    print(f"💾 Melhor modelo salvo em: {best_model_path}")
    
    # Avaliar no conjunto de teste
    print("\n📊 Avaliando no conjunto de teste...")
    test_loss, test_accuracy = model.evaluate(X_test, y_test_cat, verbose=0)
    
    print(f"\n{'='*70}")
    print(f"📈 RESULTADOS FINAIS:")
    print(f"{'='*70}")
    print(f"  Test Loss: {test_loss:.4f}")
    print(f"  Test Accuracy: {test_accuracy*100:.2f}%")
    print(f"{'='*70}")
    
    # Predições no teste
    y_pred = model.predict(X_test, verbose=0)
    y_pred_classes = np.argmax(y_pred, axis=1)
    
    # Matriz de confusão simplificada
    print("\n📊 Análise por classe:")
    for gesture_name, gesture_idx in gesture_mapping.items():
        mask = y_test == gesture_idx
        if mask.sum() > 0:
            class_accuracy = (y_pred_classes[mask] == gesture_idx).mean()
            print(f"  {gesture_name}: {class_accuracy*100:.1f}% ({mask.sum()} samples)")
    
    # Plotar histórico
    plot_path = os.path.join(models_dir, f'training_history_{timestamp}.png')
    plot_training_history(history, plot_path)
    
    # Salvar histórico
    history_path = os.path.join(models_dir, f'training_history_{timestamp}.json')
    history_dict = {
        'accuracy': [float(x) for x in history.history['accuracy']],
        'val_accuracy': [float(x) for x in history.history['val_accuracy']],
        'loss': [float(x) for x in history.history['loss']],
        'val_loss': [float(x) for x in history.history['val_loss']],
        'test_accuracy': float(test_accuracy),
        'test_loss': float(test_loss)
    }
    
    with open(history_path, 'w') as f:
        json.dump(history_dict, f, indent=2)
    
    print(f"\n✅ TREINAMENTO CONCLUÍDO!")
    print(f"📁 Arquivos salvos em: {models_dir}/")
    
    return model, history

if __name__ == "__main__":
    # Configurar GPU se disponível
    gpus = tf.config.list_physical_devices('GPU')
    if gpus:
        print(f"🎮 GPU detectada: {gpus}")
        try:
            for gpu in gpus:
                tf.config.experimental.set_memory_growth(gpu, True)
        except RuntimeError as e:
            print(e)
    else:
        print("💻 Rodando em CPU")
    
    train_model()