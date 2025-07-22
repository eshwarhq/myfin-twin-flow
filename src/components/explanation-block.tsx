import * as React from "react"
import { ChevronDown, Database, Calculator, Brain } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataChip } from "./data-chip"

interface ExplanationBlockProps {
  isExpanded: boolean
  onToggle: () => void
  sourceData?: string
  calculations?: string
  modelNotes?: string
  dataSource?: {
    type: "fi-mcp" | "ephemeral" | "cached"
    timestamp?: Date
    source?: string
  }
}

export function ExplanationBlock({
  isExpanded,
  onToggle,
  sourceData,
  calculations,
  modelNotes,
  dataSource
}: ExplanationBlockProps) {
  return (
    <div className="mt-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className="h-auto p-0 text-xs text-primary hover:underline font-normal"
      >
        <span>How did I calculate this?</span>
        <ChevronDown 
          className={cn(
            "w-3 h-3 ml-1 transition-transform duration-200",
            isExpanded && "rotate-180"
          )} 
        />
      </Button>
      
      {isExpanded && (
        <div className="mt-3 p-3 rounded-xl bg-secondary/30 border border-border animate-explain-expand">
          <Tabs defaultValue="data" className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-8">
              <TabsTrigger value="data" className="text-xs">
                <Database className="w-3 h-3 mr-1" />
                Source Data
              </TabsTrigger>
              <TabsTrigger value="math" className="text-xs">
                <Calculator className="w-3 h-3 mr-1" />
                Calculations
              </TabsTrigger>
              <TabsTrigger value="model" className="text-xs">
                <Brain className="w-3 h-3 mr-1" />
                AI Reasoning
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="data" className="mt-3 space-y-2">
              {dataSource && (
                <div className="mb-2">
                  <DataChip
                    type={dataSource.type}
                    timestamp={dataSource.timestamp}
                    source={dataSource.source}
                  />
                </div>
              )}
              <div className="text-xs text-muted-foreground whitespace-pre-line">
                {sourceData || "Source data information not available."}
              </div>
            </TabsContent>
            
            <TabsContent value="math" className="mt-3">
              <div className="text-xs text-muted-foreground whitespace-pre-line font-mono">
                {calculations || "Calculation details not available."}
              </div>
            </TabsContent>
            
            <TabsContent value="model" className="mt-3">
              <div className="text-xs text-muted-foreground whitespace-pre-line">
                {modelNotes || "AI reasoning details not available."}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}