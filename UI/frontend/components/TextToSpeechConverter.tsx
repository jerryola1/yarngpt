'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Paperclip } from "lucide-react"
import LoadingSpinner from "@/components/LoadingSpinner"

// Usage tracking constants
const DAILY_LIMIT = 10
const STORAGE_KEY = 'yarngpt_usage'

interface UsageData {
  sessionId: string
  dailyCount: number
  totalCount: number
  lastUsed: string
}

// Helper function to generate session ID
const generateSessionId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// Helper function to get today's date as string
const getTodayString = () => {
  return new Date().toISOString().split('T')[0]
}

// Helper function to initialize or get usage data
const getUsageData = (): UsageData => {
  // Check if we're in the browser environment
  if (typeof window === 'undefined') {
    return {
      sessionId: '',
      dailyCount: 0,
      totalCount: 0,
      lastUsed: getTodayString()
    }
  }

  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    const data = JSON.parse(stored)
    // Reset daily count if it's a new day
    if (data.lastUsed !== getTodayString()) {
      data.dailyCount = 0
      data.lastUsed = getTodayString()
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    }
    return data
  }
  
  // Initialize new usage data
  const newData: UsageData = {
    sessionId: generateSessionId(),
    dailyCount: 0,
    totalCount: 0,
    lastUsed: getTodayString()
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newData))
  return newData
}

// Use environment variable for API URL (build-time default)
const BUILD_API_URL = process.env.NEXT_PUBLIC_API_URL;

const loadingMessages = [
  { message: "Warming up our GPU Momory...", duration: 2000 },
  { message: "Waking up the AI container...", duration: 2000 },
  { message: "Loading Nigerian voice models...", duration: 5000 },
  { message: "Teaching the AI proper Naija pronunciation...", duration: 4000 },
  { message: "Adding that special Nigerian flavor...", duration: 5000 },
  { message: "Almost there! Generating your audio...", duration: 5000 },
]

