import * as React from "react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navbar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <header className={cn("sticky top-0 z-50 w-full glass-effect border-b", className)}>
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-gradient font-bold text-2xl">MyFinance Twin AI</span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center justify-between">
          <div className="flex items-center space-x-6">
            <Link to="/features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </Link>
            <Link to="/security" className="text-sm font-medium transition-colors hover:text-primary">
              Security
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="gradient" size="default">Sign In</Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}