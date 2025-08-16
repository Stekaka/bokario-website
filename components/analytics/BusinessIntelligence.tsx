"use client";

import { useEffect, useState, useCallback } from 'react';

interface ConversionEvent {
  type: 'calculator_use' | 'demo_booking' | 'contact_form' | 'pricing_view' | 'cta_click';
  timestamp: number;
  data: any;
  value?: number;
  source: string;
}

interface ROIMetrics {
  totalConversions: number;
  conversionRate: number;
  averageValue: number;
  totalValue: number;
  topPerformingPages: string[];
  conversionFunnel: {
    visitors: number;
    engaged: number;
    interested: number;
    converted: number;
  };
}

interface BusinessIntelligenceProps {
  children: React.ReactNode;
  enableROITracking?: boolean;
  enableLeadScoring?: boolean;
}

export function BusinessIntelligence({ 
  children, 
  enableROITracking = true,
  enableLeadScoring = true
}: BusinessIntelligenceProps) {
  const [conversions, setConversions] = useState<ConversionEvent[]>([]);
  const [roiMetrics, setRoiMetrics] = useState<ROIMetrics>({
    totalConversions: 0,
    conversionRate: 0,
    averageValue: 0,
    totalValue: 0,
    topPerformingPages: [],
    conversionFunnel: {
      visitors: 0,
      engaged: 0,
      interested: 0,
      converted: 0
    }
  });

  // Track calculator usage
  const trackCalculatorUse = useCallback((calculatorType: string, inputs: any, result: any) => {
    const event: ConversionEvent = {
      type: 'calculator_use',
      timestamp: Date.now(),
      data: {
        calculatorType,
        inputs,
        result,
        page: window.location.pathname
      },
      value: calculateCalculatorValue(result),
      source: window.location.pathname
    };

    setConversions(prev => [...prev, event]);
    updateROIMetrics(event);
    
    // Console log in development
    if (process.env.NODE_ENV === 'development') {
      console.log('💰 Calculator Use:', event);
    }
  }, []);

  // Track demo bookings
  const trackDemoBooking = useCallback((formData: any, source: string) => {
    const event: ConversionEvent = {
      type: 'demo_booking',
      timestamp: Date.now(),
      data: {
        formData,
        source,
        page: window.location.pathname
      },
      value: 1000, // Estimated value of demo booking
      source
    };

    setConversions(prev => [...prev, event]);
    updateROIMetrics(event);
    
    if (process.env.NODE_ENV === 'development') {
      console.log('🎯 Demo Booking:', event);
    }
  }, []);

  // Track contact form submissions
  const trackContactForm = useCallback((formData: any, source: string) => {
    const event: ConversionEvent = {
      type: 'contact_form',
      timestamp: Date.now(),
      data: {
        formData,
        source,
        page: window.location.pathname
      },
      value: 500, // Estimated value of contact
      source
    };

    setConversions(prev => [...prev, event]);
    updateROIMetrics(event);
    
    if (process.env.NODE_ENV === 'development') {
      console.log('📞 Contact Form:', event);
    }
  }, []);

  // Track pricing page views
  const trackPricingView = useCallback((pricingTier: string, timeOnPage: number) => {
    const event: ConversionEvent = {
      type: 'pricing_view',
      timestamp: Date.now(),
      data: {
        pricingTier,
        timeOnPage,
        page: window.location.pathname
      },
      value: 100, // Engagement value
      source: window.location.pathname
    };

    setConversions(prev => [...prev, event]);
    updateROIMetrics(event);
    
    if (process.env.NODE_ENV === 'development') {
      console.log('💳 Pricing View:', event);
    }
  }, []);

  // Track CTA clicks
  const trackCTAClick = useCallback((ctaId: string, ctaText: string, position: any) => {
    const event: ConversionEvent = {
      type: 'cta_click',
      timestamp: Date.now(),
      data: {
        ctaId,
        ctaText,
        position,
        page: window.location.pathname
      },
      value: 50, // Click value
      source: window.location.pathname
    };

    setConversions(prev => [...prev, event]);
    updateROIMetrics(event);
    
    if (process.env.NODE_ENV === 'development') {
      console.log('🔗 CTA Click:', event);
    }
  }, []);

  // Calculate value from calculator results
  const calculateCalculatorValue = (result: any): number => {
    if (!result) return 0;
    
    // Extract monetary values from calculator results
    const valueKeys = ['revenue', 'profit', 'savings', 'increase', 'value'];
    for (const key of valueKeys) {
      if (result[key] && typeof result[key] === 'number') {
        return result[key];
      }
    }
    
    return 0;
  };

  // Update ROI metrics based on new conversion
  const updateROIMetrics = useCallback((event: ConversionEvent) => {
    setRoiMetrics(prev => {
      const newTotalConversions = prev.totalConversions + 1;
      const newTotalValue = prev.totalValue + (event.value || 0);
      const newAverageValue = newTotalValue / newTotalConversions;

      // Update conversion funnel
      const newFunnel = { ...prev.conversionFunnel };
      if (event.type === 'demo_booking' || event.type === 'contact_form') {
        newFunnel.converted++;
      } else if (event.type === 'calculator_use' || event.type === 'pricing_view') {
        newFunnel.interested++;
      } else if (event.type === 'cta_click') {
        newFunnel.engaged++;
      }

      // Update top performing pages
      const pageCounts = new Map<string, number>();
      [...conversions, event].forEach(conv => {
        const page = conv.source;
        pageCounts.set(page, (pageCounts.get(page) || 0) + 1);
      });

      const topPages = Array.from(pageCounts.entries())
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([page]) => page);

      return {
        totalConversions: newTotalConversions,
        conversionRate: (newTotalConversions / (newFunnel.visitors || 1)) * 100,
        averageValue: newAverageValue,
        totalValue: newTotalValue,
        topPerformingPages: topPages,
        conversionFunnel: newFunnel
      };
    });
  }, [conversions]);

  // Lead scoring based on user behavior
  const calculateLeadScore = useCallback((userId: string): number => {
    const userConversions = conversions.filter(c => c.data?.userId === userId);
    let score = 0;

    // Base score for different conversion types
    userConversions.forEach(conv => {
      switch (conv.type) {
        case 'demo_booking':
          score += 100;
          break;
        case 'contact_form':
          score += 75;
          break;
        case 'calculator_use':
          score += 25;
          break;
        case 'pricing_view':
          score += 15;
          break;
        case 'cta_click':
          score += 10;
          break;
      }
    });

    // Bonus for multiple interactions
    if (userConversions.length > 3) score += 50;
    if (userConversions.length > 5) score += 100;

    // Bonus for high-value interactions
    const totalValue = userConversions.reduce((sum, conv) => sum + (conv.value || 0), 0);
    if (totalValue > 1000) score += 75;
    if (totalValue > 5000) score += 150;

    return Math.min(score, 1000); // Cap at 1000
  }, [conversions]);

  // Expose tracking functions globally
  useEffect(() => {
    (window as any).trackCalculatorUse = trackCalculatorUse;
    (window as any).trackDemoBooking = trackDemoBooking;
    (window as any).trackContactForm = trackContactForm;
    (window as any).trackPricingView = trackPricingView;
    (window as any).trackCTAClick = trackCTAClick;
    (window as any).getBusinessMetrics = () => ({
      conversions,
      roiMetrics,
      leadScore: calculateLeadScore('current-user')
    });
    
    // Expose ROI metrics for dashboard
    (window as any).getROIMetrics = () => roiMetrics;
    (window as any).getConversions = () => conversions;

    return () => {
      delete (window as any).trackCalculatorUse;
      delete (window as any).trackDemoBooking;
      delete (window as any).trackContactForm;
      delete (window as any).trackPricingView;
      delete (window as any).trackCTAClick;
      delete (window as any).getBusinessMetrics;
      delete (window as any).getROIMetrics;
      delete (window as any).getConversions;
    };
  }, [trackCalculatorUse, trackDemoBooking, trackContactForm, trackPricingView, trackCTAClick, conversions, roiMetrics, calculateLeadScore]);

  // Track initial page view for funnel
  useEffect(() => {
    setRoiMetrics(prev => ({
      ...prev,
      conversionFunnel: {
        ...prev.conversionFunnel,
        visitors: prev.conversionFunnel.visitors + 1
      }
    }));
  }, []);

  return (
    <div className="business-intelligence">
      {/* Business metrics indicator hidden - only shown on /analytics dashboard */}
      
      {children}
    </div>
  );
}

