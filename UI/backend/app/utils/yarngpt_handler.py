import os
import torchaudio
import cloudinary
import cloudinary.uploader
import tempfile
from dotenv import load_dotenv
from yarngpt import generate_speech
import torch
import gc

load_dotenv()

class YarnGPTHandler:
    _instance = None
    _is_initialized = False
    _device = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(YarnGPTHandler, cls).__new__(cls)
        return cls._instance

    def __init__(self):
        if not YarnGPTHandler._is_initialized:
            # Initialize Cloudinary
            cloudinary.config(
                cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME"),
                api_key=os.getenv("CLOUDINARY_API_KEY"),
                api_secret=os.getenv("CLOUDINARY_API_SECRET")
            )
            # Set device to CPU to ensure consistent behavior
            YarnGPTHandler._device = torch.device("cpu")
            YarnGPTHandler._is_initialized = True

    async def generate_speech(self, text: str, speaker: str = "idera",
                            temperature: float = 0.1,
                            repetition_penalty: float = 1.1,
                            max_length: int = 4000) -> str:
        try:
            # Ensure we're using CPU for generation
            with torch.no_grad():
                # Generate audio using yarngpt
                audio = generate_speech(
                    text,
                    speaker=speaker,
                    temperature=temperature,
                    repetition_penalty=repetition_penalty,
                    max_length=max_length
                )
            
            # Save temporarily and upload to Cloudinary
            with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as temp_file:
                torchaudio.save(temp_file.name, audio, sample_rate=24000)
                
                # Upload to Cloudinary
                upload_result = cloudinary.uploader.upload(
                    temp_file.name,
                    resource_type="auto",
                    folder="yarngpt_audio"
                )
                
                # Clean up temp file
                os.unlink(temp_file.name)
                
                # Force garbage collection
                gc.collect()
                torch.cuda.empty_cache() if torch.cuda.is_available() else None
                
                return upload_result["secure_url"]
                
        except Exception as e:
            # Clean up memory even on error
            gc.collect()
            torch.cuda.empty_cache() if torch.cuda.is_available() else None
            raise Exception(f"Speech generation failed: {str(e)}") 