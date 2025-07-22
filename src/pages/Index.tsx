import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { ChatInput } from "@/components/chat-input";
import { SmartChip } from "@/components/smart-chip";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import abstractBg from "@/assets/abstract-bg.jpg";
import logo from "@/assets/logo.png";
const Index = () => {
  const [demoQuestion, setDemoQuestion] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const suggestionChips = ["What's my net worth looking like?", "Show me spending patterns this month", "Am I on track for retirement?", "Find unusual transactions", "Optimize my budget allocation"];
  const handleSendDemo = (message: string) => {
    toast({
      title: "Sign up to continue",
      description: "Create an account to start your financial journey with MyFinance Twin AI.",
      action: <Link to="/signup">
          <Button variant="gradient" size="sm">Sign Up</Button>
        </Link>
    });
  };
  const handleToggleVoice = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "Voice input activated",
        description: "Please sign up to use this feature."
      });

      // Simulate voice recognition ending after 3 seconds
      setTimeout(() => {
        setIsRecording(false);
      }, 3000);
    }
  };
  return <div className="flex min-h-screen flex-col surface-ambient">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          {/* Ambient geometric background */}
          <div className="absolute inset-0 z-0 animate-ambient-drift opacity-30">
            <div className="absolute top-20 left-1/4 w-32 h-32 rounded-full bg-gradient-to-br from-accent-blue/8 to-transparent" />
            <div className="absolute top-1/3 right-1/4 w-24 h-24 rounded-lg bg-gradient-to-br from-accent-cyan/6 to-transparent rotate-45" />
            <div className="absolute bottom-1/3 left-1/3 w-20 h-20 rounded-full bg-gradient-to-br from-accent-bridge/5 to-transparent" />
          </div>
          
          {/* Original abstract background (reduced opacity) */}
          <div className="absolute inset-0 z-0">
            <img src={abstractBg} alt="" className="h-full w-full object-cover opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80"></div>
          </div>
          
          <div className="container relative z-10 mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 flex justify-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/80 backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 text-accent-blue" />
                  <span className="text-sm font-medium text-muted-foreground">Powered by Gemini AI + FI MCP</span>
                </div>
              </div>
              
              <div className="mb-8 flex justify-center">
                <img src={logo} alt="MyFinance Twin AI Logo" className="h-20 w-20" />
              </div>
              
              <h1 className="animate-fade-in mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                AI today can answer general financial questions—
                <br />
                
              </h1>
              
              <p className="animate-slide-up mb-10 text-xl text-muted-foreground max-w-3xl mx-auto">
                MyFinance Twin AI is your intelligent financial co-pilot that simulates your future, 
                spots anomalies, and guides you to better decisions.
              </p>
              
              {/* Primary Conversational Input Slab */}
              <div className="animate-fade-in mx-auto mb-6 flex justify-center">
                <ChatInput className="w-full max-w-2xl shadow-lg hover:shadow-glow rounded-2xl" onSend={handleSendDemo} isRecording={isRecording} onToggleVoice={handleToggleVoice} />
              </div>
              
              {/* "Or see what's possible" suggestion chips */}
              <div className="animate-fade-in mb-10">
                <p className="text-sm text-muted-foreground mb-4">Or see what's possible</p>
                <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
                  {suggestionChips.map((suggestion, index) => <SmartChip key={index} variant="suggestion" className="text-xs" onClick={() => handleSendDemo(suggestion)}>
                      {suggestion}
                    </SmartChip>)}
                </div>
              </div>
              
              <div className="animate-fade-in flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link to="/signup">
                  <Button variant="gradient" size="xl" className="w-full sm:w-auto shadow-lg hover:shadow-glow">
                    Create Free Account
                  </Button>
                </Link>
                <Link to="/features">
                  <Button variant="outline" size="xl" className="w-full sm:w-auto border-gradient">
                    See How It Works
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Highlight Section */}
        <section className="bg-card py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Your Financial Future, Reimagined</h2>
            
            <div className="grid gap-8 md:grid-cols-3">
              {/* Feature 1 */}
              <div className="rounded-xl border p-6 shadow-card transition-all duration-300 hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                    <path d="M8.5 8.5v.01" />
                    <path d="M16 15.5v.01" />
                    <path d="M12 12v.01" />
                    <path d="M11 17v.01" />
                    <path d="M7 14v.01" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Personalized Insights</h3>
                <p className="text-muted-foreground">
                  AI that understands your unique financial situation and provides tailored advice.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="rounded-xl border p-6 shadow-card transition-all duration-300 hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M2 12a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V7H2Z" />
                    <path d="M6 11c0-5.573 2.886-10 5.5-10S17 5.427 17 11" />
                    <path d="M15 5h-3" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Future Simulation</h3>
                <p className="text-muted-foreground">
                  See the potential impact of financial decisions before you make them.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="rounded-xl border p-6 shadow-card transition-all duration-300 hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                    <path d="m16 8-4-4-4 4" />
                    <path d="M12 4v9" />
                    <path d="M12 18v.01" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-semibold">Secure Integration</h3>
                <p className="text-muted-foreground">
                  Safely connect your financial accounts with bank-level encryption.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="border-t py-8">
        <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row">
          <p className="mb-4 text-sm text-muted-foreground md:mb-0">
            © 2025 MyFinance Twin AI. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>;
};
export default Index;