// ROI Calculator tracking wrapper
interface ROICalculatorProps {
  children: React.ReactNode;
  calculatorType: string;
  onCalculate?: (result: any) => void;
}

export function ROICalculator({ children, calculatorType, onCalculate }: ROICalculatorProps) {
  const handleCalculate = (result: any) => {
    // Track calculator usage
    if ((window as any).trackCalculatorUse) {
      (window as any).trackCalculatorUse(calculatorType, {}, result);
    }
    
    // Call original onCalculate if provided
    if (onCalculate) {
      onCalculate(result);
    }
  };

  return (
    <div className="roi-calculator" data-calculator-type={calculatorType}>
      {children}
    </div>
  );
}

// Lead scoring component
interface LeadScoreProps {
  userId: string;
  className?: string;
}

export function LeadScore({ userId, className = '' }: LeadScoreProps) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const updateScore = () => {
      if ((window as any).getBusinessMetrics) {
        const metrics = (window as any).getBusinessMetrics();
        // This would need to be implemented based on actual user ID
        setScore(metrics.leadScore || 0);
      }
    };

    updateScore();
    const interval = setInterval(updateScore, 5000);
    return () => clearInterval(interval);
  }, [userId]);

  const getScoreColor = (score: number) => {
    if (score >= 800) return 'text-green-500';
    if (score >= 600) return 'text-yellow-500';
    if (score >= 400) return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 800) return 'Hot Lead';
    if (score >= 600) return 'Warm Lead';
    if (score >= 400) return 'Cool Lead';
    return 'Cold Lead';
  };

  return (
    <div className={`lead-score ${className}`}>
      <div className="text-center">
        <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
          {score}
        </div>
        <div className="text-sm text-ink-dim">
          {getScoreLabel(score)}
        </div>
      </div>
    </div>
  );
}
