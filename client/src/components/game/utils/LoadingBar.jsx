import { useEffect, useState } from "react";

// Need to separate component to isolate re-renders
const LoadingBar = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  useEffect(() => {
    setLoadingProgress(10);     // Start with some progress immediately
    
    const interval = setInterval(() => {
      setLoadingProgress(prev => {

        // Slower, more performance-friendly increments to stop games from lagging
        const increment = Math.random() * 5;

        // Gradually slow down as we approach completion
        const nextValue = Math.min(prev + increment, 95);
        return nextValue;
      });
    }, 300); // Reduced frequency for better performance
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="w-64 h-8 bg-white rounded-full border-2 border-blue-300 overflow-hidden flex items-center p-1">
        <div 
          className="h-full bg-blue-400 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${loadingProgress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingBar