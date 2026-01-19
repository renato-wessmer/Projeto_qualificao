# CLAUDE.md - AI Assistant Guide for SOS Libras

## Project Overview

**SOS Libras** is an emergency reporting system designed for Deaf individuals, enabling them to report police emergencies using Brazilian Sign Language (Libras) through webcam gesture recognition. This is a Master's degree qualification project (MVP) at UNIVESP.

**Author:** Renato Wessner dos Santos
**License:** Proprietary/Restricted (Academic project)
**Status:** v1.0.0 MVP frontend complete; v2.0 backend/ML pipeline in development

## Repository Structure

```
Projeto_qualificao/
├── frontend/                 # React SPA (Vite + Tailwind CSS)
│   ├── src/
│   │   ├── pages/           # 8 page components
│   │   ├── assets/          # Images and static files
│   │   ├── App.jsx          # Router configuration
│   │   ├── main.jsx         # React entry point
│   │   └── index.css        # Global styles
│   ├── package.json         # NPM dependencies
│   ├── vite.config.js       # Vite configuration
│   └── tailwind.config.js   # Tailwind theming
├── backend/                  # Python ML pipeline + REST API
│   ├── api/
│   │   ├── app.py           # Flask app factory
│   │   ├── config.py        # Configuration settings
│   │   ├── routes/
│   │   │   └── gesture.py   # Gesture recognition endpoints
│   │   └── utils/
│   │       ├── mediapipe_handler.py  # Keypoint extraction
│   │       └── model_loader.py       # TensorFlow inference
│   ├── scripts/             # ML data pipeline (5 sequential scripts)
│   ├── run_api.py           # API server entry point
│   └── requirements.txt     # Python dependencies
├── README.md                # Main documentation
└── CHANGELOG.md             # Version history
```

## Technology Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.1.1 | UI framework |
| React Router DOM | 7.9.4 | Client-side routing |
| Vite | 7.1.7 | Build tool and dev server |
| Tailwind CSS | 3.4.18 | Utility-first CSS |
| react-webcam | 7.2.0 | Webcam/video capture |
| Axios | 1.12.2 | HTTP client |
| ESLint | 9.36.0 | Code linting |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Flask | 3.0.0 | REST API framework |
| Flask-CORS | 5.0.0 | Cross-origin handling |
| TensorFlow | 2.18.0 | Deep learning framework |
| MediaPipe | 0.10.21 | Pose/gesture keypoint detection |
| OpenCV | 4.11.0.86 | Video processing |
| Rembg | 2.0.67 | Background removal |
| NumPy | 1.24.0+ | Numerical computing |
| Scikit-learn | 1.5.2 | ML utilities |
| Pandas | 2.2.3 | Data manipulation |

## Quick Start Commands

### Frontend Development
```bash
cd frontend
npm install              # Install dependencies
npm run dev              # Start dev server (http://localhost:5173)
npm run build            # Production build
npm run lint             # Run ESLint
npm run preview          # Preview production build
```

### Backend Development
```bash
cd backend
python -m venv venv                    # Create virtual environment
source venv/bin/activate               # Activate (Linux/Mac)
pip install -r requirements.txt        # Install dependencies
python run_api.py                      # Start API (http://localhost:5000)
```

### ML Pipeline (Sequential Execution)
```bash
cd backend
python scripts/1_remove_background.py   # Process videos (~30-60 min)
python scripts/2_extract_frames.py      # Extract frames (~10-15 min)
python scripts/3_extract_keypoints.py   # MediaPipe extraction (~20-30 min)
python scripts/4_prepare_dataset.py     # Prepare NumPy arrays (~2-5 min)
python scripts/5_train_model.py         # Train LSTM model (~10-60 min)
```

## Development Conventions

### Code Style

**Frontend (JavaScript/JSX):**
- Functional components with hooks (useState, useEffect)
- PascalCase for components: `EmergencyForm.jsx`
- camelCase for functions and variables
- Tailwind CSS for all styling (no separate CSS files per component)
- Each page component in `src/pages/`

**Backend (Python):**
- PEP 8 style guide
- snake_case for functions and variables
- UPPERCASE for constants
- Docstrings for all functions and classes
- Type hints where applicable

### File Headers

All source files should include headers with:
- `@file` - Filename
- `@author` - Renato Wessner dos Santos
- `@date` - Creation date
- `@project` - SOS Libras
- `@copyright` - UNIVESP

### Git Conventions

