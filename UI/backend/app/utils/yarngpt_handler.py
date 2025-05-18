import os
import torchaudio
import cloudinary
import cloudinary.uploader
import tempfile
from dotenv import load_dotenv
from yarngpt import generate_speech
import torch
import gc
from huggingface_hub import HfFolder
import datetime
import re

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
            #initialize Cloudinary
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
                              max_length: int = 4000,
                              language: str = "english") -> dict:
        try:
            #ensure we're using CPU for generation
            with torch.no_grad():
                #verify we have a token before generation
                if not HfFolder.get_token():
                    raise Exception("No Hugging Face token available for model access")
                    
                audio = generate_speech(
                    text,
                    speaker=speaker,
                    temperature=temperature,
                    repetition_penalty=repetition_penalty,
                    max_length=max_length,
                    language=language
                )
            
            #save temporarily and upload to Cloudinary
            with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as temp_file:
                torchaudio.save(temp_file.name, audio, sample_rate=24000)

                #create a meaningful filename
                timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
                #clean text for filename (first 30 chars, remove special chars)
                clean_text = re.sub(r'[^a-zA-Z0-9]', '_', text[:30]).lower().strip('_')
                filename = f"{timestamp}_{speaker}_{clean_text}"
                
                #upload to Cloudinary
                upload_result = cloudinary.uploader.upload(
                    temp_file.name,
                    resource_type="auto",
                    folder="yarngpt_audio",
                    public_id=filename
                )
                
                #clean up temp file
                os.unlink(temp_file.name)
                
                #force garbage collection
                gc.collect()
                if torch.cuda.is_available():
                    torch.cuda.empty_cache()
                
                return {
                    "audio_url": upload_result["secure_url"],
                    "public_id": upload_result["public_id"]
                }
                
        except Exception as e:
            gc.collect()
            if torch.cuda.is_available():
                torch.cuda.empty_cache()
            raise Exception(f"Speech generation failed: {str(e)}")

    def delete_audio(self, public_id: str) -> dict:
        try:
            result = cloudinary.uploader.destroy(public_id, resource_type="video")
            if result.get("result") == "ok":
                return {"result": "ok"}
            else:
                return {"result": "error", "detail": result}
        except Exception as e:
            return {"result": "error", "detail": str(e)}
