import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SmartChipProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "suggestion" | "action" | "filter"
  active?: boolean
  className?: string
}

export function SmartChip({ 
  children, 
  onClick, 
  variant = "suggestion", 
  active = false,
  className 
}: SmartChipProps) {
  const variants = {
    suggestion: cn(
      "h-8 px-3 text-xs font-medium rounded-full border border-border",
      "bg-card hover:bg-secondary transition-all duration-200",
      "hover:border-gradient hover:shadow-glow",
      active && "border-gradient bg-secondary"
    ),
    action: cn(
      "h-9 px-4 text-sm font-medium rounded-full",
      "border border-input bg-card hover:bg-secondary",
      "hover:border-gradient transition-all duration-200"
    ),
    filter: cn(
      "h-7 px-2 text-xs font-medium rounded-lg",
      "border border-border bg-card hover:bg-accent",
      active && "bg-secondary border-primary"
    )
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={cn(variants[variant], className)}
    >
      {children}
    </Button>
  )
}