- **Commit format:** Conventional commits (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`)
- **Branch naming:** Feature branches from main
- **Examples:**
  - `feat: add webcam capture component`
  - `fix: resolve CEP validation error`
  - `docs: update API documentation`

## Architecture Overview

### Frontend Navigation Flow
```
Splash (/) → HomePage (/home)
  ├─ "Está acontecendo agora" → EmergencyForm → EmergencyForm2 →
  │                              Otherinformation → End
  └─ "Não está acontecendo agora" → InfoScreen → DistritosScreen
```

### Backend API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check with model status |
| GET | `/api/gestures` | List available gesture classes (12) |
| POST | `/api/recognize` | Recognize single video gesture |
| POST | `/api/recognize-sequence` | Recognize multiple videos (e.g., CEP) |

### ML Pipeline Data Flow
```
Raw Videos → Background Removal → Processed Videos
    ↓
Frame Extraction (30 frames/video)
    ↓
MediaPipe Keypoint Extraction (468 features/frame)
    ↓
Dataset Preparation (70/15/15 train/val/test split)
    ↓
LSTM Model Training → Trained Model (h5)
```

## Key Implementation Details

### Gesture Recognition System

**MediaPipe extracts 468 features per frame:**
- Pose: 33 keypoints × 4 (x, y, z, visibility) = 132
- Left Hand: 21 keypoints × 3 (x, y, z) = 63
- Right Hand: 21 keypoints × 3 (x, y, z) = 63
- Face: 70 keypoints × 3 (x, y, z) = 210

**LSTM Model Architecture:**
```
Input (sequence_length, 468)
  → LSTM(128) + Dropout(0.3)
  → LSTM(64) + Dropout(0.3)
  → LSTM(32) + Dropout(0.3)
  → Dense(64, relu) + Dropout(0.4)
  → Dense(32, relu) + Dropout(0.3)
  → Dense(12, softmax)
Output: 12 classes (0-9, sim, nao)
```

### Frontend Data Persistence

The emergency form uses LocalStorage for draft persistence:
- Key: `emergencyFormData`
- Auto-saves on field changes
- Auto-recovers on page reload
- Cleared on successful submission

### External API Integration

**ViaCEP API** (Brazilian postal code lookup):
- Endpoint: `https://viacep.com.br/ws/{cep}/json/`
- Auto-fills: logradouro, bairro, localidade, uf
- Triggered on valid 8-digit CEP input

## Common Tasks

### Adding a New Frontend Page

1. Create component in `frontend/src/pages/NewPage.jsx`
2. Add route in `frontend/src/App.jsx`:
   ```jsx
   <Route path="/newpage" element={<NewPage />} />
   ```
3. Import component at top of App.jsx
4. Add navigation link/button as needed

### Adding a New API Endpoint

1. Add route function in `backend/api/routes/gesture.py` or create new blueprint
2. Register blueprint in `backend/api/app.py` if new
3. Add corresponding handler in `backend/api/utils/` if needed
4. Update API documentation

### Adding a New Gesture Class

1. Add videos to `backend/data/raw_videos/{gesture_name}/`
2. Update gesture mapping in `backend/data/dataset/gesture_mapping.json`
3. Re-run ML pipeline scripts 1-5
4. Verify model accuracy before deployment

## Configuration Files

### Frontend

**`vite.config.js`** - Build configuration
**`tailwind.config.js`** - Tailwind theme extensions
**`eslint.config.js`** - Linting rules

### Backend

**`api/config.py`** - Key settings:
```python
MODEL_PATH = "models/trained/best_gesture_model.h5"
HOST = "0.0.0.0"
PORT = 5000
MAX_VIDEO_SIZE = 10 * 1024 * 1024  # 10 MB
ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mov', 'webm'}
MEDIAPIPE_CONFIDENCE = 0.5
CONFIDENCE_THRESHOLD = 0.6
```

## Testing

**Current State:** No formal testing framework implemented (MVP stage)

**Manual Testing Areas:**
- Frontend: Form validation, navigation flow, webcam capture
- Backend: API responses, ML model accuracy, video processing

**Future Implementation:**
- Frontend: Jest + React Testing Library
- Backend: pytest + Flask test client
- E2E: Cypress or Playwright

## Important Notes for AI Assistants

### Do's
- Follow existing code patterns and conventions
- Use Tailwind CSS for frontend styling
- Add proper error handling for API calls
- Include docstrings/JSDoc for new functions
- Update CHANGELOG.md for significant changes
- Test changes manually before committing

### Don'ts
- Don't add unnecessary dependencies
- Don't modify ML model architecture without discussion
- Don't change API response formats (breaking changes)
- Don't remove LocalStorage persistence logic
- Don't skip background removal step in ML pipeline

### Language Context
- Project interface is in Portuguese (Brazilian)
- Code comments and documentation can be in English
- User-facing text must remain in Portuguese
- Libras = Brazilian Sign Language (Língua Brasileira de Sinais)

### Accessibility Considerations
- Target users are Deaf individuals
- Large buttons and clear visual hierarchy required
- Webcam is primary input method
- Minimize text-heavy interfaces

## Project Roadmap

**Completed (v1.0.0):**
- 8-page frontend interface
- Webcam integration
- Form validation and persistence
- ViaCEP integration

**In Progress (v2.0):**
- ML pipeline completion
- REST API endpoints
- LSTM gesture recognition

**Planned:**
- Real-time gesture recognition
- PWA/Mobile versions
- Voice synthesis for Deaf-hearing communication

## Troubleshooting

### Frontend Issues

**"Module not found" errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**Webcam not working:**
- Check browser permissions
- Ensure HTTPS in production (required for webcam)

### Backend Issues

**MediaPipe installation fails:**
```bash
pip install mediapipe==0.10.21 --no-cache-dir
```

**TensorFlow GPU not detected:**
- Verify CUDA and cuDNN installation
- Check TensorFlow-GPU compatibility

**Model not loading:**
- Verify model file exists at configured path
- Check h5 file is not corrupted

## Contact and Resources

- **Repository:** Current working directory
- **Main README:** `/README.md`
- **Backend README:** `/backend/README.md`
- **Changelog:** `/CHANGELOG.md`
