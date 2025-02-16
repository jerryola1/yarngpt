# YarnGPT UI

This is the official UI implementation for YarnGPT, providing a user-friendly interface for the Nigerian-accented text-to-speech model.

## Structure

- `frontend/`: Next.js frontend application
- `backend/`: FastAPI backend server

## Features

- Modern, responsive UI built with Next.js and Tailwind CSS
- Real-time text-to-speech generation
- Support for all YarnGPT voices
- Audio playback and download capabilities
- Customizable speech parameters

## Setup

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
pip install -r requirements.txt
python run.py
```

## Deployment

The project uses GitHub Actions for automated deployment:
- Frontend: Automatically deploys to Siteground
- Backend: Deploys to dedicated hosting environment

## Contributing

Feel free to submit issues and enhancement requests! 