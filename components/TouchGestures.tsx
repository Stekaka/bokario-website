"use client";

import { useState, useEffect, useRef } from 'react';

interface TouchGesturesProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onPinchStart?: () => void;
  onPinchEnd?: () => void;
  className?: string;
}

export function TouchGestures({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  onPinchStart,
  onPinchEnd,
  className = ''
}: TouchGesturesProps) {
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [isPinching, setIsPinching] = useState(false);
  const [initialDistance, setInitialDistance] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Two finger touch - pinch gesture
      setIsPinching(true);
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setInitialDistance(distance);
      onPinchStart?.();
    } else if (e.touches.length === 1) {
      // Single finger touch - swipe gesture
      setTouchEnd(null);
      setTouchStart({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      });
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && isPinching) {
      // Handle pinch gesture
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      
      // You can add zoom logic here if needed
      // const scale = distance / initialDistance;
    }
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (isPinching) {
      // End pinch gesture
      setIsPinching(false);
      onPinchEnd?.();
      return;
    }

    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

    if (isHorizontalSwipe) {
      // Horizontal swipe
      if (Math.abs(distanceX) > minSwipeDistance) {
        if (distanceX > 0) {
          onSwipeLeft?.();
        } else {
          onSwipeRight?.();
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(distanceY) > minSwipeDistance) {
        if (distanceY > 0) {
          onSwipeUp?.();
        } else {
          onSwipeDown?.();
        }
      }
    }

    // Reset touch states
    setTouchStart(null);
    setTouchEnd(null);
  };

  const onTouchMoveSingle = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && touchStart) {
      setTouchEnd({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      });
    }
  };

  // Add pull-to-refresh functionality
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);

  useEffect(() => {
    let startY = 0;
    let currentY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startY = e.touches[0].clientY;
        setIsPulling(true);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isPulling && window.scrollY === 0) {
        currentY = e.touches[0].clientY;
        const distance = Math.max(0, currentY - startY);
        setPullDistance(distance * 0.5); // Reduce pull resistance
      }
    };

    const handleTouchEnd = () => {
      if (isPulling) {
        if (pullDistance > 100) {
          // Trigger refresh
          window.location.reload();
        }
        setPullDistance(0);
        setIsPulling(false);
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isPulling, pullDistance]);

  return (
    <div
      ref={containerRef}
      className={`touch-manipulation ${className}`}
      onTouchStart={onTouchStart}
      onTouchMove={(e) => {
        onTouchMove(e);
        onTouchMoveSingle(e);
      }}
      onTouchEnd={onTouchEnd}
      style={{
        transform: isPulling ? `translateY(${pullDistance}px)` : 'translateY(0)',
        transition: isPulling ? 'none' : 'transform 0.3s ease-out',
      }}
    >
      {/* Pull-to-refresh indicator */}
      {isPulling && pullDistance > 0 && (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center h-16 bg-gradient-to-b from-blue/20 to-transparent">
          <div className="flex items-center gap-2 text-blue">
            <div className="w-5 h-5 border-2 border-blue border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">
              {pullDistance > 100 ? 'Släpp för att uppdatera' : 'Dra för att uppdatera'}
            </span>
          </div>
        </div>
      )}
      
      {children}
    </div>
  );
}
