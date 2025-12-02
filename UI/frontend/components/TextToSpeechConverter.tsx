"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mic2, Settings, FileText, Download, Play, Pause, Loader2 } from "lucide-react"

// --- Constants & Helpers ---
const DAILY_LIMIT = 5
const STORAGE_KEY = 'yarngpt_usage'

interface UsageData {
  sessionId: string
  dailyCount: number
  totalCount: number
  lastUsed: string
}

interface AudioHistoryItem {
  id: string;
  text: string;
  voice: string;
  language: string;
  url: string;
  timestamp: string;
  fileName?: string;
}

const generateSessionId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

const getTodayString = () => {
  return new Date().toISOString().split('T')[0]
}

// Helper to save to history
const saveAudioToHistory = (item: AudioHistoryItem) => {
  if (typeof window === 'undefined') return;
  const historyString = localStorage.getItem('yarngpt_history');
  const history: AudioHistoryItem[] = historyString ? JSON.parse(historyString) : [];
  history.unshift(item); 
  localStorage.setItem('yarngpt_history', JSON.stringify(history));
}

const getUsageData = (): UsageData => {
  if (typeof window === 'undefined') {
    return { sessionId: '', dailyCount: 0, totalCount: 0, lastUsed: getTodayString() }
  }
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    const data = JSON.parse(stored)
    if (data.lastUsed !== getTodayString()) {
      data.dailyCount = 0
      data.lastUsed = getTodayString()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }
    return data
  }
  const newData: UsageData = {
    sessionId: generateSessionId(),
    dailyCount: 0,
    totalCount: 0,
    lastUsed: getTodayString()
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
  return newData
}

const BUILD_API_URL = process.env.NEXT_PUBLIC_API_URL;

const loadingMessages = [
  "Warming up GPU...",
  "Loading voice models...",
  "Applying Naija accents...",
  "Synthesizing speech...",
  "Finalizing audio...",
]

const voiceOptions = {
  english: [
    { value: "idera", label: "Idera (Female)" },
    { value: "jude", label: "Jude (Male)" },
    { value: "emma", label: "Emma (Female)" },
    { value: "joke", label: "Joke (Female)" },
    { value: "osagie", label: "Osagie (Male)" },
    { value: "remi", label: "Remi (Female)" },
    { value: "tayo", label: "Tayo (Male)" }
  ],
  yoruba: [
    { value: "abayomi", label: "Abayomi (Male)" },
    { value: "aisha", label: "Aisha (Female)" }
  ],
  igbo: [
    { value: "obinna", label: "Obinna (Male)" }
  ],
  hausa: [
    { value: "amina", label: "Amina (Female)" },
    { value: "fatima", label: "Fatima (Female)" }
  ]
}

