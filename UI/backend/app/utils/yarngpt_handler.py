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
import time
import asyncio

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
            # Set device to GPU if available for optimal performance
            YarnGPTHandler._device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
            YarnGPTHandler._is_initialized = True

    async def warm_model(self):
        """Preload the model to eliminate cold start delays"""
        try:
            print(f"Warming up model on device: {self._device}")
            # Generate a short test audio to initialize the model
            with torch.no_grad():
                test_audio = generate_speech(
                    "test",
                    speaker="idera",
                    temperature=0.1,
                    repetition_penalty=1.1,
                    max_length=100,
                    language="english"
                )
            print("Model warmed up successfully!")
            del test_audio
            gc.collect()
            if torch.cuda.is_available():
                torch.cuda.empty_cache()
        except Exception as e:
            print(f"Model warm-up failed: {str(e)}")

    async def generate_speech(self, text: str, speaker: str = "idera",
                              temperature: float = 0.1,
                              repetition_penalty: float = 1.1,
                              max_length: int = 4000,
                              language: str = "english") -> dict:
        try:
            start_time = time.time()
            print(f"Starting speech generation for text: '{text[:50]}...'")
            
            # Calculate optimal max_length with safer buffer (input already 458 tokens for short text)
            word_count = len(text.split())
            # Use more conservative calculation: base input + generation buffer
            optimal_max_length = min(max_length, max(1000, word_count * 100))
            print(f"Optimized max_length from {max_length} to {optimal_max_length} for {word_count} words")
            
            #use optimal device for generation
            with torch.no_grad():
                #verify we have a token before generation
                if not HfFolder.get_token():
                    raise Exception("No Hugging Face token available for model access")
                
                generation_start = time.time()
                print(f"Device being used: {self._device}")
                
                # Run speech generation in thread pool to avoid blocking event loop
                loop = asyncio.get_event_loop()
                audio = await loop.run_in_executor(
                    None,
                    lambda: generate_speech(
                        text,
                        speaker=speaker,
                        temperature=temperature,
                        repetition_penalty=repetition_penalty,
                        max_length=optimal_max_length,
                        language=language
                    )
                )
                generation_time = time.time() - generation_start
                print(f"Speech generation completed in {generation_time:.2f}s")
            
            #save temporarily and upload to Cloudinary
            file_save_start = time.time()
            with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as temp_file:
                torchaudio.save(temp_file.name, audio, sample_rate=24000)
            file_save_time = time.time() - file_save_start
            print(f"File save completed in {file_save_time:.2f}s")

            #create a meaningful filename
            timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
            #clean text for filename (first 30 chars, remove special chars)
            clean_text = re.sub(r'[^a-zA-Z0-9]', '_', text[:30]).lower().strip('_')
            filename = f"{timestamp}_{speaker}_{clean_text}"
            
            #upload to Cloudinary
            upload_start = time.time()
            upload_result = cloudinary.uploader.upload(
                temp_file.name,
                resource_type="auto",
                folder="yarngpt_audio",
                public_id=filename
            )
            upload_time = time.time() - upload_start
            print(f"Cloudinary upload completed in {upload_time:.2f}s")
            
            #clean up temp file
            os.unlink(temp_file.name)
            
            #force garbage collection
            gc.collect()
            if torch.cuda.is_available():
                torch.cuda.empty_cache()
            
            total_time = time.time() - start_time
            print(f"Total request completed in {total_time:.2f}s")
            
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
        print(f"Deleting public_id: {public_id}")
        # Try deleting as video first
        result = cloudinary.uploader.destroy(public_id, resource_type="video")
        print(f"Cloudinary result (video): {result}")
        if result.get("result") == "ok":
            return {"result": "ok"}
        # If not found, try as auto
        result_auto = cloudinary.uploader.destroy(public_id, resource_type="auto")
        print(f"Cloudinary result (auto): {result_auto}")
        if result_auto.get("result") == "ok":
            return {"result": "ok"}
        return {"result": "error", "detail": {"video": result, "auto": result_auto}}
