"use client";

import { useState, useEffect } from 'react';
import { Hero } from '@/components/Hero';
import { UserAnalytics } from '@/components/analytics/UserAnalytics';
import { BusinessIntelligence } from '@/components/analytics/BusinessIntelligence';
import { AdvancedInsights } from '@/components/analytics/AdvancedInsights';
import { FunnelVisualization } from '@/components/analytics/AdvancedInsights';
import { HeatmapToggle } from '@/components/analytics/AdvancedInsights';
import { LeadScore } from '@/components/analytics/BusinessIntelligence';
import { ROICalculator } from '@/components/analytics/BusinessIntelligence';
import { ComplianceReport } from '@/components/security/ComplianceReport';

export default function AnalyticsPage() {
  const [isHeatmapActive, setIsHeatmapActive] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [liveData, setLiveData] = useState<any>({});

  // Helper functions for event display
  const getEventTitle = (eventType: string): string => {
    const titles: Record<string, string> = {
      'page_view': 'Sidvisning',
      'click': 'Klick',
      'scroll_depth': 'Scroll Djup',
      'scroll_position': 'Scroll Position',
      'cta_click': 'CTA Klick',
      'calculator_use': 'Kalkylator Använd',
      'pricing_view': 'Priser Visade',
      'contact_form': 'Kontaktformulär',
      'demo_booking': 'Demo Bokning',
      'form_submit': 'Formulär Skickat',
      'input_focus': 'Input Fokus',
      'input_blur': 'Input Blur',
      'page_hide': 'Sida Dold',
      'page_show': 'Sida Visad',
      'page_exit': 'Sida Lämnad',
      'mouse_movement': 'Musrörelse',
      'session_recording_start': 'Session Recording Startad'
    };
    return titles[eventType] || eventType.replace('_', ' ');
  };

  const getEventDescription = (event: any): React.ReactNode => {
    const { type, data } = event;
    
    switch (type) {
      case 'page_view':
        return (
          <>
            <div>📄 Användare besökte: {data?.title || 'Okänd sida'}</div>
            <div>🔗 URL: {data?.url ? new URL(data.url).pathname : 'N/A'}</div>
            {data?.referrer && <div>↩️ Kom från: {new URL(data.referrer).hostname}</div>}
          </>
        );
      
      case 'click':
        return (
          <>
            <div>🖱️ Klickade på: {data?.tagName || 'Element'}</div>
            {data?.text && <div>📝 Text: "{data.text.substring(0, 50)}..."</div>}
            {data?.id && <div>🆔 ID: {data.id}</div>}
          </>
        );
      
      case 'scroll_depth':
        return (
          <>
            <div>📏 Scrollade till: {data?.depth}% av sidan</div>
            <div>🎯 Max scroll: {data?.maxDepth || data?.depth}%</div>
          </>
        );
      
      case 'scroll_position':
        return (
          <>
            <div>📏 Nuvarande position: {data?.position}%</div>
            <div>🏆 Max scroll: {data?.maxDepth}%</div>
          </>
        );
      
      case 'cta_click':
        return (
          <>
            <div>🎯 Klickade CTA: {data?.cta || 'Okänd'}</div>
            <div>📝 Text: "{data?.text || 'N/A'}"</div>
          </>
        );
      
      case 'calculator_use':
        return (
          <>
            <div>🧮 Använde kalkylator: {data?.calculatorType || 'Okänd'}</div>
            <div>💰 Resultat: {data?.result ? 'Beräknat' : 'Inget resultat'}</div>
          </>
        );
      
      case 'pricing_view':
        return (
          <>
            <div>💳 Visade priser: {data?.pricingTier || 'Alla nivåer'}</div>
            <div>⏱️ Tid på sida: {data?.timeOnPage || 0}s</div>
          </>
        );
      
      case 'contact_form':
        return (
          <>
            <div>📝 Kontaktformulär ifyllt</div>
            <div>📄 Källa: {data?.source || 'Okänd'}</div>
          </>
        );
      
      case 'demo_booking':
        return (
          <>
            <div>📅 Demo bokad</div>
            <div>📄 Källa: {data?.source || 'Okänd'}</div>
          </>
        );
      
      case 'form_submit':
        return (
          <>
            <div>📤 Formulär skickat</div>
            <div>🆔 Form ID: {data?.formId || 'N/A'}</div>
            <div>📊 Antal fält: {data?.fieldCount || 0}</div>
          </>
        );
      
      case 'input_focus':
        return (
          <>
            <div>🎯 Input fokuserad</div>
            <div>📝 Typ: {data?.inputType || 'N/A'}</div>
            <div>🏷️ Namn: {data?.inputName || 'N/A'}</div>
          </>
        );
      
      case 'input_blur':
        return (
          <>
            <div>👁️ Input blur</div>
            <div>📝 Typ: {data?.inputType || 'N/A'}</div>
            <div>✅ Har värde: {data?.hasValue ? 'Ja' : 'Nej'}</div>
          </>
        );
      
      case 'page_hide':
        return <div>🙈 Användare lämnade sidan</div>;
      
      case 'page_show':
        return <div>👁️ Användare återvände till sidan</div>;
      
      case 'page_exit':
        return (
          <>
            <div>🚪 Användare lämnade sidan</div>
            <div>⏱️ Tid på sida: {Math.round((data?.timeOnPage || 0) / 1000)}s</div>
          </>
        );
      
      case 'mouse_movement':
        return (
          <>
            <div>🖱️ Musrörelse spårad</div>
            <div>📍 Antal punkter: {data?.count || 0}</div>
          </>
        );
      
      case 'session_recording_start':
        return <div>🎬 Session recording startad</div>;
      
      default:
        return (
          <>
            <div>❓ Okänt event: {type}</div>
            {data && <div>📊 Data: {JSON.stringify(data).substring(0, 100)}...</div>}
          </>
        );
    }
  };

  const getEventIcon = (eventType: string): string => {
    const icons: Record<string, string> = {
      'page_view': '📄',
      'click': '🖱️',
      'scroll_depth': '📏',
      'scroll_position': '📏',
      'cta_click': '🎯',
      'calculator_use': '🧮',
      'pricing_view': '💳',
      'contact_form': '📝',
      'demo_booking': '📅',
      'form_submit': '📤',
      'input_focus': '🎯',
      'input_blur': '👁️',
      'page_hide': '🙈',
      'page_show': '👁️',
      'page_exit': '🚪',
      'mouse_movement': '🖱️',
      'session_recording_start': '🎬'
    };
    return icons[eventType] || '❓';
  };

  const getEventCategory = (eventType: string): string => {
    const categories: Record<string, string> = {
      'page_view': 'Navigation',
      'click': 'Interaktion',
      'scroll_depth': 'Engagemang',
      'scroll_position': 'Engagemang',
      'cta_click': 'Konvertering',
      'calculator_use': 'Engagemang',
      'pricing_view': 'Intresse',
      'contact_form': 'Konvertering',
      'demo_booking': 'Konvertering',
      'form_submit': 'Konvertering',
      'input_focus': 'Interaktion',
      'input_blur': 'Interaktion',
      'page_hide': 'Beteende',
      'page_show': 'Beteende',
      'page_exit': 'Beteende',
      'mouse_movement': 'Beteende',
      'session_recording_start': 'System'
    };
    return categories[eventType] || 'Övrigt';
  };

  // Fetch analytics summary from API
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await fetch('/api/analytics?summary=true');
        if (response.ok) {
          const data = await response.json();
          setAnalyticsData(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
      }
    };

    fetchAnalyticsData();
    const interval = setInterval(fetchAnalyticsData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Get live data from analytics components
  useEffect(() => {
    const updateLiveData = () => {
      const session = (window as any).getCurrentSession?.();
      const events = (window as any).getCurrentEvents?.();
      const roiMetrics = (window as any).getROIMetrics?.();
      const conversions = (window as any).getConversions?.();
      const heatmapData = (window as any).getHeatmapData?.();
      const funnelData = (window as any).getFunnelData?.();
      const predictions = (window as any).getPredictions?.();

      setLiveData({
        session,
        events,
        roiMetrics,
        conversions,
        heatmapData,
        funnelData,
        predictions
      });
    };

    // Update immediately and then every 5 seconds
    updateLiveData();
    const interval = setInterval(updateLiveData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <UserAnalytics enableHeatmap={true} enableSessionRecording={true}>
      <BusinessIntelligence enableROITracking={true} enableLeadScoring={true}>
        <AdvancedInsights 
          enableHeatmap={true}
          enableFunnelAnalysis={true}
          enableCohortAnalysis={true}
          enablePredictiveAnalytics={true}
        >
          <div className="min-h-screen bg-surface">
            {/* Hero Section */}
            <Hero
              title="Analytics Dashboard"
              sub="Realtidsinsikter om din webbplats"
              trustText="Alla data samlas in automatiskt"
            />

            {/* Main Analytics Dashboard */}
            <div className="section-spacious">
              <div className="container-bk">
                {/* Dashboard Header */}
                <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold text-ink mb-6">
                    Komplett Analytics Översikt
                  </h2>
                  <p className="text-xl text-ink-dim max-w-3xl mx-auto">
                    Följ användarbeteende, konverteringar och prestanda i realtid. 
                    Alla insikter samlas på ett ställe.
                  </p>
                </div>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="bg-surface/50 border border-white/10 rounded-card p-4 text-center">
                    <div className="text-2xl font-bold text-blue mb-1">
                      {liveData.events?.length || 0}
                    </div>
                    <div className="text-xs text-ink-dim">Live Events</div>
                  </div>
                  
                  <div className="bg-surface/50 border border-white/10 rounded-card p-4 text-center">
                    <div className="text-2xl font-bold text-teal mb-1">
                      {liveData.session?.interactions || 0}
                    </div>
                    <div className="text-xs text-ink-dim">Interaktioner</div>
                  </div>
                  
                  <div className="bg-surface/50 border border-white/10 rounded-card p-4 text-center">
                    <div className="text-2xl font-bold text-purple mb-1">
                      {liveData.roiMetrics?.totalConversions || 0}
                    </div>
                    <div className="text-xs text-ink-dim">Konverteringar</div>
                  </div>
                  
                  <div className="bg-surface/50 border border-white/10 rounded-card p-4 text-center">
                    <div className="text-2xl font-bold text-orange mb-1">
                      {liveData.heatmapData?.length || 0}
                    </div>
                    <div className="text-xs text-ink-dim">Heatmap Pts</div>
                  </div>
                </div>

                {/* Main Dashboard Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* User Analytics */}
                  <div className="bg-surface/50 border border-white/10 rounded-card p-6">
                    <h3 className="text-xl font-bold text-ink mb-4">Användaranalys</h3>
                    
                    <div className="space-y-4">
                      {/* Session Info */}
                      <div className="bg-surface/30 rounded-lg p-3">
                        <h4 className="font-semibold text-ink mb-2 text-sm">Aktiv Session</h4>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <span className="text-ink-dim">ID:</span>
                            <div className="font-mono text-ink">{liveData.session?.id?.substring(0, 8) || 'N/A'}...</div>
                          </div>
                          <div>
                            <span className="text-ink-dim">Enhet:</span>
                            <div className="text-ink">{liveData.session?.deviceType || 'N/A'}</div>
                          </div>
                        </div>
                      </div>

                      {/* Live Events */}
                      <div className="bg-surface/30 rounded-lg p-3">
                        <h4 className="font-semibold text-ink mb-2 text-sm">Live Events</h4>
                        <div className="text-xs text-ink-dim">
                          <div>Totala: {liveData.events?.length || 0}</div>
                          <div>Senaste: {liveData.events?.[liveData.events.length - 1]?.type || 'N/A'}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Business Intelligence */}
                  <div className="bg-surface/50 border border-white/10 rounded-card p-6">
                    <h3 className="text-xl font-bold text-ink mb-4">Affärsintelligens</h3>
                    
                    <div className="space-y-4">
                      {/* ROI Metrics */}
                      <div className="bg-surface/30 rounded-lg p-3">
                        <h4 className="font-semibold text-ink mb-2 text-sm">ROI Metrics</h4>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-ink-dim">Konverteringar:</span>
                            <span className="text-ink">{liveData.roiMetrics?.totalConversions || 0}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-ink-dim">Grad:</span>
                            <span className="text-ink">{liveData.roiMetrics?.conversionRate?.toFixed(1) || 0}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-ink-dim">Värde:</span>
                            <span className="text-ink">{liveData.roiMetrics?.totalValue?.toLocaleString('sv-SE') || 0} SEK</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advanced Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                  {/* Conversion Funnel */}
                  <div className="bg-surface/50 border border-white/10 rounded-card p-6">
                    <h3 className="text-xl font-bold text-ink mb-4">Konverteringsflöde</h3>
                    <FunnelVisualization 
                      data={liveData.funnelData || [
                        { name: 'Sidvisning', count: 0, conversionRate: 100, dropoffRate: 0, value: 0 },
                        { name: 'Engagemang', count: 0, conversionRate: 0, dropoffRate: 0, value: 0 },
                        { name: 'Intresse', count: 0, conversionRate: 0, dropoffRate: 0, value: 0 },
                        { name: 'Övervägande', count: 0, conversionRate: 0, dropoffRate: 0, value: 0 },
                        { name: 'Konvertering', count: 0, conversionRate: 0, dropoffRate: 0, value: 0 }
                      ]} 
                    />
                  </div>

                  {/* Heatmap Controls */}
                  <div className="bg-surface/50 border border-white/10 rounded-card p-6">
                    <h3 className="text-xl font-bold text-ink mb-4">Heatmap & Session Recording</h3>
                    
                    <div className="space-y-4">
                      {/* Heatmap Toggle */}
                      <div className="bg-surface/30 rounded-lg p-3">
                        <h4 className="font-semibold text-ink mb-2 text-sm">Heatmap Recording</h4>
                        <HeatmapToggle 
                          isActive={isHeatmapActive}
                          onToggle={() => setIsHeatmapActive(!isHeatmapActive)}
                          className="w-full"
                        />
                        <p className="text-xs text-ink-dim mt-2">
                          Aktivera för att spåra användarklick och rörelser
                        </p>
                      </div>

                      {/* Session Recording */}
                      <div className="bg-surface/30 rounded-lg p-3">
                        <h4 className="font-semibold text-ink mb-2 text-sm">Session Recording</h4>
                        <div className="text-xs text-ink-dim">
                          <p>Session recording är aktiverat</p>
                          <p className="mt-1">Spårar användarinteraktioner automatiskt</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Events */}
                <div className="bg-surface/50 border border-white/10 rounded-card p-6">
                  <h3 className="text-xl font-bold text-ink mb-4">Senaste Events</h3>
                  
                  <div className="space-y-3">
                    {liveData.events?.slice(-8).reverse().map((event: any, index: number) => (
                      <div key={index} className="bg-surface/30 rounded-lg p-3 border-l-4 border-blue/50">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-blue rounded-full"></div>
                            <span className="font-semibold text-ink text-sm">
                              {getEventTitle(event.type)}
                            </span>
                          </div>
                          <span className="text-xs text-ink-dim">
                            {new Date(event.timestamp).toLocaleTimeString('sv-SE')}
                          </span>
                        </div>
                        
                        <div className="text-xs text-ink-dim space-y-1">
                          {getEventDescription(event)}
                        </div>
                        
                        <div className="flex items-center gap-4 mt-2 text-xs">
                          <span className="text-ink-dim">
                            Session: {event.sessionId?.substring(0, 8) || 'N/A'}...
                          </span>
                          <span className="text-ink-dim">
                            {getEventIcon(event.type)} {getEventCategory(event.type)}
                          </span>
                        </div>
                      </div>
                    ))}
                    
                    {(!liveData.events || liveData.events.length === 0) && (
                      <div className="text-center py-8 text-ink-dim">
                        <div className="text-4xl mb-2">📊</div>
                        <p>Inga events ännu</p>
                        <p className="text-xs">Navigera runt på sidan för att se events</p>
                      </div>
                    )}
                  </div>
                </div>

                                  {/* Export & Actions */}
                  <div className="text-center">
                    <div className="inline-flex gap-4">
                      <button
                        onClick={() => {
                          const data = {
                            liveData,
                            analyticsData,
                            timestamp: new Date().toISOString()
                          };
                          const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `bokario-analytics-${new Date().toISOString().split('T')[0]}.json`;
                          a.click();
                          URL.revokeObjectURL(url);
                        }}
                        className="px-6 py-3 bg-blue text-white rounded-card font-semibold hover:bg-blue/90 transition-colors text-sm"
                      >
                        Exportera Data
                      </button>
                      <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-surface/50 border border-white/20 text-ink rounded-card font-semibold hover:bg-surface/70 transition-colors text-sm"
                      >
                        Uppdatera Dashboard
                      </button>
                    </div>
                  </div>

                  {/* Compliance Report */}
                  <ComplianceReport className="mt-8" />
              </div>
            </div>
          </div>
        </AdvancedInsights>
      </BusinessIntelligence>
    </UserAnalytics>
  );
}