export default function TextToSpeechConverter() {
  // --- State ---
  const [usageData, setUsageData] = useState<UsageData>({
    sessionId: '', dailyCount: 0, totalCount: 0, lastUsed: getTodayString()
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loadingMsg, setLoadingMsg] = useState(loadingMessages[0])
  const [apiBaseUrl, setApiBaseUrl] = useState<string | undefined>(undefined)
  const [formData, setFormData] = useState({
    text: "",
    speaker: "idera",
    language: "english",
    temperature: 0.1,
    repetition_penalty: 1.1,
    max_length: 4000,
    fileName: "",
    speed: 1,
  })

  // --- Effects ---
  useEffect(() => { setUsageData(getUsageData()) }, [])

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const res = await fetch(`/config.json?v=${Date.now()}`, { cache: 'no-store' })
        if (res.ok) {
          const cfg = await res.json()
          if (cfg?.apiUrl) setApiBaseUrl(cfg.apiUrl)
        }
      } catch (_) {}
    }
    if (typeof window !== 'undefined') loadConfig()
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isProcessing) {
      let i = 0
      interval = setInterval(() => {
        i = (i + 1) % loadingMessages.length
        setLoadingMsg(loadingMessages[i])
      }, 2500)
    }
    return () => clearInterval(interval)
  }, [isProcessing])

  // --- Handlers ---
  const handleLanguageChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      language: value,
      speaker: voiceOptions[value as keyof typeof voiceOptions][0].value
    }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name === "text") {
      const words = value.trim().split(/\s+/).filter(word => word.length > 0)
      if (words.length > 60) {
        setFormData(prev => ({ ...prev, [name]: words.slice(0, 60).join(' ') }))
      } else {
        setFormData(prev => ({ ...prev, [name]: value }))
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSpeedChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, speed: value[0] }))
  }

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length
  }

  const handleDownload = async () => {
    if (!audioUrl) return;
    try {
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = formData.fileName ? `${formData.fileName}.wav` : (audioUrl.split('/').pop() || 'audio.wav');
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError('Failed to download audio file');
    }
  }

  // --- Audio Control Ref and Handler ---
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!formData.text.trim()) {
      setError("Please enter some text.")
      return
    }
    if (usageData.dailyCount >= DAILY_LIMIT) {
      setError("Daily limit reached.")
      return
    }

    setIsProcessing(true)
    setError(null)
    setAudioUrl(null)

    try {
      const runtimeApiUrl = (typeof window !== 'undefined' && (window as any).NEXT_PUBLIC_API_URL) || undefined
      const effectiveBase = apiBaseUrl || runtimeApiUrl || BUILD_API_URL || ''
      const endpoint = `${effectiveBase}/api/v1/generate-speech`

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          text: formData.text,
          speaker: formData.speaker,
          language: formData.language,
          temperature: formData.temperature,
          repetition_penalty: formData.repetition_penalty,
          max_length: formData.max_length,
        }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Failed to generate speech')

      const newUsageData = { ...usageData, dailyCount: usageData.dailyCount + 1, totalCount: usageData.totalCount + 1, lastUsed: getTodayString() }
      setUsageData(newUsageData)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUsageData))
      setAudioUrl(data.audio_url)

      // Save to history
      saveAudioToHistory({
        id: crypto.randomUUID(), 
        text: formData.text,
        voice: formData.speaker,
        language: formData.language,
        url: data.audio_url,
        timestamp: new Date().toISOString(),
        fileName: formData.fileName,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error generating speech')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <section className="w-full max-w-5xl mx-auto flex flex-col gap-8 md:px-8">
      {/* Main Converter Card */}
      <div className="ring-foreground/15 shadow-sm ring-2 shadow-black/5 backdrop-blur-xl ring-inset bg-card/50 p-1 md:p-2">
        <div className="bg-background/50 p-6 md:p-8 space-y-8">
            
            {/* Usage Stats Header*/}
            <div className="flex justify-between items-center text-sm text-muted-foreground border-b border-border pb-4">
                <span className="font-jetbrains">Daily Usage: <span className="text-foreground font-bold">{usageData.dailyCount}/{DAILY_LIMIT}</span></span>
                <span className="font-mono text-xs">Session: {usageData.sessionId.slice(0,8)}</span>
            </div>

            {/* Top: Text Input Area */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-bold font-jetbrains text-foreground flex items-center gap-2">
                        <FileText className="w-4 h-4 text-brand-primary" />
                        Input Text
                    </label>
                    <span className={`text-xs font-mono ${getWordCount(formData.text) >= 60 ? 'text-red-500' : 'text-muted-foreground'}`}>
                        {getWordCount(formData.text)}/60 words
                    </span>
                </div>
                <Textarea 
                    name="text"
                    value={formData.text}
                    onChange={handleInputChange}
                    placeholder="Type something here for the AI to say..."
                    className="min-h-[160px] w-full bg-background border-border focus:ring-brand-primary/20 resize-none text-lg leading-relaxed p-4 shadow-inner"
                    style={{ borderRadius: 0 }}
                />
            </div>

            {/* Middle: Controls Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Language Selection */}
                <div className="space-y-2">
                    <label className="text-sm font-bold font-jetbrains text-foreground flex items-center gap-2">
                        Language
                    </label>
                    <Select value={formData.language} onValueChange={handleLanguageChange}>
                        <SelectTrigger className="w-full h-11 bg-background border-border hover:border-brand-primary/50 transition-colors rounded-none">
                            <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none">
                            <SelectItem value="english">English (Naija)</SelectItem>
                            <SelectItem value="yoruba">Yoruba</SelectItem>
                            <SelectItem value="igbo">Igbo</SelectItem>
                            <SelectItem value="hausa">Hausa</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Voice Selection */}
                <div className="space-y-2">
                    <label className="text-sm font-bold font-jetbrains text-foreground flex items-center gap-2">
                        <Mic2 className="w-4 h-4 text-brand-primary" />
                        Voice Model
                    </label>
                    <Select 
                        value={formData.speaker}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, speaker: value }))}
                    >
                        <SelectTrigger className="w-full h-11 bg-background border-border hover:border-brand-primary/50 transition-colors rounded-none">
                            <SelectValue placeholder="Select voice" />
                        </SelectTrigger>
                        <SelectContent className="rounded-none">
                            {voiceOptions[formData.language as keyof typeof voiceOptions].map((voice) => (
                                <SelectItem key={voice.value} value={voice.value}>
                                    {voice.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Settings (Speed & Filename) */}
                <div className="space-y-2">
                     <label className="text-sm font-bold font-jetbrains text-foreground flex items-center gap-2">
                        <Settings className="w-4 h-4 text-brand-primary" />
                        Speed: {formData.speed}x
                    </label>
                     <div className="h-11 flex items-center px-2 bg-background border border-border">
                        <Slider 
                            min={0.5} max={2} step={0.1}
                            value={[formData.speed]}
                            onValueChange={handleSpeedChange}
                            className="cursor-pointer"
                        />
                     </div>
                </div>
            </div>

             {/* Action Area */}
            <div className="pt-4 flex flex-col items-center gap-4">
                 <Button 
                    onClick={() => handleSubmit()}
                    disabled={isProcessing || !formData.text.trim()}
                    className="w-full md:w-2/3 h-14 text-lg font-bold font-jetbrains shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all bg-background text-foreground rounded-none"
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Play className="mr-2 h-5 w-5 fill-current" />
                            Convert Text to Speech
                        </>
                    )}
                </Button>
                
                {isProcessing && (
                    <p className="text-sm text-foreground animate-pulse font-mono">
                        {loadingMsg}
                    </p>
                )}
                
                {error && (
                    <p className="text-sm text-red-500 font-medium bg-red-500/10 px-3 py-1">
                        {error}
                    </p>
                )}
            </div>

            {/* Result Card */}
            {audioUrl && (
                <div className="animate-in slide-in-from-bottom-4 fade-in duration-500 mt-8 p-4 border border-brand-primary/30 bg-brand-primary/5 flex flex-col md:flex-row items-center gap-4">
                    <button 
                        onClick={handlePlayPause}
                        className="h-12 w-12 bg-brand-primary/20 flex items-center justify-center text-brand-primary flex-shrink-0 rounded-full hover:bg-brand-primary/30 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary"
                    >
                        {isPlaying ? <Pause className="h-6 w-6 fill-current" /> : <Play className="h-6 w-6 fill-current ml-1" />}
                    </button>
                    <div className="flex-grow w-full">
                        <p className="text-sm font-bold text-foreground mb-2 font-jetbrains">Generated Audio</p>
                        <audio 
                            ref={audioRef}
                            controls 
                            className="w-full h-8"
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            onEnded={() => setIsPlaying(false)}
                        >
                            <source src={audioUrl} type="audio/wav" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                    <Button variant="outline" onClick={handleDownload} className="flex-shrink-0 rounded-none">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                    </Button>
                </div>
            )}
        </div>
      </div>
    </section>
  )
}
