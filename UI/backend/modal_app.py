import modal
import os
import torchaudio
import cloudinary
import cloudinary.uploader
import tempfile
from yarngpt import generate_speech
import torch
import gc
from typing import Optional, Dict, Any, Tuple
from fastapi import FastAPI

# Create Modal app and volume for caching
app = modal.App("yarngpt-tts")
stub = modal.Stub("yarngpt-tts")
volume = modal.Volume.from_name("yarngpt-cache", create_if_missing=True)
cache_dir = "/cache"

# Configure the image with our dependencies
image = (
    modal.Image.debian_slim()
    .pip_install("yarngpt", "cloudinary", "torchaudio")
    .env({"HF_HOME": cache_dir})  # Cache Hugging Face models
)

@app.function(
    image=image,
    secrets=[modal.Secret.from_name("yarngpt-CLOUDINARY-secret")],
    gpu="T4",  # Request GPU for faster inference
    volumes={cache_dir: volume}
)
def generate_and_upload_speech(
    text: str,
    speaker: str = "idera",
    temperature: float = 0.1,
    repetition_penalty: float = 1.1,
    max_length: int = 4000
) -> Tuple[bool, str]:
    try:
        # Initialize Cloudinary
        cloudinary.config(
            cloud_name=os.environ["CLOUDINARY_CLOUD_NAME"],
            api_key=os.environ["CLOUDINARY_API_KEY"],
            api_secret=os.environ["CLOUDINARY_API_SECRET"]
        )

        # Generate speech
        with torch.no_grad():
            audio = generate_speech(
                text,
                speaker=speaker,
                temperature=temperature,
                repetition_penalty=repetition_penalty,
                max_length=max_length
            )
        
        # Save and upload
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as temp_file:
            torchaudio.save(temp_file.name, audio, sample_rate=24000)
            
            # Upload to Cloudinary
            upload_result = cloudinary.uploader.upload(
                temp_file.name,
                resource_type="auto",
                folder="yarngpt_audio"
            )
            
            # Clean up
            os.unlink(temp_file.name)
            gc.collect()
            torch.cuda.empty_cache() if torch.cuda.is_available() else None
            
            return True, upload_result["secure_url"]
                
    except Exception as e:
        gc.collect()
        torch.cuda.empty_cache() if torch.cuda.is_available() else None
        print(f"Error generating speech: {str(e)}")  # Log error for Modal dashboard
        return False, str(e)

@stub.function()
@modal.web_endpoint(method="POST")
async def generate_speech_endpoint(text: str, speaker: str = "idera",
                                 temperature: float = 0.1,
                                 repetition_penalty: float = 1.1,
                                 max_length: int = 4000) -> Dict[str, Any]:
    try:
        success, result = generate_and_upload_speech.remote(
            text=text,
            speaker=speaker,
            temperature=temperature,
            repetition_penalty=repetition_penalty,
            max_length=max_length
        )
        
        if not success:
            return {"error": f"Failed to generate speech: {result}"}, 500
            
        return {"audio_url": result}
                
    except Exception as e:
        print(f"Endpoint error: {str(e)}")  # Log error for Modal dashboard
        return {"error": f"Speech generation failed: {str(e)}"}, 500

if __name__ == "__main__":
    stub.serve() 