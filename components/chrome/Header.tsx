import Link from 'next/link'
import { Button } from '../Button'

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-line">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-12 bg-primary-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="24" fill="currentColor"/>
              <rect x="12" y="16" width="24" height="20" rx="2" fill="white"/>
              <rect x="12" y="16" width="24" height="6" rx="2" fill="white"/>
              <circle cx="16" cy="19" r="1" fill="currentColor"/>
              <circle cx="20" cy="19" r="1" fill="currentColor"/>
              <circle cx="24" cy="19" r="1" fill="currentColor"/>
              <circle cx="28" cy="19" r="1" fill="currentColor"/>
              <circle cx="32" cy="19" r="1" fill="currentColor"/>
              <path d="M16 28 L20 28 Q22 28 22 30 Q22 32 20 32 L16 32 L16 28 Z" fill="currentColor"/>
              <path d="M16 32 L20 32 Q22 32 22 34 Q22 36 20 36 L16 36 L16 32 Z" fill="currentColor"/>
              <path d="M28 30 L30 32 L34 28" stroke="#17B6A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-semibold text-lg text-ink-950">Bokario</span>
        </Link>
        
        <nav className="hidden sm:flex items-center gap-6">
          <Link href="/maps" className="text-base text-ink-700 hover:text-ink-950 transition-colors duration-200">
            Maps
          </Link>
          <Link href="/bookings" className="text-base text-ink-700 hover:text-ink-950 transition-colors duration-200">
            Bookings
          </Link>
          <Link href="/reviews" className="text-base text-ink-700 hover:text-ink-950 transition-colors duration-200">
            Reviews
          </Link>
          <Link href="/styleguide" className="text-base text-ink-700 hover:text-ink-950 transition-colors duration-200">
            Styleguide
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <Button 
            as="a" 
            href="#demo" 
            size="md"
            data-cta="header-cta"
          >
            Boka demo
          </Button>
        </div>
      </div>
    </header>
  )
}
