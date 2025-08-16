"use client";

import { useState, useEffect } from 'react';

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

interface CookieConsentProps {
  onConsentChange?: (preferences: CookiePreferences) => void;
  className?: string;
}

export function CookieConsent({ onConsentChange, className = '' }: CookieConsentProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);


  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true
    analytics: false,
    marketing: false,
    preferences: false
  });

  // Expose function globally immediately when component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).openCookiePreferences = () => {
        setShowPreferences(true);
      };
    }

    return () => {
      if (typeof window !== 'undefined') {
        delete (window as any).openCookiePreferences;
      }
    };
  }, []); // Remove showPreferences dependency to avoid infinite loop

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('bokario-cookie-consent');
    if (!consent) {
      setShowBanner(true);
    } else {
      try {
        const savedPreferences = JSON.parse(consent);
        setPreferences(savedPreferences);
        onConsentChange?.(savedPreferences);
      } catch (error) {
        console.error('Failed to parse cookie consent:', error);
        setShowBanner(true);
      }
    }
  }, [onConsentChange]);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    
    setPreferences(allAccepted);
    saveConsent(allAccepted);
    setShowBanner(false);
    onConsentChange?.(allAccepted);
  };

  const handleAcceptNecessary = () => {
    const necessaryOnly: CookiePreferences = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
    
    setPreferences(necessaryOnly);
    saveConsent(necessaryOnly);
    setShowBanner(false);
    onConsentChange?.(necessaryOnly);
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
    setShowPreferences(false);
    onConsentChange?.(preferences);
  };

  const handleClosePreferences = () => {
    setShowPreferences(false);
  };

  const saveConsent = (consent: CookiePreferences) => {
    localStorage.setItem('bokario-cookie-consent', JSON.stringify(consent));
    
    // Set consent timestamp
    localStorage.setItem('bokario-cookie-consent-date', new Date().toISOString());
    
    // Update analytics tracking based on consent
    if (consent.analytics) {
      enableAnalytics();
    } else {
      disableAnalytics();
    }
  };

  const enableAnalytics = () => {
    // Enable analytics tracking
    if (typeof window !== 'undefined') {
      (window as any).enableAnalytics = true;
    }
  };

  const disableAnalytics = () => {
    // Disable analytics tracking
    if (typeof window !== 'undefined') {
      (window as any).enableAnalytics = false;
    }
  };

  const getCookieDescription = (type: keyof CookiePreferences): string => {
    const descriptions = {
      necessary: 'Krävs för att webbplatsen ska fungera. Kan inte stängas av.',
      analytics: 'Hjälper oss att förstå hur webbplatsen används och förbättra användarupplevelsen.',
      marketing: 'Används för att visa relevanta annonser och innehåll.',
      preferences: 'Sparar dina inställningar och preferenser för en bättre upplevelse.'
    };
    return descriptions[type];
  };

  if (!showBanner) {
    return null; // No sticky button, cookie settings are in footer
  }


  
  return (
    <>
      {/* Main Cookie Banner */}
      {showBanner && (
        <div className="fixed bottom-4 left-4 right-4 z-50 bg-surface/90 backdrop-blur-xl border border-white/20 rounded-card shadow-lg max-w-md mx-auto">
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <h3 className="text-sm font-medium text-ink mb-1">
                  🍪 Cookies
                </h3>
                <p className="text-xs text-ink-dim leading-relaxed mb-3">
                  Vi använder cookies för att förbättra din upplevelse. 
                  <a 
                    href="/privacy" 
                    className="text-blue hover:underline ml-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Läs mer
                  </a>
                </p>
              </div>
              
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={handleAcceptNecessary}
                  className="px-3 py-1.5 bg-surface/50 border border-white/20 text-ink rounded text-xs hover:bg-surface/70 transition-colors"
                >
                  Nej
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-3 py-1.5 bg-blue text-white rounded text-xs hover:bg-blue/90 transition-colors"
                >
                  Ja
                </button>
              </div>
            </div>
            
            <div className="mt-2 text-center">
              <button
                onClick={() => setShowPreferences(true)}
                className="text-xs text-ink-dim hover:text-ink transition-colors underline"
              >
                Anpassa inställningar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Preferences Modal */}
      {showPreferences && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface/95 backdrop-blur-xl border border-white/20 rounded-card p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-ink">
                🍪 Cookie Inställningar
              </h3>
              <button
                onClick={handleClosePreferences}
                className="text-ink-dim hover:text-ink transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {Object.entries(preferences).map(([key, value]) => (
                <div key={key} className="bg-surface/30 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium text-ink capitalize">
                        {key === 'necessary' ? 'Nödvändiga Cookies' : 
                         key === 'analytics' ? 'Analytics Cookies' :
                         key === 'marketing' ? 'Marketing Cookies' :
                         'Preferens Cookies'}
                      </h4>
                      <p className="text-sm text-ink-dim mt-1">
                        {getCookieDescription(key as keyof CookiePreferences)}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer ml-4">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => {
                          if (key === 'necessary') return; // Can't disable necessary
                          setPreferences(prev => ({
                            ...prev,
                            [key]: e.target.checked
                          }));
                        }}
                        disabled={key === 'necessary'}
                        className="sr-only peer"
                      />
                      <div className={`w-11 h-6 bg-surface/50 border border-white/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-blue after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all ${
                        key === 'necessary' ? 'opacity-50 cursor-not-allowed' : ''
                      }`} />
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <button
                onClick={handleClosePreferences}
                className="px-6 py-3 bg-surface/50 border border-white/20 text-ink rounded-lg hover:bg-surface/70 transition-colors font-medium"
              >
                Avbryt
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-6 py-3 bg-blue text-white rounded-lg hover:bg-blue/90 transition-colors font-medium"
              >
                Spara inställningar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Hook for checking cookie consent
export function useCookieConsent() {
  const [consent, setConsent] = useState<CookiePreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedConsent = localStorage.getItem('bokario-cookie-consent');
    if (savedConsent) {
      try {
        const parsed = JSON.parse(savedConsent);
        setConsent(parsed);
      } catch (error) {
        console.error('Failed to parse cookie consent:', error);
      }
    }
    setIsLoading(false);
  }, []);

  const hasConsent = (type: keyof CookiePreferences): boolean => {
    return consent?.[type] || false;
  };

  return { consent, isLoading, hasConsent };
}
