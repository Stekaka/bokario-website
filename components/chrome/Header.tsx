"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/Button';

export function Header() {
  const showStyleguide = process.env.NEXT_PUBLIC_DEBUG === 'true';
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const progress = Math.min(scrollTop / documentHeight, 1);
      
      setIsScrolled(scrollTop > 20);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const isActive = (path: string) => {
    if (!pathname) return false;
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  return (
          <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-out transform ${
        isScrolled 
          ? 'bg-surface/20 backdrop-blur-[40px] border-b border-white/5 shadow-lg shadow-black/20' 
          : 'bg-surface/75 backdrop-blur-[40px] border-b border-white/15'
      }`}>
      {/* Simple transparent glass effect */}
      <div className={`absolute inset-0 bg-gradient-to-br from-white/2 via-transparent to-white/2 transition-all duration-500 ${
        isScrolled ? 'from-white/1 via-transparent to-white/1' : 'from-white/3 via-transparent to-white/3'
      }`} />
      
      {/* Subtle color tint */}
      <div className={`absolute inset-0 bg-gradient-to-br from-blue/3 via-transparent to-teal/3 transition-all duration-500 ${
        isScrolled ? 'from-blue/2 via-transparent to-teal/2' : 'from-blue/5 via-transparent to-teal/5'
      }`} />
      
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue/30 via-teal/30 to-purple/30">
        <div 
          className="h-full bg-gradient-to-r from-blue via-teal to-purple transition-all duration-500 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
      
      <div className={`container-bk flex items-center justify-between transition-all duration-500 ease-out relative z-10 ${
        isScrolled ? 'h-14' : 'h-16'
      }`}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className={`rounded-card bg-gradient-to-br from-blue to-teal flex items-center justify-center group-hover:scale-110 transition-all duration-500 ${
            isScrolled ? 'h-6 w-6' : 'h-8 w-8'
          }`}>
            <svg className={`text-ink fill-currentColor transition-all duration-500 ${
              isScrolled ? 'w-4 h-4' : 'w-5 h-5'
            }`} viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="24" fill="currentColor" />
              <rect x="12" y="16" width="24" height="20" rx="2" fill="white" />
              <rect x="12" y="16" width="24" height="6" rx="2" fill="white" />
              <circle cx="16" cy="19" r="1" fill="currentColor" />
              <circle cx="20" cy="19" r="1" fill="currentColor" />
              <circle cx="24" cy="19" r="1" fill="currentColor" />
              <circle cx="28" cy="19" r="1" fill="currentColor" />
              <circle cx="32" cy="19" r="1" fill="currentColor" />
              <path d="M16 28 L20 28 Q22 28 22 30 Q22 32 20 32 L16 32 L16 28 Z" fill="currentColor" />
              <path d="M16 32 L20 32 Q22 32 22 34 Q22 36 20 36 L16 36 L16 32 Z" fill="currentColor" />
              <path d="M28 30 L30 32 L34 28" stroke="#17B6A5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className={`font-display font-semibold text-ink transition-all duration-500 ${
            isScrolled ? 'text-base' : 'text-lg'
          }`}>Bokario</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className={`hidden lg:flex items-center gap-8 transition-all duration-500 ${
          isScrolled ? 'gap-6' : 'gap-8'
        }`}>
          <Link
            href="/maps"
            className={`transition-all duration-220 relative group ${
              isScrolled ? 'text-sm' : 'text-body'
            } ${
              isActive('/maps') 
                ? 'text-ink font-medium drop-shadow-sm' 
                : 'text-ink-dim hover:text-ink'
            }`}
            style={{
              transform: isScrolled ? `translateY(${scrollProgress * -2}px)` : 'translateY(0)',
              transition: 'transform 0.1s ease-out'
            }}
          >
            Maps
            {isActive('/maps') && (
              <div className={`absolute bg-gradient-to-r from-blue to-teal rounded-full transition-all duration-500 ${
                isScrolled ? '-bottom-0.5 h-0.5' : '-bottom-1 h-0.5'
              }`} style={{ width: '100%' }}>
                <div className="w-full h-full bg-gradient-to-r from-blue to-teal rounded-full animate-pulse" />
              </div>
            )}
            {!isActive('/maps') && (
              <div className={`absolute bg-gradient-to-r from-blue to-teal rounded-full scale-x-0 group-hover:scale-x-100 transition-all duration-500 origin-left opacity-60 group-hover:opacity-100 ${
                isScrolled ? '-bottom-0.5 h-0.5' : '-bottom-1 h-0.5'
              }`} style={{ width: '100%' }} />
            )}
          </Link>
          <Link
            href="/bookings"
            className={`transition-all duration-220 relative group ${
              isScrolled ? 'text-sm' : 'text-body'
            } ${
              isActive('/bookings') 
                ? 'text-ink font-medium drop-shadow-sm' 
                : 'text-ink-dim hover:text-ink'
            }`}
            style={{
              transform: isScrolled ? `translateY(${scrollProgress * -2}px)` : 'translateY(0)',
              transition: 'transform 0.1s ease-out'
            }}
          >
            Bookings
            {isActive('/bookings') && (
              <div className={`absolute bg-gradient-to-r from-blue to-teal rounded-full transition-all duration-500 ${
                isScrolled ? '-bottom-0.5 h-0.5' : '-bottom-1 h-0.5'
              }`} style={{ width: '100%' }}>
                <div className="w-full h-full bg-gradient-to-r from-blue to-teal rounded-full animate-pulse" />
              </div>
            )}
            {!isActive('/bookings') && (
              <div className={`absolute bg-gradient-to-r from-blue to-teal rounded-full scale-x-0 group-hover:scale-x-100 transition-all duration-500 origin-left opacity-60 group-hover:opacity-100 ${
                isScrolled ? '-bottom-0.5 h-0.5' : '-bottom-1 h-0.5'
              }`} style={{ width: '100%' }} />
            )}
          </Link>
          <Link
            href="/reviews"
            className={`transition-all duration-220 relative group ${
              isScrolled ? 'text-sm' : 'text-body'
            } ${
              isActive('/reviews') 
                ? 'text-ink font-medium drop-shadow-sm' 
                : 'text-ink-dim hover:text-ink'
            }`}
            style={{
              transform: isScrolled ? `translateY(${scrollProgress * -2}px)` : 'translateY(0)',
              transition: 'transform 0.1s ease-out'
            }}
          >
            Reviews
            {isActive('/reviews') && (
              <div className={`absolute bg-gradient-to-r from-blue to-teal rounded-full transition-all duration-500 ${
                isScrolled ? '-bottom-0.5 h-0.5' : '-bottom-1 h-0.5'
              }`} style={{ width: '100%' }}>
                <div className="w-full h-full bg-gradient-to-r from-blue to-teal rounded-full animate-pulse" />
              </div>
            )}
            {!isActive('/reviews') && (
              <div className={`absolute bg-gradient-to-r from-blue to-teal rounded-full scale-x-0 group-hover:scale-x-100 transition-all duration-500 origin-left opacity-60 group-hover:opacity-100 ${
                isScrolled ? '-bottom-0.5 h-0.5' : '-bottom-1 h-0.5'
              }`} style={{ width: '100%' }} />
            )}
          </Link>
          <Link
            href="/pricing"
            className={`transition-all duration-220 relative group ${
              isScrolled ? 'text-sm' : 'text-body'
            } ${
              isActive('/pricing') 
                ? 'text-ink font-medium drop-shadow-sm' 
                : 'text-ink-dim hover:text-ink'
            }`}
            style={{
              transform: isScrolled ? `translateY(${scrollProgress * -2}px)` : 'translateY(0)',
              transition: 'transform 0.1s ease-out'
            }}
          >
            Priser
            {isActive('/pricing') && (
              <div className={`absolute bg-gradient-to-r from-blue to-teal rounded-full transition-all duration-500 ${
                isScrolled ? '-bottom-0.5 h-0.5' : '-bottom-1 h-0.5'
              }`} style={{ width: '100%' }}>
                <div className="w-full h-full bg-gradient-to-r from-blue to-teal rounded-full animate-pulse" />
              </div>
            )}
            {!isActive('/pricing') && (
              <div className={`absolute bg-gradient-to-r from-blue to-teal rounded-full scale-x-0 group-hover:scale-x-100 transition-all duration-500 origin-left opacity-60 group-hover:opacity-100 ${
                isScrolled ? '-bottom-0.5 h-0.5' : '-bottom-1 h-0.5'
              }`} style={{ width: '100%' }} />
            )}
          </Link>
          <Link
            href="/case"
            className={`transition-all duration-220 relative group ${
              isScrolled ? 'text-sm' : 'text-body'
            } ${
              isActive('/case') 
                ? 'text-ink font-medium drop-shadow-sm' 
                : 'text-ink-dim hover:text-ink'
            }`}
            style={{
              transform: isScrolled ? `translateY(${scrollProgress * -2}px)` : 'translateY(0)',
              transition: 'transform 0.1s ease-out'
            }}
          >
            Case
            {isActive('/case') && (
              <div className={`absolute bg-gradient-to-r from-blue to-teal rounded-full transition-all duration-500 ${
                isScrolled ? '-bottom-0.5 h-0.5' : '-bottom-1 h-0.5'
              }`} style={{ width: '100%' }}>
                <div className="w-full h-full bg-gradient-to-r from-blue to-teal rounded-full animate-pulse" />
              </div>
            )}
            {!isActive('/case') && (
              <div className={`absolute bg-gradient-to-r from-blue to-teal rounded-full scale-x-0 group-hover:scale-x-100 transition-all duration-500 origin-left opacity-60 group-hover:opacity-100 ${
                isScrolled ? '-bottom-0.5 h-0.5' : '-bottom-1 h-0.5'
              }`} style={{ width: '100%' }} />
            )}
          </Link>
          {showStyleguide && (
            <Link
              href="/styleguide"
              className={`transition-all duration-220 relative group ${
                isScrolled ? 'text-sm' : 'text-body'
              } ${
                isActive('/styleguide') 
                  ? 'text-ink font-medium drop-shadow-sm' 
                  : 'text-ink-dim hover:text-ink'
              }`}
              style={{
                transform: isScrolled ? `translateY(${scrollProgress * -2}px)` : 'translateY(0)',
                transition: 'transform 0.1s ease-out'
              }}
            >
              Styleguide
              {isActive('/styleguide') && (
                <div className={`absolute bg-gradient-to-r from-blue to-teal rounded-full transition-all duration-500 ${
                  isScrolled ? '-bottom-0.5 h-0.5' : '-bottom-1 h-0.5'
                }`} style={{ width: '100%' }}>
                  <div className="w-full h-full bg-gradient-to-r from-blue to-teal rounded-full animate-pulse" />
                </div>
              )}
              {!isActive('/styleguide') && (
                <div className={`absolute bg-gradient-to-r from-blue to-teal rounded-full scale-x-0 group-hover:scale-x-100 transition-all duration-500 origin-left opacity-60 group-hover:opacity-100 ${
                  isScrolled ? '-bottom-0.5 h-0.5' : '-bottom-1 h-0.5'
                }`} style={{ width: '100%' }} />
              )}
            </Link>
          )}
        </nav>
        
        {/* CTA Button */}
        <div className="flex items-center gap-4">
          <Button 
            variant="primary" 
            size={isScrolled ? "sm" : "md"}
            href="/booking"
            data-cta="header-cta"
            className="transition-all duration-500"
          >
            Boka demo
          </Button>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-300"
            aria-label="Toggle mobile menu"
          >
            <div className="relative w-5 h-5">
              <span className={`absolute top-0 left-0 w-5 h-0.5 bg-ink transform transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-2' : 'translate-y-0'
              }`} />
              <span className={`absolute top-2 left-0 w-5 h-0.5 bg-ink transform transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`} />
              <span className={`absolute top-4 left-0 w-5 h-0.5 bg-ink transform transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : 'translate-y-0'
              }`} />
            </div>
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={`lg:hidden absolute top-full left-0 right-0 bg-surface/95 backdrop-blur-xl border-b border-white/20 transition-all duration-500 ${
        isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <nav className="container-bk py-6 space-y-4">
          <Link
            href="/maps"
            onClick={closeMobileMenu}
            className={`block py-3 px-4 rounded-lg transition-all duration-300 ${
              isActive('/maps') 
                ? 'bg-blue/20 text-blue border border-blue/30' 
                : 'text-ink-dim hover:bg-white/10 hover:text-ink'
            }`}
          >
            Maps
          </Link>
          <Link
            href="/bookings"
            onClick={closeMobileMenu}
            className={`block py-3 px-4 rounded-lg transition-all duration-300 ${
              isActive('/bookings') 
                ? 'bg-blue/20 text-blue border border-blue/30' 
                : 'text-ink-dim hover:bg-white/10 hover:text-ink'
            }`}
          >
            Bookings
          </Link>
          <Link
            href="/reviews"
            onClick={closeMobileMenu}
            className={`block py-3 px-4 rounded-lg transition-all duration-300 ${
              isActive('/reviews') 
                ? 'bg-blue/20 text-blue border border-blue/30' 
                : 'text-ink-dim hover:bg-white/10 hover:text-ink'
            }`}
          >
            Reviews
          </Link>
          <Link
            href="/pricing"
            onClick={closeMobileMenu}
            className={`block py-3 px-4 rounded-lg transition-all duration-300 ${
              isActive('/pricing') 
                ? 'bg-blue/20 text-blue border border-blue/30' 
                : 'text-ink-dim hover:bg-white/10 hover:text-ink'
            }`}
          >
            Priser
          </Link>
          <Link
            href="/case"
            onClick={closeMobileMenu}
            className={`block py-3 px-4 rounded-lg transition-all duration-300 ${
              isActive('/case') 
                ? 'bg-blue/20 text-blue border border-blue/30' 
                : 'text-ink-dim hover:bg-white/10 hover:text-ink'
            }`}
          >
            Case
          </Link>
          {showStyleguide && (
            <Link
              href="/styleguide"
              onClick={closeMobileMenu}
              className={`block py-3 px-4 rounded-lg transition-all duration-300 ${
                isActive('/styleguide') 
                  ? 'bg-blue/20 text-blue border border-blue/30' 
                  : 'text-ink-dim hover:bg-white/10 hover:text-ink'
              }`}
            >
              Styleguide
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
