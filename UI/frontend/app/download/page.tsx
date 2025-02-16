import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function DownloadPage() {
  return (
    <div className="container mx-auto p-4 max-w-md text-center">
      <h1 className="text-2xl font-bold mb-4">Your audio is ready!</h1>
      <Button asChild className="mb-4">
        <a href="/path-to-generated-audio.mp3" download>
          Download Audio
        </a>
      </Button>
      <div>
        <Link href="/" className="text-blue-500 hover:underline">
          Create another audio
        </Link>
      </div>
    </div>
  )
}

