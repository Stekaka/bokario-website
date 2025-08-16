"use client";

import { useState, useEffect, useRef } from 'react';

interface SecurityEvent {
  id: string;
  timestamp: Date;
  type: 'info' | 'warning' | 'error' | 'success';
  category: 'authentication' | 'authorization' | 'data_access' | 'system' | 'compliance';
  message: string;
  details: any;
  severity: 'low' | 'medium' | 'high' | 'critical';
  ipAddress?: string;
  userAgent?: string;
  userId?: string;
  sessionId?: string;
}

interface SecurityMetrics {
  totalEvents: number;
  eventsByType: Record<string, number>;
  eventsBySeverity: Record<string, number>;
  eventsByCategory: Record<string, number>;
  recentThreats: number;
  complianceScore: number;
}

interface SecurityMonitorProps {
  enableMonitoring?: boolean;
  enableLogging?: boolean;
  enableAlerts?: boolean;
  className?: string;
}

export function SecurityMonitor({ 
  enableMonitoring = true, 
  enableLogging = true, 
  enableAlerts = true,
  className = '' 
}: SecurityMonitorProps) {
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [metrics, setMetrics] = useState<SecurityMetrics>({
    totalEvents: 0,
    eventsByType: {},
    eventsBySeverity: {},
    eventsByCategory: {},
    recentThreats: 0,
    complianceScore: 100
  });
  const [isActive, setIsActive] = useState(false);
  const [alertLevel, setAlertLevel] = useState<'normal' | 'elevated' | 'high'>('normal');
  
  const eventIdCounter = useRef(0);
  const monitoringInterval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (enableMonitoring) {
      startMonitoring();
    }

    return () => {
      if (monitoringInterval.current) {
        clearInterval(monitoringInterval.current);
      }
    };
  }, [enableMonitoring]);

  const startMonitoring = () => {
    setIsActive(true);
    
    // Monitor for security events
    monitoringInterval.current = setInterval(() => {
      monitorSecurityEvents();
    }, 5000); // Check every 5 seconds

    // Initial security scan
    performSecurityScan();
  };

  const monitorSecurityEvents = () => {
    // Monitor for suspicious activities
    const suspiciousActivities = detectSuspiciousActivities();
    
    if (suspiciousActivities.length > 0) {
      suspiciousActivities.forEach(activity => {
        logSecurityEvent(activity);
      });
    }

    // Update compliance score
    updateComplianceScore();
  };

  const detectSuspiciousActivities = (): Partial<SecurityEvent>[] => {
    const activities: Partial<SecurityEvent>[] = [];

    // Check for rapid-fire requests (potential DDoS)
    if (events.length > 10) {
      const recentEvents = events.filter(e => 
        Date.now() - e.timestamp.getTime() < 60000 // Last minute
      );
      
      if (recentEvents.length > 50) {
        activities.push({
          type: 'warning',
          category: 'system',
          message: 'Hög frekvens av requests upptäckt - potentiell DDoS',
          severity: 'high',
          details: { requestCount: recentEvents.length, timeWindow: '1 minut' }
        });
      }
    }

    // Check for failed authentication attempts
    const failedAuths = events.filter(e => 
      e.category === 'authentication' && 
      e.type === 'error' &&
      Date.now() - e.timestamp.getTime() < 300000 // Last 5 minutes
    );

    if (failedAuths.length > 5) {
      activities.push({
        type: 'error',
        category: 'authentication',
        message: 'Flera misslyckade autentiseringsförsök upptäckta',
        severity: 'medium',
        details: { failedAttempts: failedAuths.length, timeWindow: '5 minuter' }
      });
    }

    // Check for unusual data access patterns
    const dataAccessEvents = events.filter(e => 
      e.category === 'data_access' &&
      Date.now() - e.timestamp.getTime() < 600000 // Last 10 minutes
    );

    if (dataAccessEvents.length > 20) {
      activities.push({
        type: 'warning',
        category: 'data_access',
        message: 'Ovanligt hög aktivitet för dataåtkomst',
        severity: 'medium',
        details: { accessCount: dataAccessEvents.length, timeWindow: '10 minuter' }
      });
    }

    return activities;
  };

  const logSecurityEvent = (eventData: Partial<SecurityEvent>) => {
    const event: SecurityEvent = {
      id: `sec_${++eventIdCounter.current}`,
      timestamp: new Date(),
      type: eventData.type || 'info',
      category: eventData.category || 'system',
      message: eventData.message || 'Säkerhetshändelse',
      details: eventData.details || {},
      severity: eventData.severity || 'low',
      ipAddress: getClientIP(),
      userAgent: navigator.userAgent,
      sessionId: getSessionId()
    };

    setEvents(prev => [event, ...prev.slice(0, 99)]); // Keep last 100 events
    
    // Update metrics
    updateMetrics(event);
    
    // Send alert if enabled
    if (enableAlerts && event.severity === 'critical') {
      sendSecurityAlert(event);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🔒 Security Event:', event);
    }
  };

  const updateMetrics = (event: SecurityEvent) => {
    setMetrics(prev => ({
      totalEvents: prev.totalEvents + 1,
      eventsByType: {
        ...prev.eventsByType,
        [event.type]: (prev.eventsByType[event.type] || 0) + 1
      },
      eventsBySeverity: {
        ...prev.eventsBySeverity,
        [event.severity]: (prev.eventsBySeverity[event.severity] || 0) + 1
      },
      eventsByCategory: {
        ...prev.eventsByCategory,
        [event.category]: (prev.eventsByCategory[event.category] || 0) + 1
      },
      recentThreats: prev.recentThreats + (event.severity === 'high' || event.severity === 'critical' ? 1 : 0),
      complianceScore: prev.complianceScore
    }));
  };

  const updateComplianceScore = () => {
    let score = 100;
    
    // Deduct points for security issues
    const criticalEvents = events.filter(e => e.severity === 'critical').length;
    const highEvents = events.filter(e => e.severity === 'high').length;
    const mediumEvents = events.filter(e => e.severity === 'medium').length;
    
    score -= criticalEvents * 10; // -10 points per critical event
    score -= highEvents * 5;      // -5 points per high event
    score -= mediumEvents * 2;    // -2 points per medium event
    
    // Ensure score doesn't go below 0
    score = Math.max(0, score);
    
    setMetrics(prev => ({ ...prev, complianceScore: score }));
  };

  const performSecurityScan = () => {
    // Check for common security vulnerabilities
    const vulnerabilities = checkSecurityVulnerabilities();
    
    vulnerabilities.forEach(vuln => {
      logSecurityEvent({
        type: 'warning',
        category: 'system',
        message: `Säkerhetsgenomgång: ${vuln.message}`,
        severity: vuln.severity,
        details: vuln.details
      });
    });
  };

  const checkSecurityVulnerabilities = () => {
    const vulnerabilities: Array<{
      message: string;
      severity: 'low' | 'medium' | 'high' | 'critical';
      details: any;
    }> = [];

    // Check if running on HTTPS
    if (typeof window !== 'undefined' && window.location.protocol !== 'https:') {
      vulnerabilities.push({
        message: 'Webbplats körs inte över HTTPS',
        severity: 'high',
        details: { protocol: window.location.protocol }
      });
    }

    // Check for secure context
    if (typeof window !== 'undefined' && !window.isSecureContext) {
      vulnerabilities.push({
        message: 'Webbplats körs inte i säker kontext',
        severity: 'medium',
        details: { isSecureContext: false }
      });
    }

    // Check for outdated security headers (basic check)
    if (typeof window !== 'undefined') {
      // This is a simplified check - in production you'd want to check actual headers
      vulnerabilities.push({
        message: 'Säkerhetsheaders bör verifieras',
        severity: 'low',
        details: { note: 'Kontrollera CSP, HSTS, och andra säkerhetsheaders' }
      });
    }

    return vulnerabilities;
  };

  const sendSecurityAlert = (event: SecurityEvent) => {
    // In production, this would send alerts via email, Slack, etc.
    if (process.env.NODE_ENV === 'development') {
      console.warn('🚨 SECURITY ALERT:', event);
    }
    
    // Update alert level
    if (event.severity === 'critical') {
      setAlertLevel('high');
    } else if (event.severity === 'high') {
      setAlertLevel('elevated');
    }
  };

  const getClientIP = (): string => {
    // In production, this would get the actual client IP
    // For now, return a placeholder
    return '127.0.0.1';
  };

  const getSessionId = (): string => {
    // Get session ID from localStorage or generate one
    let sessionId = localStorage.getItem('bokario-session-id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('bokario-session-id', sessionId);
    }
    return sessionId;
  };

  const getSeverityColor = (severity: string): string => {
    const colors = {
      low: 'text-green-500',
      medium: 'text-yellow-500',
      high: 'text-orange-500',
      critical: 'text-red-500'
    };
    return colors[severity as keyof typeof colors] || 'text-gray-500';
  };

  const getCategoryIcon = (category: string): string => {
    const icons = {
      authentication: '🔐',
      authorization: '🚪',
      data_access: '📊',
      system: '⚙️',
      compliance: '📋'
    };
    return icons[category as keyof typeof icons] || '❓';
  };

  const getTypeIcon = (type: string): string => {
    const icons = {
      info: 'ℹ️',
      warning: '⚠️',
      error: '❌',
      success: '✅'
    };
    return icons[type as keyof typeof icons] || '❓';
  };

  const exportSecurityLog = () => {
    const data = {
      events,
      metrics,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bokario-security-log-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!enableMonitoring) {
    return null;
  }

  return (
    <div className={`security-monitor ${className}`}>
      {/* Security Status Bar */}
      <div className={`fixed top-0 left-0 right-0 z-50 p-2 text-center text-sm font-medium transition-colors ${
        alertLevel === 'normal' ? 'bg-green-500/20 text-green-400' :
        alertLevel === 'elevated' ? 'bg-yellow-500/20 text-yellow-400' :
        'bg-red-500/20 text-red-400'
      }`}>
        {alertLevel === 'normal' && '🟢 Säkerhetsstatus: Normal'}
        {alertLevel === 'elevated' && '🟡 Säkerhetsstatus: Höjd'}
        {alertLevel === 'high' && '🔴 Säkerhetsstatus: KRITISK'}
      </div>

      {/* Security Dashboard */}
      <div className="fixed bottom-4 left-4 z-50 bg-surface/95 backdrop-blur-xl border border-white/20 rounded-card p-4 max-w-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-ink">🔒 Security Monitor</h3>
          <div className={`w-2 h-2 rounded-full ${
            isActive ? 'bg-green-500' : 'bg-red-500'
          }`} />
        </div>

        {/* Quick Metrics */}
        <div className="space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-ink-dim">Events:</span>
            <span className="text-ink">{metrics.totalEvents}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-dim">Threats:</span>
            <span className="text-orange-500">{metrics.recentThreats}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-ink-dim">Compliance:</span>
            <span className={`${
              metrics.complianceScore >= 80 ? 'text-green-500' :
              metrics.complianceScore >= 60 ? 'text-yellow-500' :
              'text-red-500'
            }`}>
              {metrics.complianceScore}%
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={exportSecurityLog}
            className="px-2 py-1 bg-blue/20 text-blue text-xs rounded hover:bg-blue/30 transition-colors"
          >
            Export
          </button>
          <button
            onClick={() => setIsActive(!isActive)}
            className={`px-2 py-1 text-xs rounded transition-colors ${
              isActive 
                ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                : 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
            }`}
          >
            {isActive ? 'Stop' : 'Start'}
          </button>
        </div>
      </div>

      {/* Security Events Log (Development Only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-20 right-4 z-40 bg-surface/95 backdrop-blur-xl border border-white/20 rounded-card p-4 max-w-md max-h-96 overflow-y-auto">
          <h3 className="text-sm font-semibold text-ink mb-3">🔒 Security Events</h3>
          <div className="space-y-2 text-xs">
            {events.slice(0, 10).map(event => (
              <div key={event.id} className="bg-surface/30 rounded p-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className={getSeverityColor(event.severity)}>
                    {getTypeIcon(event.type)}
                  </span>
                  <span className="text-ink-dim">
                    {getCategoryIcon(event.category)}
                  </span>
                  <span className={`text-xs px-1 rounded ${
                    event.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                    event.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                    event.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {event.severity}
                  </span>
                </div>
                <div className="text-ink text-xs">{event.message}</div>
                <div className="text-ink-dim text-xs mt-1">
                  {event.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Hook for using security monitoring
export function useSecurityMonitoring() {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);

  const logEvent = (event: Partial<SecurityEvent>) => {
    const fullEvent: SecurityEvent = {
      id: `sec_${Date.now()}`,
      timestamp: new Date(),
      type: event.type || 'info',
      category: event.category || 'system',
      message: event.message || 'Säkerhetshändelse',
      details: event.details || {},
      severity: event.severity || 'low'
    };

    setSecurityEvents(prev => [fullEvent, ...prev]);
  };

  return { isMonitoring, setIsMonitoring, securityEvents, logEvent };
}
