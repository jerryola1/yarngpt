import os
import torchaudio
import cloudinary
import cloudinary.uploader
import tempfile
from dotenv import load_dotenv
from yarngpt import generate_speech

load_dotenv()

class YarnGPTHandler:
    _instance = None
    _is_initialized = False

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
            YarnGPTHandler._is_initialized = True

    async def generate_speech(self, text: str, speaker: str = "idera",
                            temperature: float = 0.1,
                            repetition_penalty: float = 1.1,
                            max_length: int = 4000) -> str:
        try:
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
                
                return upload_result["secure_url"]
                
        except Exception as e:
            raise Exception(f"Speech generation failed: {str(e)}") 