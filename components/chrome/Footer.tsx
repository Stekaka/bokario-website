"use client";

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-surface border-t border-line">
      <div className="container-bk py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Company Info */}
          <div>
            <div className="text-lg font-display font-semibold mb-3 text-ink">Bokario</div>
            <p className="text-sm text-ink-dim">Från klick till kalender.</p>
          </div>
          
                            {/* Product Links */}
                  <div>
                    <div className="font-semibold mb-3 text-ink">Produkt</div>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <a href="/maps" className="text-ink-dim hover:text-ink transition-colors duration-220">
                          Maps
                        </a>
                      </li>
                      <li>
                        <a href="/bookings" className="text-ink-dim hover:text-ink transition-colors duration-220">
                          Bookings
                        </a>
                      </li>
                      <li>
                        <a href="/reviews" className="text-ink-dim hover:text-ink transition-colors duration-220">
                          Reviews
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Resources */}
                  <div>
                    <div className="font-semibold mb-3 text-ink">Resurser</div>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <a href="/pricing" className="text-ink-dim hover:text-ink transition-colors duration-220">
                          Priser
                        </a>
                      </li>
                      <li>
                        <a href="/case" className="text-ink-dim hover:text-ink transition-colors duration-220">
                          Case
                        </a>
                      </li>
                      <li>
                        <a href="/faq" className="text-ink-dim hover:text-ink transition-colors duration-220">
                          Vanliga frågor
                        </a>
                      </li>
                    </ul>
                  </div>
        </div>
        
        {/* Contact & Copyright */}
        <div className="border-t border-line mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="font-semibold mb-2 text-ink">Kontakt</div>
              <p className="text-sm text-ink-dim">hej@bokario.se</p>
            </div>
            <div className="text-xs text-ink-dim">
              © 2025 Bokario
            </div>
          </div>
          
          {/* Cookie Settings */}
          <div className="border-t border-line mt-4 pt-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="text-xs text-ink-dim">
                Vi använder cookies för att förbättra din upplevelse. 
                <a href="/privacy" className="text-blue hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                  Läs vår integritetspolicy
                </a>
              </div>
              <button
                onClick={() => {
                  // Open cookie preferences modal
                  if (typeof window !== 'undefined' && (window as any).openCookiePreferences) {
                    (window as any).openCookiePreferences();
                  }
                }}
                className="text-xs text-ink-dim hover:text-ink transition-colors underline"
              >
                🍪 Cookie inställningar
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

