### **README.md COMPLETO** 📚

Crie `backend/README.md`:

```markdown
# 🤖 SOS Libras - Backend

Backend do sistema SOS Libras para reconhecimento de gestos em Língua Brasileira de Sinais (Libras) usando Deep Learning.

---

## 📋 Índice

1. [Visão Geral](#-visão-geral)
2. [Requisitos](#-requisitos)
3. [Instalação](#-instalação)
4. [Pipeline Completo](#-pipeline-completo)
5. [Guia de Gravação](#-guia-de-gravação)
6. [Processamento de Vídeos](#-processamento-de-vídeos)
7. [Treinamento do Modelo](#-treinamento-do-modelo)
8. [API REST](#-api-rest)
9. [Integração com Frontend](#-integração-com-frontend)
10. [Troubleshooting](#-troubleshooting)

---

## 🎯 Visão Geral

Este backend é responsável por:

- ✅ Processar vídeos de gestos em Libras
- ✅ Extrair keypoints (poses) usando MediaPipe
- ✅ Treinar modelo LSTM para reconhecimento
- ✅ Fornecer API REST para reconhecimento em tempo real
- ✅ Reconhecer sequências de gestos (ex: CEP, telefone)

### Tecnologias

- **Python 3.12**
- **TensorFlow 2.18** - Deep Learning
- **MediaPipe 0.10** - Extração de keypoints
- **OpenCV 4.11** - Processamento de vídeo
- **Flask 3.0** - API REST
- **Rembg 2.0** - Remoção de fundo

---

## 💻 Requisitos

### Hardware

- **CPU**: Qualquer processador moderno
- **RAM**: Mínimo 8GB (recomendado 16GB)
- **GPU**: Opcional (NVIDIA com CUDA para treinamento mais rápido)
- **Espaço**: ~5GB para vídeos e modelo

### Software

- Python 3.12
- pip
- Webcam ou câmera (para gravação)
- Chroma key verde (fundo verde)
- Iluminação adequada

---

## 📦 Instalação

### 1. Clonar repositório

```bash
cd Projeto_qualificao/backend
```

### 2. Criar ambiente virtual

```bash
python3 -m venv venv
source venv/bin/activate  # Linux/Mac
# ou: venv\Scripts\activate  # Windows
```

### 3. Instalar dependências

```bash
pip install -r requirements.txt
```

Isso instalará:
- TensorFlow, Keras
- MediaPipe, OpenCV
- Flask, Flask-CORS
- Rembg (remoção de fundo)
- Numpy, Pandas, Scikit-learn

### 4. Verificar instalação

```bash
python -c "import tensorflow as tf; print(f'TensorFlow: {tf.__version__}')"
python -c "import mediapipe as mp; print('MediaPipe OK')"
```

---

## 🔄 Pipeline Completo

```
1. GRAVAÇÃO
   📹 Gravar vídeos com chroma key verde
   ↓
2. REMOVER FUNDO (Script 1)
   🎨 Substituir verde por branco
   ↓
3. EXTRAIR FRAMES (Script 2)
   🎞️ Gerar imagens de cada vídeo
   ↓
4. EXTRAIR KEYPOINTS (Script 3)
   🦴 MediaPipe detecta poses/mãos/face
   ↓
5. PREPARAR DATASET (Script 4)
   📊 Organizar dados para treino
   ↓
6. TREINAR MODELO (Script 5)
   🤖 Treinar rede neural LSTM
   ↓
7. API REST
   🌐 Servir modelo para frontend
