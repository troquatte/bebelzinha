"""Transcrição local opcional; não instala pacotes, baixa modelos ou gera áudio."""
import io
import json
from pathlib import Path
import subprocess
import sys
import wave

root = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(root / '.cache/cta/python'))
import numpy as np
from faster_whisper import WhisperModel

audio_path, ffmpeg = sys.argv[1:3]
raw = subprocess.check_output([ffmpeg, '-v', 'error', '-i', audio_path,
    '-ar', '16000', '-ac', '1', '-c:a', 'pcm_s16le', '-f', 'wav', 'pipe:1'])
with wave.open(io.BytesIO(raw)) as wav:
    samples = np.frombuffer(wav.readframes(wav.getnframes()), dtype='<i2').astype(np.float32) / 32768
model = WhisperModel('base', device='cpu', compute_type='int8',
    download_root=str(root / '.cache/cta/models'), local_files_only=True)
segments, _ = model.transcribe(samples, language='pt', word_timestamps=True, beam_size=5)
result = [{'start': s.start, 'end': s.end, 'text': s.text,
    'words': [{'word': w.word, 'start': w.start, 'end': w.end} for w in s.words]} for s in segments]
print(json.dumps({'method': 'faster-whisper base offline, CPU int8; conferir palavras e timing',
    'segments': result}, ensure_ascii=True))
