from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import tts
import os

app = FastAPI(title="YarnGPT API")

origins = [
    "https://yarn.correct.ng",
    "https://yarngpt-ui.onrender.com",
    "http://localhost:3000",
    "http://localhost:8000",
]

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=3600,
)

# Include routers
app.include_router(tts.router, prefix="/api/v1", tags=["text-to-speech"])

@app.get("/")
async def root():
    return {"message": "Welcome to YarnGPT API"} 