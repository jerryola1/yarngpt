from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.utils.yarngpt_handler import YarnGPTHandler
from typing import Optional

router = APIRouter()
tts_handler = YarnGPTHandler()  # Create a single instance at module level

class TTSRequest(BaseModel):
    text: str
    speaker: str = "idera"
    temperature: float = 0.1
    repetition_penalty: float = 1.1
    max_length: int = 4000

@router.post("/generate-speech")
async def generate_speech(request: TTSRequest):
    try:
        audio_url = await tts_handler.generate_speech(
            text=request.text,
            speaker=request.speaker,
            temperature=request.temperature,
            repetition_penalty=request.repetition_penalty,
            max_length=request.max_length
        )
        
        return {"audio_url": audio_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/voices")
async def get_voices():
    return {
        "voices": [
            {"id": "idera", "gender": "female", "note": "default and best voice"},
            {"id": "joke", "gender": "female"},
            {"id": "jude", "gender": "male"},
            {"id": "umar", "gender": "male"},
            {"id": "osagie", "gender": "male"},
            {"id": "onye", "gender": "male"}
        ]
    } 