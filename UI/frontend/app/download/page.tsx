"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Play, Pause, Download, Trash2, Mic2, CalendarDays } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AudioHistoryItem {
  id: string;
  text: string;
  voice: string;
  language: string;
  url: string;
  timestamp: string;
  fileName?: string;
}

export default function DownloadPage() {
  const [history, setHistory] = useState<AudioHistoryItem[]>([]);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedHistory = localStorage.getItem('yarngpt_history');
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    }
  }, []);

  const saveHistoryToLocalStorage = (updatedHistory: AudioHistoryItem[]) => {
    localStorage.setItem('yarngpt_history', JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
  };

  const handleDelete = (id: string) => {
    const updatedHistory = history.filter(item => item.id !== id);
    saveHistoryToLocalStorage(updatedHistory);
    if (playingAudioId === id) {
      setPlayingAudioId(null);
    }
  };

  const handlePlayPause = (id: string, url: string) => {
    if (audioRefs.current[id]) {
      const audio = audioRefs.current[id]!;
      if (playingAudioId === id) {
        audio.pause();
        setPlayingAudioId(null);
      } else {
        // Pause any currently playing audio
        if (playingAudioId && audioRefs.current[playingAudioId]) {
          audioRefs.current[playingAudioId]?.pause();
        }
        audio.play();
        setPlayingAudioId(id);
      }
    }
  };

  const handleDownload = async (item: AudioHistoryItem) => {
    try {
      const response = await fetch(item.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = item.fileName ? `${item.fileName}.wav` : (item.url.split('/').pop() || 'audio.wav');
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Failed to download audio file:', err);
      // Optionally show a user-friendly error message
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-8 font-jetbrains text-center text-foreground">Your Generated Audios</h1>

      {history.length === 0 ? (
        <div className="ring-foreground/15 shadow-sm ring-2 shadow-black/5 backdrop-blur-xl ring-inset bg-card/50 p-8 text-center rounded-none space-y-4">
          <p className="text-foreground py-6 font-jetbrains text-lg">No recent audio generations found.</p>
          <Link href="/" className="font-jetbrains px-6 py-3 bg-primary text-primary-foreground hover:bg-primary/40 transition-colors rounded-none">
            Create Your First Audio
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {history.map(item => (
            <div key={item.id} className="ring-foreground/15 shadow-sm ring-2 shadow-black/5 backdrop-blur-xl ring-inset bg-card/50 p-4 rounded-none space-y-3 flex flex-col justify-between">
              <div>
                <p className="text-sm font-bold text-foreground font-jetbrains mb-2 line-clamp-2">{item.text}</p>
                <div className="flex items-center gap-2 text-xs text-foreground mb-3">
                  <Mic2 className="h-3 w-3" />
                  <span>{item.language} - {item.voice}</span>
                  <CalendarDays className="h-3 w-3 ml-auto" />
                  <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                </div>
                <audio 
                  ref={(el) => { audioRefs.current[item.id] = el }}
                  src={item.url} 
                  onEnded={() => setPlayingAudioId(null)}
                  preload="none"
                />
              </div>

              <div className="flex flex-col gap-2 pt-3 border-t border-border/50">
                <Button 
                  onClick={() => handlePlayPause(item.id, item.url)}
                  className="w-full flex items-center justify-center gap-2 font-jetbrains bg-primary text-primary-foreground hover:bg-primary/40 transition-colors rounded-none"
                >
                  {playingAudioId === item.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  {playingAudioId === item.id ? 'Pause' : 'Play'} Audio
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleDownload(item)}
                  className="w-full flex items-center justify-center gap-2 font-jetbrains hover:bg-accent text-foreground hover:text-accent-foreground border-border rounded-none"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
                <Button 
                  variant="ghost"
                  onClick={() => handleDelete(item.id)}
                  className="w-full flex items-center justify-center gap-2 text-red-500 hover:text-red-400 font-jetbrains hover:bg-red-500/10 rounded-none"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}