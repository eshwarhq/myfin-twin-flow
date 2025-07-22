import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatInput } from "@/components/chat-input";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import logo from "@/assets/logo.png";

// Mock data for dashboard components
const netWorthData = [
  { month: "Jan", value: 42000 },
  { month: "Feb", value: 43200 },
  { month: "Mar", value: 44500 },
  { month: "Apr", value: 44000 },
  { month: "May", value: 45200 },
  { month: "Jun", value: 47300 },
];

const goals = [
  { name: "Buy a home by 2028", current: 35000, target: 120000 },
  { name: "Emergency fund", current: 9500, target: 15000 },
  { name: "Travel fund", current: 2500, target: 5000 },
];

const spendingData = [
  { category: "Groceries", amount: 650, trend: "normal" },
  { category: "Entertainment", amount: 250, trend: "high" },
  { category: "Transportation", amount: 180, trend: "low" },
];

const Dashboard = () => {
  const [activeTimeframe, setActiveTimeframe] = useState("6M");
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const { toast } = useToast();

  const handleChatSend = (message: string) => {
    toast({
      title: "Demo Mode",
      description: "This is a demo. Your message was: " + message,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };

  const getGoalProgress = (current: number, target: number) => {
    return Math.round((current / target) * 100);
  };

  // Determine card class based on selection state
  const getCardClass = (cardId: string) => {
    if (!selectedCard) {
      return "transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg";
    }
    return selectedCard === cardId 
      ? "fixed inset-0 z-50 m-4 max-w-[calc(100%-2rem)] max-h-[calc(100%-2rem)] translate-x-0 translate-y-0"
      : "opacity-0 pointer-events-none";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-40 w-full glass-effect border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-8 w-8" />
            <span className="text-gradient font-bold text-xl">MyFinance Twin AI</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/dashboard" className="text-sm font-medium text-primary">Dashboard</Link>
            <Link to="/accounts" className="text-sm font-medium transition-colors hover:text-primary">Accounts</Link>
            <Link to="/budgets" className="text-sm font-medium transition-colors hover:text-primary">Budgets</Link>
            <Link to="/goals" className="text-sm font-medium transition-colors hover:text-primary">Goals</Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
              <span className="ml-1">AI</span>
            </Button>
            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-medium">
              JS
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <h1 className="mb-6 text-3xl font-bold">Financial Health Dashboard</h1>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Net Worth Card */}
          <Dialog>
            <DialogTrigger asChild>
              <Card className="cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>Net Worth Trend</CardTitle>
                    <div className="flex space-x-1">
                      {["1M", "6M", "1Y", "All"].map((period) => (
                        <Button
                          key={period}
                          variant={activeTimeframe === period ? "secondary" : "ghost"}
                          size="sm"
                          className="h-7 text-xs"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTimeframe(period);
                          }}
                        >
                          {period}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[180px] w-full">
                    {/* Simple visual representation of chart */}
                    <div className="relative h-full w-full">
                      <div className="absolute bottom-0 h-px w-full bg-border"></div>
                      <div className="flex h-full items-end justify-between">
                        {netWorthData.map((data, index) => (
                          <div key={index} className="flex w-1/6 flex-col items-center">
                            <div 
                              className="w-full rounded-t-sm bg-gradient-to-t from-accent-start to-accent-end" 
                              style={{ 
                                height: `${(data.value / 50000) * 100}%`,
                                opacity: 0.7 + (index / 20)
                              }}
                            ></div>
                            <span className="mt-2 text-xs text-muted-foreground">{data.month}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Current</p>
                      <p className="text-2xl font-bold">{formatCurrency(47300)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Change</p>
                      <p className="text-lg font-medium text-green-500">+12.6%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Net Worth Trend</DialogTitle>
                <DialogDescription>
                  A detailed look at how your net worth has changed over time.
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <div className="mb-4 flex space-x-1">
                  {["1M", "6M", "1Y", "All"].map((period) => (
                    <Button
                      key={period}
                      variant={activeTimeframe === period ? "secondary" : "ghost"}
                      size="sm"
                      onClick={() => setActiveTimeframe(period)}
                    >
                      {period}
                    </Button>
                  ))}
                </div>
                
                <div className="h-[300px] w-full">
                  {/* Extended chart representation */}
                  <div className="relative h-full w-full">
                    <div className="absolute bottom-0 h-px w-full bg-border"></div>
                    <div className="flex h-full items-end justify-between">
                      {netWorthData.map((data, index) => (
                        <div key={index} className="flex w-1/6 flex-col items-center">
                          <div 
                            className="w-full rounded-t-sm bg-gradient-to-t from-accent-start to-accent-end" 
                            style={{ 
                              height: `${(data.value / 50000) * 100}%`,
                              opacity: 0.7 + (index / 20)
                            }}
                          ></div>
                          <span className="mt-2 text-xs text-muted-foreground">{data.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 grid gap-4 grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Net Worth</p>
                    <p className="text-2xl font-bold">{formatCurrency(47300)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">YTD Change</p>
                    <p className="text-2xl font-bold text-green-500">+$5,300 (12.6%)</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Assets</p>
                    <p className="text-xl font-medium">{formatCurrency(72800)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Liabilities</p>
                    <p className="text-xl font-medium text-destructive">{formatCurrency(25500)}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <ChatInput 
                  placeholder="Ask about your net worth..."
                  onSend={handleChatSend}
                  className="w-full"
                />
              </div>
            </DialogContent>
          </Dialog>

          {/* Goals Progress Card */}
          <Dialog>
            <DialogTrigger asChild>
              <Card className="cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Goals Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {goals.map((goal, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{goal.name}</span>
                        <span className="text-sm text-muted-foreground">
                          {formatCurrency(goal.current)} / {formatCurrency(goal.target)}
                        </span>
                      </div>
                      <div className="relative h-2 overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full gradient-primary"
                          style={{ width: `${getGoalProgress(goal.current, goal.target)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{getGoalProgress(goal.current, goal.target)}% complete</span>
                        <span>
                          {goal.name.includes("2028") ? "4 years left" : "On track"}
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Financial Goals</DialogTitle>
                <DialogDescription>
                  Track your progress toward important financial milestones.
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4 space-y-6">
                {goals.map((goal, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">{goal.name}</h3>
                      <span className="text-sm px-2 py-1 rounded-full bg-secondary">
                        {getGoalProgress(goal.current, goal.target)}% complete
                      </span>
                    </div>
                    
                    <Progress value={getGoalProgress(goal.current, goal.target)} className="h-3" />
                    
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-sm text-muted-foreground">Current</p>
                        <p className="text-xl font-bold">{formatCurrency(goal.current)}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Remaining</p>
                        <p className="text-lg font-medium">{formatCurrency(goal.target - goal.current)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Target</p>
                        <p className="text-xl font-bold">{formatCurrency(goal.target)}</p>
                      </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      {goal.name.includes("2028") ? (
                        <p>Based on your current savings rate, you'll reach this goal in October 2028.</p>
                      ) : goal.name.includes("Emergency") ? (
                        <p>You're on track to complete your emergency fund in 4 months.</p>
                      ) : (
                        <p>At your current pace, you'll reach this goal in 2 months.</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4">
                <ChatInput 
                  placeholder="Ask about your goals..."
                  onSend={handleChatSend}
                  className="w-full"
                />
              </div>
            </DialogContent>
          </Dialog>

          {/* Spending Analysis Card */}
          <Dialog>
            <DialogTrigger asChild>
              <Card className="cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardHeader>
                  <CardTitle>Spending Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {spendingData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`mr-3 h-3 w-3 rounded-full ${
                            item.trend === "high" ? "bg-destructive" : 
                            item.trend === "low" ? "bg-green-500" : 
                            "bg-muted"
                          }`}></div>
                          <span className="font-medium">{item.category}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="mr-2">{formatCurrency(item.amount)}</span>
                          {item.trend === "high" && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-destructive">
                              <path d="m5 12 7-7 7 7"/>
                              <path d="M12 19V5"/>
                            </svg>
                          )}
                          {item.trend === "low" && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                              <path d="M12 5v14"/>
                              <path d="m19 12-7 7-7-7"/>
                            </svg>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 rounded-lg bg-secondary/50 p-3">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 mt-1 text-amber-500">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" x2="12" y1="8" y2="12"/>
                        <line x1="12" x2="12.01" y1="16" y2="16"/>
                      </svg>
                      <div>
                        <p className="text-sm font-medium">Unusual spending detected</p>
                        <p className="text-xs text-muted-foreground">Entertainment spending is 40% higher than your monthly average.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Spending Analysis</DialogTitle>
                <DialogDescription>
                  Detailed breakdown of your spending patterns this month.
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4 space-y-6">
                <div className="rounded-lg bg-secondary/50 p-4">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-3 text-amber-500">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" x2="12" y1="8" y2="12"/>
                      <line x1="12" x2="12.01" y1="16" y2="16"/>
                    </svg>
                    <div>
                      <p className="text-base font-medium">Unusual spending detected</p>
                      <p className="text-sm text-muted-foreground">
                        Your entertainment spending is 40% higher than your 3-month average. 
                        You've spent $250 this month compared to your usual $180.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="mb-3 text-lg font-medium">Monthly Spending by Category</h3>
                  <div className="space-y-4">
                    {spendingData.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className={`mr-3 h-3 w-3 rounded-full ${
                              item.trend === "high" ? "bg-destructive" : 
                              item.trend === "low" ? "bg-green-500" : 
                              "bg-muted"
                            }`}></div>
                            <span className="font-medium">{item.category}</span>
                          </div>
                          <div className="flex items-center">
                            <span className="mr-2">{formatCurrency(item.amount)}</span>
                            {item.trend === "high" && (
                              <span className="text-sm text-destructive">+40% vs avg</span>
                            )}
                            {item.trend === "low" && (
                              <span className="text-sm text-green-500">-15% vs avg</span>
                            )}
                          </div>
                        </div>
                        
                        <div className="h-2 overflow-hidden rounded-full bg-secondary">
                          <div
                            className={`h-full ${
                              item.trend === "high" ? "bg-destructive" : 
                              item.trend === "low" ? "bg-green-500" : 
                              "gradient-primary"
                            }`}
                            style={{ width: `${(item.amount / 650) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="mb-3 text-lg font-medium">Recommendations</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 mt-1 text-primary">
                        <polyline points="9 11 12 14 22 4"/>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                      </svg>
                      <span>Consider setting a monthly entertainment budget of $200 to help reduce spending.</span>
                    </li>
                    <li className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 mt-1 text-primary">
                        <polyline points="9 11 12 14 22 4"/>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
                      </svg>
                      <span>Excellent job keeping transportation costs low. Your use of public transit is paying off.</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <ChatInput 
                  placeholder="Ask about your spending..."
                  onSend={handleChatSend}
                  className="w-full"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Quick Actions Section */}
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-semibold">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" className="gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" x2="12" y1="8" y2="16"/>
                <line x1="8" x2="16" y1="12" y2="12"/>
              </svg>
              Add Account
            </Button>
            <Button variant="outline" className="gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"/>
                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"/>
                <path d="M18 12H9"/>
                <path d="m15 9-3 3 3 3"/>
              </svg>
              Transfer Money
            </Button>
            <Button variant="outline" className="gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 8V4H8"/>
                <rect width="16" height="12" x="4" y="8" rx="2"/>
                <path d="M2 8h20"/>
                <path d="M2 14h20"/>
              </svg>
              View Transactions
            </Button>
            <Button variant="outline" className="gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              Budget Planner
            </Button>
          </div>
        </div>
        
        {/* Floating Chat Button */}
        <Link to="/chat">
          <Button 
            variant="gradient"
            size="icon"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>
              <path d="M15 16h.01"/>
              <path d="M11 12h.01"/>
              <path d="M7 8h.01"/>
            </svg>
          </Button>
        </Link>
      </main>
    </div>
  );
};

export default Dashboard;