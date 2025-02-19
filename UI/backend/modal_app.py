import modal
import os
import cloudinary
import cloudinary.uploader
import tempfile
from yarngpt import generate_speech
import torch
import gc
from typing import Dict, Any, Tuple
from pydantic import BaseModel
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = modal.App("yarngpt-tts")

# Create volume for caching
cache_dir = "/cache"
volume = modal.Volume.from_name("yarngpt-cache", create_if_missing=True)

# Configure the image with our dependencies
image = (
    modal.Image.debian_slim()
    .pip_install("yarngpt", "cloudinary", "torchaudio", "fastapi")
    .env({"HF_HOME": cache_dir})
)

class TTSRequest(BaseModel):
    text: str
    speaker: str = "idera"
    temperature: float = 0.1
    repetition_penalty: float = 1.1
    max_length: int = 4000

@app.cls(
    image=image,
    secrets=[modal.Secret.from_name("yarngpt-CLOUDINARY-secret")],
    gpu="T4",
    volumes={cache_dir: volume}
)
class TTSModel:
    def generate_and_upload_speech(
        self,
        text: str,
        speaker: str = "idera",
        temperature: float = 0.1,
        repetition_penalty: float = 1.1,
        max_length: int = 4000
    ) -> Tuple[bool, str]:
        try:
            cloudinary.config(
                cloud_name=os.environ["CLOUDINARY_CLOUD_NAME"],
                api_key=os.environ["CLOUDINARY_API_KEY"],
                api_secret=os.environ["CLOUDINARY_API_SECRET"]
            )
            with torch.no_grad():
                audio = generate_speech(
                    text,
                    speaker=speaker,
                    temperature=temperature,
                    repetition_penalty=repetition_penalty,
                    max_length=max_length
                )
            import torchaudio  # lazy import
            with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as temp_file:
                torchaudio.save(temp_file.name, audio, sample_rate=24000)
                upload_result = cloudinary.uploader.upload(
                    temp_file.name,
                    resource_type="auto",
                    folder="yarngpt_audio"
                )
                os.unlink(temp_file.name)
                gc.collect()
                if torch.cuda.is_available():
                    torch.cuda.empty_cache()
                return True, upload_result["secure_url"]
        except Exception as e:
            gc.collect()
            if torch.cuda.is_available():
                torch.cuda.empty_cache()
            print(f"Error generating speech: {str(e)}")
            return False, str(e)

    async def generate(self, request: TTSRequest) -> Dict[str, Any]:
        try:
            success, result = self.generate_and_upload_speech(
                text=request.text,
                speaker=request.speaker,
                temperature=request.temperature,
                repetition_penalty=request.repetition_penalty,
                max_length=request.max_length
            )
            if not success:
                return {"error": f"Failed to generate speech: {result}"}
            return {"audio_url": result}
        except Exception as e:
            print(f"Endpoint error: {str(e)}")
            return {"error": f"Speech generation failed: {str(e)}"}

# Create and configure FastAPI instance with CORS
api_app = FastAPI()
api_app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://yarn.correct.ng", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@api_app.post("/api/v1/generate-speech")
async def generate_speech_endpoint(request: TTSRequest):
    model = TTSModel()
    return await model.generate(request)

@modal.web_endpoint()
def modal_generate_speech():
    return api_app

@app.local_entrypoint()
def main():
    model = TTSModel()
    result = model.generate_and_upload_speech("Hello, this is a test of YarnGPT running on Modal.")
    print("Result:", result)
