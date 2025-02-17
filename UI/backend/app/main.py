from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import tts
import os

app = FastAPI(title="YarnGPT API")

# Configure CORS - make it more permissive for debugging
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # More permissive for debugging
    allow_credentials=False,  # Must be False when allow_origins=["*"]
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(tts.router, prefix="/api/v1", tags=["text-to-speech"])

@app.get("/")
async def root():
    return {"message": "Welcome to YarnGPT API"}

@app.get("/test-cors")
async def test_cors():
    return {"message": "CORS is working"} 