"use client";

import { useEffect, useRef, useState, useCallback } from 'react';

interface UserEvent {
  type: string;
  timestamp: number;
  data: any;
  sessionId: string;
  userId?: string;
}

interface UserSession {
  id: string;
  startTime: number;
  lastActivity: number;
  pageViews: number;
  interactions: number;
  referrer: string;
  userAgent: string;
  deviceType: 'mobile' | 'desktop' | 'tablet';
}

interface UserAnalyticsProps {
  children: React.ReactNode;
  trackingId?: string;
  enableHeatmap?: boolean;
  enableSessionRecording?: boolean;
}

export function UserAnalytics({ 
  children, 
  trackingId = 'bokario-analytics',
  enableHeatmap = false,
  enableSessionRecording = false
}: UserAnalyticsProps) {
  const [session, setSession] = useState<UserSession | null>(null);
  const [events, setEvents] = useState<UserEvent[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const sessionRef = useRef<UserSession | null>(null);
  const eventsRef = useRef<UserEvent[]>([]);
  const heatmapDataRef = useRef<{ x: number; y: number; type: string; timestamp: number }[]>([]);

  // Initialize session
  useEffect(() => {
    const sessionId = generateSessionId();
    const deviceType = getDeviceType();
    
    const newSession: UserSession = {
      id: sessionId,
      startTime: Date.now(),
      lastActivity: Date.now(),
      pageViews: 1,
      interactions: 0,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      deviceType
    };

    setSession(newSession);
    sessionRef.current = newSession;
    
    // Track page view
    trackEvent('page_view', {
      url: window.location.href,
      title: document.title,
      referrer: document.referrer
    });

    // Set up session heartbeat
    const heartbeat = setInterval(() => {
      if (sessionRef.current) {
        sessionRef.current.lastActivity = Date.now();
        setSession(prev => prev ? { ...prev, lastActivity: Date.now() } : null);
      }
    }, 30000); // 30 seconds

    return () => clearInterval(heartbeat);
  }, []);

  // Generate unique session ID
  const generateSessionId = () => {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  };

  // Detect device type
  const getDeviceType = (): 'mobile' | 'desktop' | 'tablet' => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/mobile|android|iphone|ipad|phone/i.test(userAgent)) {
      return 'mobile';
    } else if (/tablet|ipad/i.test(userAgent)) {
      return 'tablet';
    }
    return 'desktop';
  };

  // Track user events
  const trackEvent = useCallback((type: string, data: any = {}) => {
    const event: UserEvent = {
      type,
      timestamp: Date.now(),
      data,
      sessionId: sessionRef.current?.id || 'unknown',
      userId: getUserId()
    };

    setEvents(prev => [...prev, event]);
    eventsRef.current = [...eventsRef.current, event];

    // Update session interactions
    if (sessionRef.current) {
      sessionRef.current.interactions++;
      setSession(prev => prev ? { ...prev, interactions: prev.interactions + 1 } : null);
    }

    // Send to analytics endpoint (in production)
    if (process.env.NODE_ENV === 'production') {
      sendAnalyticsEvent(event);
    }

    // Console log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', event);
    }
  }, []);

  // Get user ID from localStorage or generate new one
  const getUserId = () => {
    let userId = localStorage.getItem('bokario_user_id');
    if (!userId) {
      userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('bokario_user_id', userId);
    }
    return userId;
  };

  // Send analytics event to backend
  const sendAnalyticsEvent = async (event: UserEvent) => {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      });
    } catch (error) {
      console.error('Failed to send analytics event:', error);
    }
  };

  // Track page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        trackEvent('page_hide', { timestamp: Date.now() });
      } else {
        trackEvent('page_show', { timestamp: Date.now() });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [trackEvent]);

  // Track scroll depth
  useEffect(() => {
    let maxScrollDepth = 0;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
        
        // Track significant scroll milestones
        if (scrollPercent % 25 === 0) {
          trackEvent('scroll_depth', { depth: scrollPercent });
        }
      }

      // Debounce scroll tracking
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        trackEvent('scroll_position', { 
          position: scrollPercent,
          maxDepth: maxScrollDepth
        });
      }, 1000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [trackEvent]);

  // Track mouse movements for heatmap (if enabled)
  useEffect(() => {
    if (!enableHeatmap) return;

    let mouseTimeout: NodeJS.Timeout;
    let mousePositions: { x: number; y: number; timestamp: number }[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      const position = {
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      };

      mousePositions.push(position);

      // Batch send mouse positions every 5 seconds
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        if (mousePositions.length > 0) {
          trackEvent('mouse_movement', {
            positions: mousePositions,
            count: mousePositions.length
          });
          mousePositions = [];
        }
      }, 5000);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(mouseTimeout);
    };
  }, [enableHeatmap, trackEvent]);

  // Track clicks
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const tagName = target.tagName.toLowerCase();
      const className = target.className;
      const id = target.id;
      const text = target.textContent?.substring(0, 100);

      trackEvent('click', {
        tagName,
        className,
        id,
        text,
        x: e.clientX,
        y: e.clientY,
        timestamp: Date.now()
      });

      // Track CTA clicks specifically
      if (target.closest('[data-cta]')) {
        const ctaElement = target.closest('[data-cta]') as HTMLElement;
        trackEvent('cta_click', {
          cta: ctaElement.dataset.cta,
          text: ctaElement.textContent?.substring(0, 100),
          position: ctaElement.getBoundingClientRect()
        });
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [trackEvent]);

  // Track form interactions
  useEffect(() => {
    const handleFormSubmit = (e: Event) => {
      const form = e.target as HTMLFormElement;
      trackEvent('form_submit', {
        formId: form.id,
        formAction: form.action,
        formMethod: form.method,
        fieldCount: form.elements ? form.elements.length : 0
      });
    };

    const handleInputFocus = (e: Event) => {
      const input = e.target as HTMLInputElement;
      trackEvent('input_focus', {
        inputType: input.type,
        inputName: input.name,
        inputId: input.id
      });
    };

    const handleInputBlur = (e: Event) => {
      const input = e.target as HTMLInputElement;
      trackEvent('input_blur', {
        inputType: input.type,
        inputName: input.name,
        inputId: input.id,
        hasValue: input.value && input.value.length > 0
      });
    };

    document.addEventListener('submit', handleFormSubmit);
    document.addEventListener('focusin', handleInputFocus);
    document.addEventListener('focusout', handleInputBlur);

    return () => {
      document.removeEventListener('submit', handleFormSubmit);
      document.removeEventListener('focusin', handleInputFocus);
      document.removeEventListener('focusout', handleInputBlur);
    };
  }, [trackEvent]);

  // Track time on page
  useEffect(() => {
    const startTime = Date.now();
    
    const handleBeforeUnload = () => {
      const timeOnPage = Date.now() - startTime;
      trackEvent('page_exit', {
        timeOnPage,
        timeOnPageSeconds: Math.round(timeOnPage / 1000)
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [trackEvent]);

  // Session recording (if enabled)
  useEffect(() => {
    if (!enableSessionRecording) return;

    const startRecording = () => {
      setIsRecording(true);
      trackEvent('session_recording_start', {
        sessionId: sessionRef.current?.id,
        timestamp: Date.now()
      });
    };

    // Start recording after 5 seconds of inactivity
    const recordingTimer = setTimeout(startRecording, 5000);

    return () => clearTimeout(recordingTimer);
  }, [enableSessionRecording, trackEvent]);

  // Expose tracking function globally for manual tracking
  useEffect(() => {
    (window as any).trackEvent = trackEvent;
    (window as any).getAnalyticsData = () => ({
      session: sessionRef.current,
      events: eventsRef.current,
      heatmapData: heatmapDataRef.current
    });
    
    // Expose session data for dashboard
    (window as any).getCurrentSession = () => sessionRef.current;
    (window as any).getCurrentEvents = () => eventsRef.current;

    return () => {
      delete (window as any).trackEvent;
      delete (window as any).getAnalyticsData;
      delete (window as any).getCurrentSession;
      delete (window as any).getCurrentEvents;
    };
  }, [trackEvent]);

  return (
    <div className="user-analytics">
      {/* Analytics indicator hidden - only shown on /analytics dashboard */}
      
      {children}
    </div>
  );
}
