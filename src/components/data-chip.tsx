import * as React from "react"
import { Database, Lock, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DataChipProps {
  type: "fi-mcp" | "ephemeral" | "cached"
  timestamp?: Date
  source?: string
  className?: string
  onExpand?: () => void
}

export function DataChip({ type, timestamp, source, className, onExpand }: DataChipProps) {
  const icons = {
    "fi-mcp": Database,
    "ephemeral": Lock,
    "cached": Clock
  }
  
  const labels = {
    "fi-mcp": "From FI MCP Snapshot",
    "ephemeral": "Ephemeral Fetch Only", 
    "cached": "From Cache"
  }
  
  const chipStyles = {
    "fi-mcp": "chip-trust",
    "ephemeral": "chip-ephemeral",
    "cached": "chip-trust"
  }
  
  const Icon = icons[type]
  
  const formatTimestamp = (date: Date) => {
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.round((date.getTime() - Date.now()) / (1000 * 60)), 
      'minute'
    )
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(chipStyles[type], "h-auto p-1 text-xs cursor-pointer", className)}
            onClick={onExpand}
          >
            <Icon className="w-3 h-3" />
            <span>{labels[type]}</span>
            {timestamp && (
              <>
                <span>•</span>
                <span>{formatTimestamp(timestamp)}</span>
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top" className="max-w-xs">
          <div className="space-y-1">
            <p className="font-medium">{labels[type]}</p>
            {source && <p className="text-xs text-muted-foreground">{source}</p>}
            {timestamp && (
              <p className="text-xs text-muted-foreground">
                {timestamp.toLocaleString()}
              </p>
            )}
            {onExpand && (
              <p className="text-xs text-muted-foreground">Click to view full provenance</p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}