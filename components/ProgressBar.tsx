import React, { useState, useEffect } from 'react';

interface ProgressBarProps {
  progress: number; // 0-100
  className?: string;
  showPercentage?: boolean;
  animated?: boolean;
}

export function ProgressBar({ 
  progress, 
  className = '', 
  showPercentage = false,
  animated = true 
}: ProgressBarProps) {
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setDisplayProgress(progress);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setDisplayProgress(progress);
    }
  }, [progress, animated]);

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full bg-surface/20 rounded-full h-2 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-blue to-teal rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${displayProgress}%` }}
        />
      </div>
      {showPercentage && (
        <div className="text-right mt-2 text-sm text-ink-dim">
          {Math.round(displayProgress)}%
        </div>
      )}
    </div>
  );
}

interface ScrollProgressBarProps {
  className?: string;
}

export function ScrollProgressBar({ className = '' }: ScrollProgressBarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-full h-1 z-50 ${className}`}>
      <div 
        className="h-full bg-gradient-to-r from-blue to-teal transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
