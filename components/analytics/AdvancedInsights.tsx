"use client";

import { useEffect, useRef, useState, useCallback } from 'react';

interface HeatmapData {
  x: number;
  y: number;
  type: 'click' | 'hover' | 'scroll';
  intensity: number;
  timestamp: number;
  element?: string;
}

interface FunnelStep {
  name: string;
  count: number;
  conversionRate: number;
  dropoffRate: number;
  value: number;
}

interface CohortData {
  date: string;
  users: number;
  retention: number[];
  engagement: number;
}

interface AdvancedInsightsProps {
  children: React.ReactNode;
  enableHeatmap?: boolean;
  enableFunnelAnalysis?: boolean;
  enableCohortAnalysis?: boolean;
  enablePredictiveAnalytics?: boolean;
}

export function AdvancedInsights({ 
  children, 
  enableHeatmap = true,
  enableFunnelAnalysis = true,
  enableCohortAnalysis = true,
  enablePredictiveAnalytics = true
}: AdvancedInsightsProps) {
  const [heatmapData, setHeatmapData] = useState<HeatmapData[]>([]);
  const [funnelData, setFunnelData] = useState<FunnelStep[]>([]);
  const [cohortData, setCohortData] = useState<CohortData[]>([]);
  const [predictions, setPredictions] = useState<any>({});
  const [isRecording, setIsRecording] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heatmapRef = useRef<HTMLDivElement>(null);

  // Heatmap functionality
  useEffect(() => {
    if (!enableHeatmap || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Draw heatmap
    const drawHeatmap = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      heatmapData.forEach(point => {
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 50);
        const alpha = Math.min(point.intensity / 100, 0.8);
        
        gradient.addColorStop(0, `rgba(59, 130, 246, ${alpha})`);
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 50, 0, 2 * Math.PI);
        ctx.fill();
      });
    };

    // Update heatmap when data changes
    if (heatmapData && heatmapData.length > 0) {
      drawHeatmap();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [enableHeatmap, heatmapData]);

  // Collect heatmap data
  useEffect(() => {
    if (!enableHeatmap) return;

    let clickData: HeatmapData[] = [];
    let hoverData: HeatmapData[] = [];
    let scrollData: HeatmapData[] = [];

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const rect = target.getBoundingClientRect();
      
      const data: HeatmapData = {
        x: e.clientX,
        y: e.clientY,
        type: 'click',
        intensity: 100,
        timestamp: Date.now(),
        element: target.tagName.toLowerCase()
      };

      clickData.push(data);
      setHeatmapData(prev => [...prev, data]);

      // Batch update every 10 clicks
      if (clickData && clickData.length >= 10) {
        clickData = [];
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Throttle mouse move events
      if (e.clientX % 10 === 0 && e.clientY % 10 === 0) {
        const data: HeatmapData = {
          x: e.clientX,
          y: e.clientY,
          type: 'hover',
          intensity: 20,
          timestamp: Date.now()
        };

        hoverData.push(data);
        
        // Only keep recent hover data
        if (hoverData && hoverData.length > 100) {
          hoverData = hoverData.slice(-100);
        }
      }
    };

    const handleScroll = () => {
      const scrollPercent = Math.round((window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
      
      if (scrollPercent % 25 === 0) {
        const data: HeatmapData = {
          x: window.innerWidth / 2,
          y: window.innerHeight / 2,
          type: 'scroll',
          intensity: 30,
          timestamp: Date.now()
        };

        scrollData.push(data);
        setHeatmapData(prev => [...prev, data]);
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [enableHeatmap]);

  // Funnel analysis
  useEffect(() => {
    if (!enableFunnelAnalysis) return;

    // Initialize funnel steps
    const initialFunnel: FunnelStep[] = [
      { name: 'Page View', count: 0, conversionRate: 100, dropoffRate: 0, value: 0 },
      { name: 'Engagement', count: 0, conversionRate: 0, dropoffRate: 0, value: 0 },
      { name: 'Interest', count: 0, conversionRate: 0, dropoffRate: 0, value: 0 },
      { name: 'Consideration', count: 0, conversionRate: 0, dropoffRate: 0, value: 0 },
      { name: 'Conversion', count: 0, conversionRate: 0, dropoffRate: 0, value: 0 }
    ];

    setFunnelData(initialFunnel);

    // Update funnel based on user events
    const updateFunnel = (eventType: string, value: number = 0) => {
      setFunnelData(prev => {
        const newFunnel = [...prev];
        
        switch (eventType) {
          case 'page_view':
            newFunnel[0].count++;
            break;
          case 'cta_click':
          case 'scroll_depth':
            newFunnel[1].count++;
            newFunnel[1].value += value;
            break;
          case 'calculator_use':
          case 'pricing_view':
            newFunnel[2].count++;
            newFunnel[2].value += value;
            break;
          case 'contact_form':
            newFunnel[3].count++;
            newFunnel[3].value += value;
            break;
          case 'demo_booking':
            newFunnel[4].count++;
            newFunnel[4].value += value;
            break;
        }

        // Calculate conversion rates and dropoff
        for (let i = 1; i < newFunnel.length; i++) {
          if (newFunnel[i - 1].count > 0) {
            newFunnel[i].conversionRate = (newFunnel[i].count / newFunnel[i - 1].count) * 100;
            newFunnel[i].dropoffRate = 100 - newFunnel[i].conversionRate;
          }
        }

        return newFunnel;
      });
    };

    // Listen for global analytics events
    const handleAnalyticsEvent = (event: CustomEvent) => {
      updateFunnel(event.detail.type, event.detail.value || 0);
    };

    document.addEventListener('analytics-event', handleAnalyticsEvent as EventListener);
    
    // Initial page view
    updateFunnel('page_view');

    return () => {
      document.removeEventListener('analytics-event', handleAnalyticsEvent as EventListener);
    };
  }, [enableFunnelAnalysis]);

  // Cohort analysis
  useEffect(() => {
    if (!enableCohortAnalysis) return;

    // Generate sample cohort data (in real app, this would come from backend)
    const generateCohortData = () => {
      const today = new Date();
      const cohorts: CohortData[] = [];
      
      for (let i = 0; i < 8; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - (i * 7)); // Weekly cohorts
        
        const users = Math.floor(Math.random() * 100) + 20;
        const retention = Array.from({ length: 8 }, () => Math.random() * 100);
        const engagement = Math.random() * 100;
        
        cohorts.push({
          date: date.toISOString().split('T')[0],
          users,
          retention,
          engagement
        });
      }
      
      setCohortData(cohorts);
    };

    generateCohortData();
    const interval = setInterval(generateCohortData, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, [enableCohortAnalysis]);

  // Predictive analytics
  useEffect(() => {
    if (!enablePredictiveAnalytics) return;

    const generatePredictions = () => {
      // Simple predictive models (in real app, this would use ML)
      const currentTrends = {
        conversionRate: funnelData[4]?.conversionRate || 0,
        averageValue: funnelData[4]?.value || 0,
        userEngagement: cohortData[0]?.engagement || 0
      };

      const predictions = {
        nextWeekConversions: Math.round(currentTrends.conversionRate * 1.1),
        nextWeekRevenue: Math.round(currentTrends.averageValue * 1.15),
        churnRisk: currentTrends.userEngagement < 50 ? 'High' : 'Low',
        growthOpportunity: currentTrends.conversionRate < 5 ? 'High' : 'Medium',
        recommendedActions: []
      };

      // Generate recommendations
      if (predictions.churnRisk === 'High') {
        predictions.recommendedActions.push('Improve user engagement', 'Optimize onboarding flow');
      }
      if (predictions.growthOpportunity === 'High') {
        predictions.recommendedActions.push('A/B test CTAs', 'Optimize conversion funnel');
      }

      setPredictions(predictions);
    };

    generatePredictions();
    const interval = setInterval(generatePredictions, 600000); // Update every 10 minutes

    return () => clearInterval(interval);
  }, [enablePredictiveAnalytics, funnelData, cohortData]);

  // Toggle heatmap recording
  const toggleHeatmap = useCallback(() => {
    setIsRecording(!isRecording);
  }, [isRecording]);

  // Export analytics data
  const exportData = useCallback(() => {
    const data = {
      heatmap: heatmapData,
      funnel: funnelData,
      cohort: cohortData,
      predictions,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bokario-analytics-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [heatmapData, funnelData, cohortData, predictions]);

  // Expose analytics data for dashboard
  useEffect(() => {
    (window as any).getAdvancedInsights = () => ({
      heatmapData,
      funnelData,
      cohortData,
      predictions,
      isRecording
    });
    
    // Expose individual data for dashboard
    (window as any).getHeatmapData = () => heatmapData;
    (window as any).getFunnelData = () => funnelData;
    (window as any).getCohortData = () => cohortData;
    (window as any).getPredictions = () => predictions;

    return () => {
      delete (window as any).getAdvancedInsights;
      delete (window as any).getHeatmapData;
      delete (window as any).getFunnelData;
      delete (window as any).getCohortData;
      delete (window as any).getPredictions;
    };
  }, [heatmapData, funnelData, cohortData, predictions, isRecording]);

  return (
    <div className="advanced-insights">
      {/* Heatmap canvas overlay */}
      {enableHeatmap && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-30 opacity-50"
          style={{ display: isRecording ? 'block' : 'none' }}
        />
      )}

      {/* Analytics dashboard hidden - only shown on /analytics page */}
      
      {children}
    </div>
  );
}

// Heatmap toggle component
interface HeatmapToggleProps {
  isActive: boolean;
  onToggle: () => void;
  className?: string;
}

export function HeatmapToggle({ isActive, onToggle, className = '' }: HeatmapToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`px-4 py-2 rounded-lg font-medium transition-all ${
        isActive
          ? 'bg-red-500 text-white shadow-lg shadow-red-500/25'
          : 'bg-blue-500 text-white hover:bg-blue-600'
      } ${className}`}
    >
      {isActive ? '🛑 Stop Heatmap' : '🔥 Start Heatmap'}
    </button>
  );
}

// Funnel visualization component
interface FunnelVisualizationProps {
  data: FunnelStep[];
  className?: string;
}

export function FunnelVisualization({ data, className = '' }: FunnelVisualizationProps) {
  return (
    <div className={`funnel-visualization ${className}`}>
      <h3 className="text-lg font-semibold text-ink mb-4">Conversion Funnel</h3>
      <div className="space-y-3">
        {data.map((step, index) => (
          <div key={index} className="relative">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-ink">{step.name}</span>
              <span className="text-sm text-ink-dim">
                {step.count} users ({step.conversionRate.toFixed(1)}%)
              </span>
            </div>
            <div className="w-full bg-surface/20 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-teal-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${step.conversionRate}%` }}
              />
            </div>
            {index < data.length - 1 && (
              <div className="text-center text-xs text-ink-dim mt-2">
                ↓ {step.dropoffRate.toFixed(1)}% dropoff
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
