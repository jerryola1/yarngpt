'use client'

import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Coffee, ExternalLink, Heart } from 'lucide-react'

export function BuyMeCoffeeModal({
  isOpen,
  onClose
}: {
  isOpen: boolean
  onClose: () => void
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* DialogContent already has some default styles, we'll override/add to them */}
      <DialogContent className="sm:max-w-[450px] p-0 bg-transparent border-none shadow-none">
        <div className="bg-card/95 backdrop-blur-xl border border-foreground/10 shadow-2xl overflow-hidden relative flex flex-col">
            
            {/* Header Area */}
            <div className="p-6 border-b border-foreground/10 bg-background/50 flex flex-col items-center text-center gap-4">
                <div className="h-16 w-16 bg-yellow-500/20 rounded-none flex items-center justify-center text-yellow-500 border border-yellow-500/50">
                    <Coffee className="h-8 w-8" />
                </div>
                <div>
                    <DialogTitle className="text-2xl font-bold font-jetbrains mb-2">Support YarnGPT</DialogTitle>
                    <DialogDescription className="text-muted-foreground text-base">
                        Help us keep the servers running and the voices flowing!
                    </DialogDescription>
                </div>
            </div>

            {/* Body Content */}
            <div className="p-6 space-y-4 text-center">
                <p className="text-foreground/80 leading-relaxed">
                    Building and maintaining AI voice models for Nigerian languages takes a lot of resources. Your support helps us:
                </p>
                <ul className="text-sm text-muted-foreground space-y-2 text-left inline-block mx-auto">
                    <li className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-500" /> Add more authentic voices
                    </li>
                    <li className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-500" /> Improve translation accuracy
                    </li>
                    <li className="flex items-center gap-2">
                        <Heart className="h-4 w-4 text-red-500" /> Keep the service free for students
                    </li>
                </ul>
            </div>

            {/* Footer Actions */}
            <div className="p-6 bg-background/50 border-t border-foreground/10 flex flex-col gap-3">
                <Button 
                    className="w-full h-12 text-lg font-bold font-jetbrains bg-[#FFDD00] hover:bg-[#FFDD00]/90 text-black rounded-none shadow-lg"
                    onClick={() => window.open('https://www.buymeacoffee.com/yarngpt', '_blank')}
                >
                    <Coffee className="mr-2 h-5 w-5" />
                    Buy me a coffee
                    <ExternalLink className="ml-2 h-4 w-4 opacity-50" />
                </Button>
                <Button 
                    variant="ghost" 
                    onClick={onClose}
                    className="w-full rounded-none text-muted-foreground hover:text-foreground font-jetbrains"
                >
                    Maybe later
                </Button>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}