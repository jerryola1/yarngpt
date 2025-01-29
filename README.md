# YarnGPT 🎙️
![image/png](https://github.com/saheedniyi02/yarngpt/blob/main/notebooks/audio_0c026c21-f432-4d20-a86b-899a10d9ed60.webp)
A text-to-speech model generating natural Nigerian-accented English speech. Built on pure language modeling without external adapters.

## Quick Start

```python
# clone the YarnGPT repo to get access to the `audiotokenizer`
!git clone https://github.com/saheedniyi02/yarngpt.git


# install some necessary libraries
!pip install outetts==0.2.3 uroman

#import some important packages 
import os
import re
import json
import torch
import inflect
import random
import uroman as ur
import numpy as np
import torchaudio
import IPython
from transformers import AutoModelForCausalLM, AutoTokenizer
from outetts.wav_tokenizer.decoder import WavTokenizer
from yarngpt.audiotokenizer import AudioTokenizer


# download the wavtokenizer weights and config (to encode and decode the audio)
!wget https://huggingface.co/novateur/WavTokenizer-medium-speech-75token/resolve/main/wavtokenizer_mediumdata_frame75_3s_nq1_code4096_dim512_kmeans200_attn.yaml
!wget https://huggingface.co/novateur/WavTokenizer-large-speech-75token/resolve/main/wavtokenizer_large_speech_320_24k.ckpt

# model path and wavtokenizer weight path (the paths are assumed based on Google colab, a different environment might save the weights to a different location).
hf_path="saheedniyi/YarnGPT"
wav_tokenizer_config_path="/content/wavtokenizer_mediumdata_frame75_3s_nq1_code4096_dim512_kmeans200_attn.yaml"
wav_tokenizer_model_path = "/content/wavtokenizer_large_speech_320_24k.ckpt"

# create the AudioTokenizer object 
audio_tokenizer=AudioTokenizer(
    hf_path,wav_tokenizer_model_path,wav_tokenizer_config_path
)

#load the model weights

model = AutoModelForCausalLM.from_pretrained(hf_path,torch_dtype="auto").to(audio_tokenizer.device)

# your input text
text="Uhm, so, what was the inspiration behind your latest project? Like, was there a specific moment where you were like, 'Yeah, this is it!' Or, you know, did it just kind of, uh, come together naturally over time?"

# creating a prompt, when creating a prompt, there is an optional `speaker_name` parameter, the possible speakers are "idera","emma","onye","jude","osagie","tayo","zainab","joke","regina","remi","umar","chinenye" if no speaker is selected a speaker is chosen at random 
prompt=audio_tokenizer.create_prompt(text,"idera")

# tokenize the prompt
input_ids=audio_tokenizer.tokenize_prompt(prompt)

# generate output from the model, you can tune the `.generate` parameters as you wish
output  = model.generate(
            input_ids=input_ids,
            temperature=0.1,
            repetition_penalty=1.1,
            max_length=4000,
        )

# convert the output to "audio codes"
codes=audio_tokenizer.get_codes(output)

# converts the codes to audio 
audio=audio_tokenizer.get_audio(codes)

# play the audio
IPython.display.Audio(audio,rate=24000)

# save the audio 
torchaudio.save(f"audio.wav", audio, sample_rate=24000)
```

## Features

- 🗣️ 12 preset voices (6 male, 6 female)
- 🎯 Trained on 2000+ hours of Nigerian audio
- 🔊 24kHz high-quality audio output
- 🚀 Simple API for quick integration
- 📝 Support for long-form text

## Available Voices
- Female: zainab, idera, regina, chinenye, joke, remi
- Male: jude, tayo, umar, osagie, onye, emma

## Examples

Check out our [demo notebook](link-to-notebook) or listen to [sample outputs](https://huggingface.co/saheedniyi/YarnGPT/tree/main/audio).

## Model Details

- Base: [HuggingFaceTB/SmolLM2-360M](https://huggingface.co/HuggingFaceTB/SmolLM2-360M)
- Training: 5 epochs on A100 GPU
- Data: Nigerian movies, podcasts, and open-source audio
- Architecture: Pure language modeling approach

## Limitations

- English to Nigerian-accented English only
- May not capture all Nigerian accent variations
- Training data includes auto-generated content

## Citation

```bibtex
@misc{yarngpt2025,
  author = {Saheed Azeez},
  title = {YarnGPT: Nigerian-Accented English Text-to-Speech Model},
  year = {2025},
  publisher = {Hugging Face}
}
```

## License
MIT

## Acknowledgments
Built with [WavTokenizer](https://github.com/jishengpeng/WavTokenizer) and inspired by [OuteTTS](https://huggingface.co/OuteAI/OuteTTS-0.2-500M/).