```

---

## 🎬 Guia de Gravação

### Setup

1. **Chroma Key Verde**
   - Esticar bem (sem rugas)
   - Iluminação uniforme
   - Evitar sombras

2. **Câmera**
   - Tripé fixo
   - 1080p mínimo
   - 30fps
   - Enquadramento: da cintura para cima

3. **Roupa**
   - Escura (preto, azul, vermelho)
   - **NUNCA verde!**

4. **Iluminação**
   - 2 luzes no fundo verde
   - 1 luz frontal na pessoa
   - Luz suave e difusa

### Protocolo de Gravação

Para cada gesto (0-9, SIM, NÃO), grave **15 vídeos** com variações:

#### Variações de Velocidade (3 vídeos)
- Gesto normal
- Gesto rápido
- Gesto lento

#### Variações de Posição (5 vídeos)
- Mão centralizada
- Mão à direita
- Mão à esquerda
- Mão mais alta
- Mão mais baixa

#### Variações de Distância (2 vídeos)
- Mão perto da câmera
- Mão longe da câmera

#### Variações de Contexto (5 vídeos)
- Com movimento de entrada
- Com movimento de saída
- Pausado (2 segundos)
- Corpo inclinado
- Expressão neutra

### Organização dos Arquivos

```
data/raw_videos/
├── numero_0/
│   ├── video_001.mp4
│   ├── video_002.mp4
│   └── ... (15 vídeos)
├── numero_1/
├── numero_2/
├── numero_3/
├── numero_4/
├── numero_5/
├── numero_6/
├── numero_7/
├── numero_8/
├── numero_9/
├── sim/
└── nao/
```

**Total**: 12 gestos × 15 vídeos = **180 vídeos**

### Nomenclatura

- `numero_0` a `numero_9` - Números de 0 a 9
- `sim` - Gesto de "sim" em Libras
- `nao` - Gesto de "não" em Libras

---

## 🎨 Processamento de Vídeos

### Script 1: Remover Fundo Verde

```bash
python scripts/1_remove_background.py
```

**O que faz:**
- Lê vídeos de `data/raw_videos/`
- Remove fundo verde usando Rembg
- Coloca fundo branco
- Salva em `data/processed_videos/`

**Tempo estimado**: ~30-60 minutos (180 vídeos)

---

### Script 2: Extrair Frames

```bash
python scripts/2_extract_frames.py
```

**O que faz:**
- Lê vídeos de `data/processed_videos/`
- Extrai até 30 frames por vídeo
- Salva como PNG em `data/frames/`

**Tempo estimado**: ~10-15 minutos

---

### Script 3: Extrair Keypoints

```bash
python scripts/3_extract_keypoints.py
```

**O que faz:**
- Lê frames de `data/frames/`
- Usa MediaPipe para detectar:
  - Pose (corpo): 33 pontos
  - Mão esquerda: 21 pontos
  - Mão direita: 21 pontos
  - Face: 70 pontos
- Salva JSON em `data/keypoints/`

**Tempo estimado**: ~20-30 minutos

**Saída**: `keypoints.json` para cada vídeo

---

### Script 4: Preparar Dataset

```bash
python scripts/4_prepare_dataset.py
```

**O que faz:**
- Lê todos os keypoints
- Padroniza sequências
- Divide em treino/validação/teste (70%/15%/15%)
- Salva arrays NumPy em `data/dataset/`

**Arquivos gerados**:
- `X_train.npy`, `y_train.npy`
- `X_val.npy`, `y_val.npy`
- `X_test.npy`, `y_test.npy`
- `gesture_mapping.json` (mapa de classes)
- `dataset_info.json` (metadados)

**Tempo estimado**: ~2-5 minutos

---

## 🤖 Treinamento do Modelo

### Script 5: Treinar Modelo

```bash
python scripts/5_train_model.py
```

**O que faz:**
- Carrega dataset preparado
- Constrói rede LSTM:
  - 3 camadas LSTM (128→64→32)
  - 2 camadas Dense
  - Dropout para regularização
- Treina por até 100 épocas
- Usa Early Stopping e ReduceLROnPlateau
- Salva melhor modelo

**Tempo estimado**: 
- CPU: 30-60 minutos
- GPU: 10-15 minutos

**Arquivos gerados**:
- `models/trained/best_gesture_model.h5` ⭐ (melhor modelo)
- `models/trained/gesture_model_TIMESTAMP.h5` (modelo final)
- `models/trained/training_history_TIMESTAMP.png` (gráficos)
- `models/trained/training_history_TIMESTAMP.json` (histórico)

### Métricas Esperadas

Com 180 vídeos (15 por classe):

- **Acurácia de treino**: 90-95%
- **Acurácia de validação**: 85-92%
- **Acurácia de teste**: 80-90%

⚠️ Se acurácia < 80%, considere:
- Gravar mais vídeos
- Melhorar iluminação
- Verificar qualidade dos gestos

---

## 🌐 API REST

### Iniciar API

```bash
python run_api.py
```

**Saída esperada**:
```
======================================================================
🚀 SOS LIBRAS API
======================================================================
🌐 Host: 0.0.0.0:5000
📁 Modelo: models/trained/best_gesture_model.h5
🐛 Debug: True
======================================================================
🦴 Inicializando MediaPipe...
✅ Mapeamentos carregados:
  Gestos: ['nao', 'numero_0', 'numero_1', ...]
  Classes: 12
