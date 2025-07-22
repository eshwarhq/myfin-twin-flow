import * as React from "react"
import { Mic } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface ChatInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSend?: (message: string) => void
  placeholder?: string
  voiceEnabled?: boolean
  isRecording?: boolean
  onToggleVoice?: () => void
}

export function ChatInput({
  className,
  placeholder = "Ask me anything about your finances...",
  voiceEnabled = true,
  isRecording = false,
  onSend,
  onToggleVoice,
  ...props
}: ChatInputProps) {
  const [input, setInput] = React.useState<string>("")
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSend?.(input)
      setInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative flex w-full max-w-3xl items-center",
        className
      )}
    >
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={cn(
          "flex h-14 w-full rounded-full border border-input bg-card px-4 py-2 pr-12 text-base transition-all hover:border-accent-start focus:border-gradient focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          isRecording && "animate-pulse-glow border-accent-start",
          className
        )}
        {...props}
      />
      {voiceEnabled && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={cn(
            "absolute right-2 h-10 w-10 rounded-full hover:bg-secondary",
            isRecording && "text-accent-start animate-pulse"
          )}
          onClick={onToggleVoice}
        >
          <Mic className="h-5 w-5" />
        </Button>
      )}
    </form>
  )
}