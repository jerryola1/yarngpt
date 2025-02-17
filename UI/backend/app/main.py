from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import tts
import os

app = FastAPI(title="YarnGPT API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://yarn.correct.ng",  # Production frontend
        "http://localhost:3000",    # Local development
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(tts.router, prefix="/api/v1", tags=["text-to-speech"])

@app.get("/")
async def root():
    return {"message": "Welcome to YarnGPT API"} 