📦 Carregando modelo de: models/trained/best_gesture_model.h5
✅ Modelo carregado com sucesso!
🚀 Inicializando API...
✅ API pronta!
 * Running on http://0.0.0.0:5000
```

### Endpoints

#### 1. Health Check

```bash
GET /api/health
```

**Resposta**:
```json
{
  "status": "ok",
  "model_loaded": true,
  "mediapipe_ready": true
}
```

---

#### 2. Listar Gestos

```bash
GET /api/gestures
```

**Resposta**:
```json
{
  "gestures": ["numero_0", "numero_1", ..., "sim", "nao"],
  "num_classes": 12
}
```

---

#### 3. Reconhecer Gesto (Single)

```bash
POST /api/recognize
Content-Type: multipart/form-data

Body:
  video: <arquivo.mp4>
```

**Exemplo com cURL**:
```bash
curl -X POST http://localhost:5000/api/recognize \
  -F "video=@gesto_5.mp4"
```

**Resposta**:
```json
{
  "gesture": "numero_5",
  "confidence": 0.95,
  "num_frames": 28,
  "probabilities": {
    "numero_0": 0.01,
    "numero_1": 0.00,
    "numero_2": 0.00,
    "numero_3": 0.01,
    "numero_4": 0.02,
    "numero_5": 0.95,
    "numero_6": 0.00,
    "numero_7": 0.00,
    "numero_8": 0.00,
    "numero_9": 0.01,
    "sim": 0.00,
    "nao": 0.00
  }
}
```

---

#### 4. Reconhecer Sequência (CEP, etc)

```bash
POST /api/recognize-sequence
Content-Type: multipart/form-data

Body:
  videos[]: <gesto1.mp4>
  videos[]: <gesto2.mp4>
  videos[]: <gesto3.mp4>
  ...
```

**Exemplo com cURL**:
```bash
curl -X POST http://localhost:5000/api/recognize-sequence \
  -F "videos=@gesto_9.mp4" \
  -F "videos=@gesto_0.mp4" \
  -F "videos=@gesto_0.mp4" \
  -F "videos=@gesto_1.mp4" \
  -F "videos=@gesto_0.mp4" \
  -F "videos=@gesto_0.mp4" \
  -F "videos=@gesto_0.mp4" \
  -F "videos=@gesto_0.mp4"
```

**Resposta**:
```json
{
  "sequence": ["numero_9", "numero_0", "numero_0", "numero_1", "numero_0", "numero_0", "numero_0", "numero_0"],
  "formatted": "90010-000",
  "count": 8,
  "details": [
    {
      "gesture": "numero_9",
      "confidence": 0.98,
      "index": 0
    },
    ...
  ]
}
```

---

## 🔗 Integração com Frontend

### JavaScript/React

```javascript
// services/gestureAPI.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const recognizeGesture = async (videoBlob) => {
  const formData = new FormData();
  formData.append('video', videoBlob, 'gesture.mp4');
  
  const response = await axios.post(
    `${API_URL}/recognize`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
  );
  
  return response.data;
};

export const recognizeSequence = async (videoBlobs) => {
  const formData = new FormData();
  
  videoBlobs.forEach((blob, index) => {
    formData.append('videos', blob, `gesture_${index}.mp4`);
  });
  
  const response = await axios.post(
    `${API_URL}/recognize-sequence`,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' }
    }
  );
  
  return response.data;
};
```

### Exemplo de Uso no React

```jsx
import { useState } from 'react';
import { recognizeGesture } from './services/gestureAPI';

