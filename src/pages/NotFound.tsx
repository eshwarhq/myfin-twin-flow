import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-7xl font-bold mb-4 text-gradient">404</h1>
        <p className="text-xl text-muted-foreground mb-4">Oops! Page not found</p>
        <p className="text-muted-foreground mb-6">We couldn't find the page you were looking for.</p>
        <a href="/" className="inline-flex h-10 px-4 py-2 rounded-xl gradient-primary text-white hover:shadow-lg transition-shadow duration-300">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
