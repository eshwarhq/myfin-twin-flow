import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import abstractBg from "@/assets/abstract-bg.jpg";
import logo from "@/assets/logo.png";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (!agreedToTerms) {
      toast({
        title: "Terms Agreement Required",
        description: "Please agree to the terms and privacy policy to continue.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Demo Mode",
        description: "This is a demo. No actual account is created.",
      });
    }, 1500);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="absolute inset-0 z-0">
        <img 
          src={abstractBg} 
          alt="" 
          className="h-full w-full object-cover opacity-30" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
      </div>
      
      <div className="container relative z-10 mx-auto flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-4xl">
          <div className="mb-8 text-center">
            <Link to="/" className="inline-block">
              <img src={logo} alt="MyFinance Twin AI Logo" className="h-16 w-16 mx-auto" />
            </Link>
            <h1 className="mt-4 text-3xl font-bold">Create Your Secure Financial Twin</h1>
            <p className="text-muted-foreground">Get started with personalized financial insights</p>
          </div>
          
          <Card className="animate-fade-in overflow-hidden">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Create your account to start your financial journey
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2">
                {/* Left Column - Input Fields */}
                <CardContent className="space-y-4 p-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium leading-none">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Jane Smith"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="focus-gradient"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="focus-gradient"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium leading-none">
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="focus-gradient"
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Must be at least 8 characters long
                    </p>
                  </div>
                </CardContent>
                
                {/* Right Column - Privacy Promises */}
                <div className="bg-secondary/50 p-6">
                  <h3 className="mb-4 text-lg font-semibold">Our Privacy Promise To You</h3>
                  
                  <div className="space-y-4">
                    {/* Promise 1 */}
                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">You Are in Control</h4>
                        <p className="text-sm text-muted-foreground">
                          You have full transparency and can revoke data access at any time.
                        </p>
                      </div>
                    </div>
                    
                    {/* Promise 2 */}
                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Zero-Trust Security</h4>
                        <p className="text-sm text-muted-foreground">
                          Your data is always yours, encrypted end-to-end. We never store raw data; each query uses ephemeral snapshots from Fi MCP.
                        </p>
                      </div>
                    </div>
                    
                    {/* Promise 3 */}
                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                          <circle cx="12" cy="12" r="10"/>
                          <path d="M12 8v4l3 3"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Your Data is Not Our Product</h4>
                        <p className="text-sm text-muted-foreground">
                          We will never use your personal data to train our AI models.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <CardFooter className="flex-col space-y-4 border-t p-6">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="terms" 
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm leading-none"
                  >
                    By creating an account, I agree to the{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and acknowledge the Data Privacy Promises above.
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  variant="gradient" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create My Secure Account"}
                </Button>
                
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Signup;