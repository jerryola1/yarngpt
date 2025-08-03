import modal
import os

#import the FastAPI app from app/main.py
from app.main import app as fastapi_app

app = modal.App("yarn-gpt-api-whogocode-workspace")

#create volumes for model files and cache
model_volume = modal.Volume.from_name("yarngpt-model-files", create_if_missing=True)
cache_volume = modal.Volume.from_name("yarngpt-cache", create_if_missing=True)

#define secrets.
hf_secret = modal.Secret.from_name("HUGGINGFACE")
cloudinary_secret = modal.Secret.from_name("yarngpt-CLOUDINARY-secret")

#configure the container image
image = (
    # modal.Image.debian_slim()
    modal.Image.from_registry("nvidia/cuda:12.1.0-cudnn8-runtime-ubuntu22.04", add_python="3.11")
    .apt_install([
        "libportaudio2",
        "clang",
        "build-essential",
        "git",
        "cmake",
        "libomp-dev"
    ]) 
    .pip_install(
        "fastapi", "uvicorn", "yarngpt>=0.2.0", "cloudinary", "torchaudio",
        "python-dotenv", "pydantic", "transformers", "huggingface-hub",
        "sounddevice", "hf_transfer", "torch==2.5.1"  
    )
    .env({
        "HF_HOME": "/cache",
        "HF_HUB_ENABLE_HF_TRANSFER": "0"  #
    })
    .add_local_python_source("_remote_module_non_scriptable", "app")
)

@app.function(
    image=image,
    gpu="A100-80GB",
    secrets=[hf_secret, cloudinary_secret],
    volumes={
        "/cache": cache_volume,
        "/root/.yarngpt/models": model_volume
    }
)
@modal.asgi_app()
def fastapi_app():
    # This function just returns the FastAPI app.
    # Any secret-dependent initialization will be done in the app startup.
    from app.main import app as _fastapi_app
    return _fastapi_app

if __name__ == "__main__":
    app.serve()
    # modal.serve(app)
