import os
import sys
from yt_dlp import YoutubeDL

def download_video_with_subs(url):
    # Create data directory if it doesn't exist
    data_dir = "data"
    os.makedirs(data_dir, exist_ok=True)
    
    # Extract video info first to get the title
    ydl_opts = {
        'quiet': False,
        'no_warnings': False,
        'extract_flat': True,
    }
    
    with YoutubeDL(ydl_opts) as ydl:
        try:
            info = ydl.extract_info(url, download=False)
            # Clean the title to make it suitable for a directory name
            video_title = "".join(x for x in info['title'] if x.isalnum() or x in (' ', '-', '_'))
            video_title = video_title.strip()
            
            # Create a directory for this video inside data/
            video_dir = os.path.join(data_dir, video_title)
            os.makedirs(video_dir, exist_ok=True)
            
            # Configure download options
            download_opts = {
                'format': 'm4a/bestaudio/best',  # Prefer m4a format
                'outtmpl': os.path.join(video_dir, '%(title)s.%(ext)s'),
                'writesubtitles': True,
                'writeautomaticsub': True,  # Download auto-generated subs if manual not available
                'subtitleslangs': ['yo', 'en'],  # Download Yoruba and English subtitles
                'subtitlesformat': 'vtt',
                'postprocessors': [{
                    'key': 'FFmpegExtractAudio',
                    'preferredcodec': 'm4a',
                }],
            }
            
            # Download video and subtitles
            with YoutubeDL(download_opts) as ydl:
                ydl.download([url])
                
            print(f"Successfully downloaded video and subtitles to directory: {video_dir}")
            
        except Exception as e:
            print(f"Error downloading video: {str(e)}")
            return None

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python download_video.py [YouTube URL]")
        sys.exit(1)
        
    url = sys.argv[1]
    download_video_with_subs(url) 