export default function TextToSpeechConverter() {
  const [usageData, setUsageData] = useState<UsageData>({
    sessionId: '',
    dailyCount: 0,
    totalCount: 0,
    lastUsed: getTodayString()
  })
  const [isProcessing, setIsProcessing] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0)
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

  // Initialize usage data on client side
  useEffect(() => {
    setUsageData(getUsageData())
  }, [])

  // Load runtime config to allow endpoint overrides without redeploying JS
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const res = await fetch('/config.json', { cache: 'no-store' })
        if (res.ok) {
          const cfg = await res.json()
          if (cfg && typeof cfg.apiUrl === 'string' && cfg.apiUrl.length > 0) {
            setApiBaseUrl(cfg.apiUrl)
            console.info('Config apiUrl detected:', cfg.apiUrl)
          }
        }
      } catch (_) {
      }
    }
    if (typeof window !== 'undefined') loadConfig()
  }, [])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (isProcessing && loadingMessageIndex < loadingMessages.length - 1) {
      timeout = setTimeout(() => {
        setLoadingMessageIndex(prev => prev + 1)
      }, loadingMessages[loadingMessageIndex].duration)
    }
    return () => clearTimeout(timeout)
  }, [isProcessing, loadingMessageIndex])

  // Reset loading message index when processing stops
  useEffect(() => {
    if (!isProcessing) {
      setLoadingMessageIndex(0)
    }
  }, [isProcessing])

  // Add voice options by language
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

  const handleLanguageChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      language: value,
      speaker: voiceOptions[value as keyof typeof voiceOptions][0].value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate empty text
    if (!formData.text.trim()) {
      setError("Please enter some text to convert to speech.")
      return
    }
    
    // Check daily limit
    if (usageData.dailyCount >= DAILY_LIMIT) {
      setError("You've reached your daily limit. Please try again tomorrow.")
      return
    }

    setIsProcessing(true)
    setError(null)
    setAudioUrl(null)

    try {
      const runtimeApiUrl = (typeof window !== 'undefined' && (window as any).NEXT_PUBLIC_API_URL) || undefined
      const effectiveBase = apiBaseUrl || runtimeApiUrl || BUILD_API_URL

      if (!effectiveBase) {
        console.error('NEXT_PUBLIC_API_URL is not defined')
        setError('Service endpoint not configured. Please try again later.')
        setIsProcessing(false)
        return
      }

      const endpoint = `${effectiveBase}/api/v1/generate-speech`
      console.info('TTS endpoint:', endpoint, '| base from', apiBaseUrl ? 'config.json' : (runtimeApiUrl ? 'window' : 'build'))
      console.info('Debug - apiBaseUrl:', apiBaseUrl, 'runtimeApiUrl:', runtimeApiUrl, 'BUILD_API_URL:', BUILD_API_URL)

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
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

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate speech')
      }

      // Update usage counts on successful generation
      const newUsageData = {
        ...usageData,
        dailyCount: usageData.dailyCount + 1,
        totalCount: usageData.totalCount + 1,
        lastUsed: getTodayString()
      }
      setUsageData(newUsageData)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUsageData))

      setAudioUrl(data.audio_url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating speech')
      console.error('Speech generation error:', err)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    if (name === "text") {
      const words = value.trim().split(/\s+/).filter(word => word.length > 0)
      if (words.length > 60) {
        // Take only first 60 words
        const truncatedText = words.slice(0, 60).join(' ')
        setFormData(prev => ({ ...prev, [name]: truncatedText }))
      } else {
        setFormData(prev => ({ ...prev, [name]: value }))
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length
  }

  const handleSpeedChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, speed: value[0] }))
  }

  const handleDownload = async () => {
    if (!audioUrl) return;
    
    try {
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const filename = formData.fileName 
        ? `${formData.fileName}.wav`
        : audioUrl.split('/').pop() || 'audio.wav';
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError('Failed to download audio file');
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Usage Stats Display */}
      <div className="mb-6 p-4 bg-white dark:bg-gray-900
        border-4 border-green-600 dark:border-green-600 rounded-xl
        shadow-[4px_4px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[4px_4px_0px_0px_rgba(22,163,74,0.2)]">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-green-700 dark:text-green-500 font-medium">
              Daily Usage: {usageData.dailyCount}/{DAILY_LIMIT} requests
            </p>
            <p className="text-sm text-green-600 dark:text-green-400">
              Resets at midnight
            </p>
          </div>
          <div className="text-right">
            <p className="text-green-700 dark:text-green-500 font-medium">
              Total Usage: {usageData.totalCount} requests
            </p>
            <p className="text-sm text-green-600 dark:text-green-400">
              Session ID: {usageData.sessionId.slice(0, 8)}...
            </p>
          </div>
        </div>
        {usageData.dailyCount >= DAILY_LIMIT - 2 && usageData.dailyCount < DAILY_LIMIT && (
          <p className="mt-2 text-yellow-600 dark:text-yellow-500 text-sm">
            ⚠️ You're approaching your daily limit. Only {DAILY_LIMIT - usageData.dailyCount} requests remaining.
          </p>
        )}
        {usageData.dailyCount >= DAILY_LIMIT && (
          <p className="mt-2 text-red-600 dark:text-red-500 text-sm">
            ⚠️ You've reached your daily limit. Please try again tomorrow.
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 
        border-4 border-green-600 dark:border-green-600 rounded-xl
        shadow-[8px_8px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[8px_8px_0px_0px_rgba(22,163,74,0.2)]
        transform transition-all">
        
        {/* Text Input */}
        <div className="mb-6 relative
          border-2 border-green-600 dark:border-green-600 rounded-lg
          shadow-[4px_4px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[4px_4px_0px_0px_rgba(22,163,74,0.2)]">
          <Textarea 
            name="text"
            value={formData.text}
            onChange={handleInputChange}
            placeholder="Enter text.."
            style={{ fontSize: '16px' }}
            className="min-h-[120px] bg-white dark:bg-gray-900 text-green-700 dark:text-green-500 border-none focus:ring-0 rounded-lg placeholder-green-500 dark:placeholder-green-400"
          />
          <div className="absolute bottom-2 right-3">
            <span className={`text-[10px] sm:text-xs font-medium ${getWordCount(formData.text) >= 60 ? 'text-red-500 dark:text-red-400' : 'text-green-600 dark:text-green-500'}`}>
              {getWordCount(formData.text)}/60 words
            </span>
          </div>
        </div>

        {/* Language Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="border-2 border-green-600 dark:border-green-600 rounded-lg
            shadow-[4px_4px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[4px_4px_0px_0px_rgba(22,163,74,0.2)]">
            <Select value={formData.language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-full bg-white dark:bg-gray-900 text-green-700 dark:text-green-500">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="yoruba">Yoruba</SelectItem>
                <SelectItem value="igbo">Igbo</SelectItem>
                <SelectItem value="hausa">Hausa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="border-2 border-green-600 dark:border-green-600 rounded-lg
            shadow-[4px_4px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[4px_4px_0px_0px_rgba(22,163,74,0.2)]">
            <Select 
              value={formData.speaker}
              onValueChange={(value) => setFormData(prev => ({ ...prev, speaker: value }))}
            >
              <SelectTrigger className="w-full bg-white dark:bg-gray-900 text-green-700 dark:text-green-500">
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent>
                {voiceOptions[formData.language as keyof typeof voiceOptions].map((voice) => (
                  <SelectItem key={voice.value} value={voice.value}>
                    {voice.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Speed Control */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-green-700 dark:text-green-500">
            Talking Speed: {formData.speed}x
          </label>
          <div className="border-2 border-green-600 dark:border-green-600 rounded-lg p-4
            shadow-[4px_4px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[4px_4px_0px_0px_rgba(22,163,74,0.2)]
            bg-white dark:bg-gray-900">
            <Slider 
              min={0.5}
              max={2}
              step={0.1}
              value={[formData.speed]}
              onValueChange={handleSpeedChange}
              className="bg-green-200 dark:bg-green-800" 
            />
          </div>
        </div>

        {/* Filename Input */}
        <div className="mb-6">
          <Input 
            name="fileName"
            value={formData.fileName}
            onChange={handleInputChange}
            placeholder="Name of the resulting audio file (optional)"
            style={{ fontSize: '16px' }}
            className="bg-white dark:bg-gray-900 text-green-700 dark:text-green-500 border-2 border-green-600 dark:border-green-600 rounded-lg
              shadow-[4px_4px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[4px_4px_0px_0px_rgba(22,163,74,0.2)]
              placeholder-green-500 dark:placeholder-green-400"
          />
        </div>

        {/* Convert Button */}
        <Button 
          type="submit"
          disabled={isProcessing || !formData.text.trim()}
          className="w-full bg-green-600 text-white dark:bg-green-600 font-bold text-lg
            border-4 border-green-600 dark:border-green-600 rounded-lg
            shadow-[4px_4px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[4px_4px_0px_0px_rgba(22,163,74,0.2)]
            hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none 
            transform transition-all disabled:opacity-50"
        >
          {isProcessing ? (
            <div className="flex items-center justify-center gap-2">
              <LoadingSpinner />
              <span className="ml-2">Generating Audio...</span>
            </div>
          ) : !formData.text.trim() ? (
            "Enter text to convert"
          ) : (
            "Convert to Speech"
          )}
        </Button>

        {/* Processing State */}
        {isProcessing && (
          <div className="mt-6 p-6 border-2 border-green-600 bg-green-50 dark:bg-gray-800 rounded-lg
            shadow-[4px_4px_0px_0px_rgba(22,163,74,0.5)]">
            <div className="flex items-center justify-center">
              <LoadingSpinner />
              <div className="ml-4">
                <p className="text-green-700 dark:text-green-400 font-medium">
                  {loadingMessages[loadingMessageIndex].message}
                </p>
                <p className="text-sm text-green-600 dark:text-green-500 mt-1">
                  This might take a minute, but it worth the wait! 🎵
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mt-6 p-4 border-2 border-red-500 bg-red-50 dark:bg-gray-800 rounded-lg
            shadow-[4px_4px_0px_0px_rgba(239,68,68,0.5)]">
            <span className="text-red-700 dark:text-red-400">{error}</span>
          </div>
        )}

        {/* Success State */}
        {audioUrl && (
          <div className="mt-6 p-4 border-2 border-green-600 bg-green-50 dark:bg-gray-800 rounded-lg
            shadow-[4px_4px_0px_0px_rgba(22,163,74,0.5)] space-y-4">
            <p className="text-green-700 dark:text-green-400">Audio generated successfully!</p>
            <audio controls className="w-full">
              <source src={audioUrl} type="audio/wav" />
              Your browser does not support the audio element.
            </audio>
            <Button
              type="button"
              onClick={handleDownload}
              className="w-full bg-green-600 text-white dark:bg-green-600 font-bold
                border-2 border-green-600 dark:border-green-600 rounded-lg
                shadow-[4px_4px_0px_0px_rgba(22,163,74,0.5)] dark:shadow-[4px_4px_0px_0px_rgba(22,163,74,0.2)]
                hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none 
                transform transition-all"
            >
              Download Audio
            </Button>
          </div>
        )}
      </form>
    </div>
  )
} 