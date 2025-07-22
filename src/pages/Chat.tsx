import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChatInput } from "@/components/chat-input";
import { SmartChip } from "@/components/smart-chip";
import { ExplanationBlock } from "@/components/explanation-block";
import { DataChip } from "@/components/data-chip";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import logo from "@/assets/logo.png";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  explanation?: {
    sourceData?: string;
    calculations?: string;
    modelNotes?: string;
  };
  showExplanation?: boolean;
  dataSource?: {
    type: "fi-mcp" | "ephemeral" | "cached";
    timestamp?: Date;
    source?: string;
  };
  suggestions?: string[];
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Welcome to MyFinance Twin AI! How can I help with your finances today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      let aiResponse: Message;
      
      // Provide example responses for demo purposes
      if (content.toLowerCase().includes("net worth")) {
        aiResponse = {
          id: `ai-${Date.now()}`,
          content: "Your current net worth is $47,300, which is up 12.6% from the beginning of the year. Your assets total $72,800 and your liabilities are $25,500.",
          sender: "ai",
          timestamp: new Date(),
          explanation: {
            sourceData: "Connected accounts from FI MCP:\n• Checking Account (Chase): $8,200\n• Savings Account (Chase): $15,500\n• Investment Account (Fidelity): $49,100\n• Credit Card (Chase): -$3,500\n• Student Loan (Sallie Mae): -$22,000",
            calculations: "Assets = $8,200 + $15,500 + $49,100 = $72,800\nLiabilities = $3,500 + $22,000 = $25,500\nNet Worth = $72,800 - $25,500 = $47,300",
            modelNotes: "Used standard net worth calculation. Growth rate compared to previous quarter data. All balances current as of last sync."
          },
          dataSource: {
            type: "fi-mcp",
            timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
            source: "Chase Bank, Fidelity, Sallie Mae"
          },
          suggestions: ["Compare month-over-month spending", "Show investment performance", "Track goal progress"]
        };
      } else if (content.toLowerCase().includes("budget") || content.toLowerCase().includes("spending")) {
        aiResponse = {
          id: `ai-${Date.now()}`,
          content: "You've spent $2,450 this month, which is about 15% less than your monthly average. Your largest spending category is housing at $1,200, followed by groceries at $650.",
          sender: "ai",
          timestamp: new Date(),
          explanation: {
            sourceData: "Transaction data from the past 30 days:\n• 47 transactions analyzed\n• 5 categories identified\n• Data from Chase Checking & Credit accounts",
            calculations: "Housing: $1,200 (49%)\nGroceries: $650 (26.5%)\nEntertainment: $250 (10.2%)\nTransportation: $180 (7.3%)\nOther: $170 (7%)\nTotal: $2,450",
            modelNotes: "Categorization based on merchant data and transaction descriptions. Compared against 6-month average of $2,882/month."
          },
          dataSource: {
            type: "fi-mcp",
            timestamp: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
            source: "Chase Bank transaction history"
          },
          suggestions: ["Break down grocery spending", "Find cost-saving opportunities", "Set spending alerts"]
        };
      } else if (content.toLowerCase().includes("save") || content.toLowerCase().includes("saving")) {
        aiResponse = {
          id: `ai-${Date.now()}`,
          content: "Based on your spending patterns, you could save an additional $320 per month by reducing your entertainment and food delivery expenses. Would you like me to suggest a specific savings plan?",
          sender: "ai",
          timestamp: new Date(),
        };
      } else {
        aiResponse = {
          id: `ai-${Date.now()}`,
          content: "I understand you're asking about " + content.toLowerCase() + ". Based on your financial profile, I can provide personalized guidance on this topic. Would you like me to analyze specific aspects of your finances related to this?",
          sender: "ai",
          timestamp: new Date(),
        };
      }
      
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const toggleVoiceInput = () => {
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      toast({
        title: "Voice input activated",
        description: "Please speak clearly. Voice recognition is simulated in this demo.",
      });
      
      // Simulate voice recognition ending after 3 seconds
      setTimeout(() => {
        setIsRecording(false);
        handleSendMessage("What's my current net worth?");
      }, 3000);
    }
  };

  const toggleExplanation = (id: string) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === id
          ? { ...message, showExplanation: !message.showExplanation }
          : message
      )
    );
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full glass-effect border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-8 w-8" />
            <span className="text-gradient font-bold text-xl">MyFinance Twin AI</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" asChild>
                    <Link to="/dashboard">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                        <polyline points="9 22 9 12 15 12 15 22"/>
                      </svg>
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Dashboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">
              JS
            </div>
          </div>
        </div>
      </header>
      
      {/* Chat Messages */}
      <main className="flex-1 overflow-y-auto p-4">
        <div className="mx-auto max-w-2xl">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className="flex flex-col">
                <div
                  className={`flex max-w-[80%] ${
                    message.sender === "user" ? "ml-auto" : "mr-auto"
                  }`}
                >
                  <div
                    className={`rounded-xl p-3 ${
                      message.sender === "user"
                        ? "bg-secondary text-foreground"
                        : "border border-accent-start bg-card text-foreground"
                    }`}
                  >
                    <p>{message.content}</p>
                    
                    {/* Data Provenance */}
                    {message.dataSource && (
                      <div className="mt-2">
                        <DataChip
                          type={message.dataSource.type}
                          timestamp={message.dataSource.timestamp}
                          source={message.dataSource.source}
                        />
                      </div>
                    )}
                    
                    {/* Explanation Block */}
                    {message.explanation && (
                      <ExplanationBlock
                        isExpanded={message.showExplanation || false}
                        onToggle={() => toggleExplanation(message.id)}
                        sourceData={message.explanation.sourceData}
                        calculations={message.explanation.calculations}
                        modelNotes={message.explanation.modelNotes}
                        dataSource={message.dataSource}
                      />
                    )}
                    
                    {/* Smart Follow-up Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {message.suggestions.map((suggestion, index) => (
                          <SmartChip
                            key={index}
                            variant="suggestion"
                            onClick={() => handleSendMessage(suggestion)}
                          >
                            {suggestion}
                          </SmartChip>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <span
                  className={`mt-1 text-xs text-muted-foreground ${
                    message.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </main>
      
      {/* Chat Input */}
      <div className={`transition-all duration-500 ${isRecording ? 'bg-background/50 backdrop-blur-md' : ''}`}>
        <div className="container py-4">
          <ChatInput
            className={`mx-auto max-w-2xl transition-all duration-300 ${
              isRecording ? 'animate-morph-to-circle w-14 h-14 mx-auto p-0 border-0 bg-gradient-to-r from-accent-start to-accent-end' : ''
            }`}
            placeholder={!isRecording ? "Type your financial question..." : ""}
            onSend={handleSendMessage}
            voiceEnabled={true}
            isRecording={isRecording}
            onToggleVoice={toggleVoiceInput}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;