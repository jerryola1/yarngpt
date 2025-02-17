"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Mic, Paperclip } from "lucide-react"
import Hero from "../components/Hero"
import LoadingSpinner from "@/components/LoadingSpinner"

// This will use the production URL in production and localhost in development
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function Home() {
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    text: "",
    speaker: "idera",
    temperature: 0.1,
    repetition_penalty: 1.1,
    max_length: 4000,
    fileName: "",
    speed: 1,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    setError(null)
    setAudioUrl(null)

    try {
      // Use the API_URL constant instead of hardcoded localhost
      const response = await fetch(`${API_URL}/api/v1/generate-speech`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: formData.text,
          speaker: formData.speaker,
          temperature: formData.temperature,
          repetition_penalty: formData.repetition_penalty,
          max_length: formData.max_length,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Failed to generate speech')
      }

      const data = await response.json()
      setAudioUrl(data.audio_url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSpeedChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, speed: value[0] }))
  }

  const handleSpeakerChange = (value: string) => {
    setFormData(prev => ({ ...prev, speaker: value }))
  }

  const handleDownload = async () => {
    if (!audioUrl) return;
    
    try {
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      // Use custom filename if provided, otherwise use the original filename
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800">
      <Hero />
      <div id="convert" className="container mx-auto p-4 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-700 shadow-lg rounded-lg p-6 mt-8">
          <div className="relative">
            <Textarea
              name="text"
              value={formData.text}
              onChange={handleInputChange}
              placeholder="Enter text to convert to speech in any Nigerian language"
              className="min-h-[100px] pr-20"
            />
            <div className="absolute right-2 top-2 flex space-x-2">
              {/* <Button type="button" size="icon" variant="ghost">
                <Mic className="h-4 w-4" />
              </Button> */}
              <Button type="button" size="icon" variant="ghost">
                <Paperclip className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              value={formData.speaker}
              onValueChange={handleSpeakerChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a voice" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="idera">Idera (Female, Default)</SelectItem>
                <SelectItem value="joke">Joke (Female)</SelectItem>
                <SelectItem value="jude">Jude (Male)</SelectItem>
                <SelectItem value="umar">Umar (Male)</SelectItem>
                <SelectItem value="osagie">Osagie (Male)</SelectItem>
                <SelectItem value="onye">Onye (Male)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="speed" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Talking Speed: {formData.speed}x
            </label>
            <Slider
              id="speed"
              min={0.5}
              max={2}
              step={0.1}
              value={[formData.speed]}
              onValueChange={handleSpeedChange}
            />
          </div>

          <Input
            name="fileName"
            value={formData.fileName}
            onChange={handleInputChange}
            placeholder="Name of the resulting audio file (optional)"

          />

          <Button type="submit" className="w-full" disabled={isProcessing}>
            {isProcessing ? (
              <div className="flex items-center justify-center gap-2">
                <LoadingSpinner />
                <span className="ml-2">Generating Audio...</span>
              </div>
            ) : (
              "Convert to Speech"
            )}
          </Button>

          {isProcessing && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-md">
              <div className="flex items-center justify-center">
                <LoadingSpinner />
                <span className="ml-2 text-blue-600 dark:text-blue-300">Please wait while we generate your audio...</span>
              </div>
            </div>
          )}

          {error && (
            <div className="p-4 text-red-500 bg-red-50 rounded-md">
              {error}
            </div>
          )}

          {audioUrl && (
            <div className="p-4 bg-green-50 rounded-md space-y-4">
              <p className="text-green-600">Audio generated successfully!</p>
              <audio controls className="w-full">
                <source src={audioUrl} type="audio/wav" />
                Your browser does not support the audio element.
              </audio>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={handleDownload}
              >
                Download Audio
              </Button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

