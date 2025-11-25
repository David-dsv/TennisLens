# TennisLens - Tennis Analysis Platform 🎾

Full-stack tennis video analysis platform with AI-powered ball tracking, pose estimation, and player analytics.

## Project Structure

```
projet/
├── back/                    # Python backend (FastAPI + Computer Vision)
│   ├── api.py              # FastAPI server
│   ├── courtside_cv.py     # Original CV script (with GUI)
│   ├── courtside_cv_api.py # Headless API version
│   ├── models/             # YOLO models
│   └── requirements.txt
│
└── front/                   # React frontend
    ├── src/
    │   ├── components/
    │   │   ├── VideoTimeline.tsx   # Time range selector
    │   │   ├── UploadSection.tsx   # Video upload
    │   │   ├── ProcessingView.tsx  # Live progress
    │   │   └── Dashboard.tsx       # Results
    │   └── App.tsx
    └── package.json
```

## Quick Start

### 1. Backend Setup

```bash
cd back

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start API server
python api.py
```

The API will be available at `http://localhost:8000`

### 2. Frontend Setup

```bash
cd front

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Features

### Video Timeline Selector
- Upload video and preview it
- Drag handles to select start/end time
- Visual timeline with time markers
- Play selected segment to preview

### Backend Processing (courtside_cv.py)
- **Ball Tracking**: ByteTrack + YOLOv8 tennis ball detection
- **Pose Estimation**: 17-point skeleton visualization
- **Interpolation**: Fills missing ball detections (up to 30 frames)
- **Trajectory Smoothing**: Median filter for smooth paths
- **Visual Effects**: Ball glow, trail, player overlays

### API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/upload` | POST | Upload video file |
| `/api/analyze` | POST | Start analysis job |
| `/api/job/{job_id}` | GET | Get job status/progress |
| `/api/download/{filename}` | GET | Download processed video |

## Usage Flow

1. **Upload Video**: Drag & drop or select video file
2. **Select Time Range**: Use timeline to pick analysis segment
3. **Start Analysis**: Click "Start Analysis" button
4. **Monitor Progress**: Watch real-time processing status
5. **View Results**: See analytics dashboard with stats

## Tech Stack

### Backend
- Python 3.10+
- FastAPI
- OpenCV
- YOLOv8 (Ultralytics)
- ByteTrack
- FFmpeg

### Frontend
- React 19
- TypeScript
- Tailwind CSS
- Vite
- Recharts

## Environment Variables

Create `.env` in the frontend:
```
VITE_API_URL=http://localhost:8000
```

## Requirements

- Python 3.10+
- Node.js 18+
- FFmpeg (for video encoding)
- CUDA GPU (recommended for faster processing)

## Models Required

Place these models in `back/models/`:
- `tennis_ball_aitennis.pt` - Tennis ball detection
- `yolov8m.pt` - Person detection
- `yolov8m-pose.pt` - Pose estimation

## License

MIT License