function GestureCapture() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleVideoCapture = async (videoBlob) => {
    setLoading(true);
    
    try {
      const data = await recognizeGesture(videoBlob);
      setResult(data);
      
      // Preencher campo automaticamente
      if (data.confidence > 0.8) {
        // document.getElementById('cep').value += data.gesture;
      }
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      {/* Seu componente de captura de webcam */}
      {loading && <p>Reconhecendo gesto...</p>}
      {result && (
        <div>
          <p>Gesto: {result.gesture}</p>
          <p>Confiança: {(result.confidence * 100).toFixed(1)}%</p>
        </div>
      )}
    </div>
  );
}
```

---

## ⚠️ Troubleshooting

### Problema: `ModuleNotFoundError: No module named 'tensorflow'`

**Solução**:
```bash
source venv/bin/activate  # Ativar ambiente virtual
pip install -r requirements.txt
```

---

### Problema: `FileNotFoundError: best_gesture_model.h5`

**Causa**: Modelo não foi treinado ainda

**Solução**:
```bash
# Rodar pipeline completo
python scripts/1_remove_background.py
python scripts/2_extract_frames.py
python scripts/3_extract_keypoints.py
python scripts/4_prepare_dataset.py
python scripts/5_train_model.py
```

---

### Problema: Acurácia baixa (< 70%)

**Causas possíveis**:
- Poucos vídeos de treino
- Má qualidade de gravação
- Iluminação ruim
- Gestos inconsistentes

**Soluções**:
1. Gravar mais vídeos (20-30 por gesto)
2. Melhorar setup de gravação
3. Verificar se gestos estão corretos
4. Aumentar data augmentation

---

### Problema: API retorna erro 500

**Debug**:
```bash
# Verificar logs do terminal onde API está rodando
# Testar endpoint de health
curl http://localhost:5000/api/health

# Verificar se modelo existe
ls models/trained/best_gesture_model.h5
```

---

### Problema: MediaPipe não detecta mãos

**Causas**:
- Iluminação ruim
- Mãos fora do enquadramento
- Movimento muito rápido

**Soluções**:
1. Melhorar iluminação
2. Centralizar pessoa na câmera
3. Fazer gestos mais devagar

---

## 📊 Estrutura Final

```
backend/
├── api/
│   ├── __init__.py
│   ├── app.py                    # App Flask principal
│   ├── config.py                 # Configurações
│   ├── routes/
│   │   └── gesture.py            # Rotas da API
│   └── utils/
│       ├── mediapipe_handler.py  # Handler MediaPipe
│       └── model_loader.py       # Carregador do modelo
├── data/
│   ├── raw_videos/               # Vídeos originais (180)
│   ├── processed_videos/         # Vídeos sem fundo (180)
│   ├── frames/                   # Frames extraídos (~5400)
│   ├── keypoints/                # Keypoints JSON (180)
│   └── dataset/                  # Dataset preparado
│       ├── X_train.npy
│       ├── y_train.npy
│       ├── X_val.npy
│       ├── y_val.npy
│       ├── X_test.npy
│       ├── y_test.npy
│       ├── gesture_mapping.json
│       └── dataset_info.json
├── models/
│   └── trained/
│       ├── best_gesture_model.h5        # ⭐ Modelo final
│       ├── gesture_model_TIMESTAMP.h5
│       ├── training_history_TIMESTAMP.png
│       └── training_history_TIMESTAMP.json
├── scripts/
│   ├── 1_remove_background.py
│   ├── 2_extract_frames.py
│   ├── 3_extract_keypoints.py
│   ├── 4_prepare_dataset.py
│   └── 5_train_model.py
├── venv/                         # Ambiente virtual
├── requirements.txt              # Dependências
├── run_api.py                    # Script para rodar API
└── README.md                     # Este arquivo
```

---

## 🎓 Autoria

**Projeto de Qualificação de Mestrado**
- Autor: Renato Wessner dos Santos
- Instituição: UNIVESP
- Ano: 2025

---

## 📝 Licença

Propriedade reservada. Uso restrito ao projeto de mestrado.

---

## 🆘 Suporte

Para dúvidas ou problemas:
1. Verificar seção de Troubleshooting
2. Conferir logs do terminal
3. Validar estrutura de arquivos

---

**Feito com ❤️ para a comunidade surda brasileira 🤟**
```

---

## 🎉 **PROJETO COMPLETO!**

Você agora tem:

✅ Backend completo (5 scripts + API)  
✅ README.md com documentação detalhada  
✅ Guia de gravação profissional  
✅ Instruções de integração com frontend  
✅ Troubleshooting completo  

**Próximos passos:**
1. 📹 Gravar vídeos amanhã com iluminação
2. 🎬 Rodar scripts 1-5 em sequência
3. 🚀 Testar API
4. 🔗 Integrar com React

Alguma dúvida ou quer que eu adicione mais algo? 🤔