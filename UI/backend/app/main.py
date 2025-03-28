from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import tts
import os
from huggingface_hub import login

app = FastAPI(title="YarnGPT API")

origins = [
    "https://yarn.correct.ng",
    "https://yarngpt.co",
    "http://localhost:3000",
    "http://localhost:8000"
]

#configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=3600,
)

@app.on_event("startup")
async def startup_event():
    print("Starting up FastAPI app...")
    print("Debug - Environment variables:", {k: v[:4] + "..." if v else v for k, v in os.environ.items() if k in ['HF_TOKEN', 'HUGGINGFACE_TOKEN', 'HF_HOME']})
    
    #login to Hugging Face if token is available
    hf_token = os.environ.get('HUGGINGFACE_TOKEN') or os.environ.get('HF_TOKEN')
    if hf_token:
        login(token=hf_token)
        print(f"Successfully logged in to Hugging Face with token: {hf_token[:4]}...")
    else:
        print("No Hugging Face token found in startup!")

#include routers
app.include_router(tts.router, prefix="/api/v1", tags=["text-to-speech"])

@app.get("/")
async def root():
    return {"message": "Welcome to YarnGPT API"}

@app.get("/test-cors")
async def test_cors():
    return {"message": "CORS is working"}
