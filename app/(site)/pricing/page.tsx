"use client";

import { Hero } from "@/components/Hero";
import { Button } from "@/components/Button";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Card } from "@/components/Card";
import { ScrollProgressBar } from "@/components/ProgressBar";
import { ScrollToTop } from "@/components/SmoothScroll";

import { MeasurableResults } from "@/components/MeasurableResults";
import { 
  ParallaxSection, 
  FloatingElement, 
  MagneticElement, 
  TextReveal, 
  GradientText, 
  Card3D,
  StaggeredContainer 
} from "@/components/AdvancedAnimations";
import { useEffect, useRef, useState } from "react";

export default function PricingPage() {
  const mapsSectionRef = useRef<HTMLDivElement>(null);
  const bookingsSectionRef = useRef<HTMLDivElement>(null);
  const reviewsSectionRef = useRef<HTMLDivElement>(null);
  const bundleSectionRef = useRef<HTMLDivElement>(null);
  const faqSectionRef = useRef<HTMLDivElement>(null);

  const allServicesPricing = [
    {
      name: 'Maps Starter',
      price: '2,995',
      period: '/månad',
      description: 'Grundläggande Google Maps-optimering för mindre företag.',
      features: [
        'Google My Business-optimering',
        'Månadsrapport',
        'Grundläggande support',
        'Nyckelordsoptimering'
      ],
      service: 'maps',
      cta: {
        label: 'Välj Maps Starter',
        href: '/maps'
      }
    },
    {
      name: 'Maps Professional',
      price: '4,995',
      period: '/månad',
      description: 'Avancerad Maps-optimering med prioriterad support.',
      features: [
        'Allt i Maps Starter',
        'Avancerad nyckelordsoptimering',
        'Veckorapport',
        'Prioriterad support',
        'Konkurrentsanalys',
        'Lokal SEO-strategi'
      ],
      service: 'maps',
      recommended: true,
      cta: {
        label: 'Välj Maps Professional',
        href: '/maps'
      }
    },
    {
      name: 'Maps Enterprise',
      price: '7,995',
      period: '/månad',
      description: 'Fullständig Maps-optimering för stora företag.',
      features: [
        'Allt i Maps Professional',
        'Flera platser',
        'Daglig övervakning',
        'Dedikerad strateg',
        'Månadsstrategimöte',
        'Custom rapporter'
      ],
      service: 'maps',
      cta: {
        label: 'Kontakta oss',
        href: '/#kontakt'
      }
    }
  ];

  const bookingsPricing = [
    {
      name: 'Bookings Starter',
      price: '1,995',
      period: '/månad',
      description: 'Grundläggande bokningssystem för mindre företag.',
      features: [
        'Grundläggande bokningskalender',
        'Upp till 100 bokningar/månad',
        'E-post support',
        'Grundläggande rapporter',
        'Mobil-optimerad'
      ],
      service: 'bookings',
      cta: {
        label: 'Välj Bookings Starter',
        href: '/bookings'
      }
    },
    {
      name: 'Bookings Professional',
      price: '3,995',
      period: '/månad',
      description: 'Avancerat bokningssystem med automatisk betalning.',
      features: [
        'Allt i Bookings Starter',
        'Obegränsade bokningar',
        'Automatisk betalning',
        'Avancerade rapporter',
        'Prioriterad support',
        'Kundkommunikation',
        'API-integration'
      ],
      service: 'bookings',
      recommended: true,
      cta: {
        label: 'Välj Bookings Professional',
        href: '/bookings'
      }
    },
    {
      name: 'Bookings Enterprise',
      price: '5,995',
      period: '/månad',
      description: 'Fullständigt bokningssystem för stora företag.',
      features: [
        'Allt i Bookings Professional',
        'Flera platser',
        'White-label lösning',
        'Dedikerad support',
        'Custom integrationer',
        'Avancerad analytics',
        'SLA-garanti'
      ],
      service: 'bookings',
      cta: {
        label: 'Kontakta oss',
        href: '/#kontakt'
      }
    }
  ];

  const reviewsPricing = [
    {
      name: 'Reviews Starter',
      price: '1,495',
      period: '/månad',
      description: 'Grundläggande recensionshantering för mindre företag.',
      features: [
        'Grundläggande recensionshantering',
        'Upp till 50 recensioner/månad',
        'E-post support',
        'Grundläggande rapporter',
        'Google My Business-integration'
      ],
      service: 'reviews',
      cta: {
        label: 'Välj Reviews Starter',
        href: '/reviews'
      }
    },
    {
      name: 'Reviews Professional',
      price: '2,995',
      period: '/månad',
      description: 'Avancerad recensionshantering med automatisk samling.',
      features: [
        'Allt i Reviews Starter',
        'Obegränsade recensioner',
        'Automatisk recensionssamling',
        'Avancerade rapporter',
        'Prioriterad support',
        'Multi-plattform support',
        'Kundkommunikation'
      ],
      service: 'reviews',
      recommended: true,
      cta: {
        label: 'Välj Reviews Professional',
        href: '/reviews'
      }
    },
    {
      name: 'Reviews Enterprise',
      price: '4,995',
      period: '/månad',
      description: 'Fullständig recensionslösning för stora företag.',
      features: [
        'Allt i Reviews Professional',
        'Flera platser',
        'White-label lösning',
        'Dedikerad support',
        'Custom integrationer',
        'Avancerad analytics',
        'SLA-garanti'
      ],
      service: 'reviews',
      cta: {
        label: 'Kontakta oss',
        href: '/#kontakt'
      }
    }
  ];

  const pricingFAQ = [
    {
      question: 'Kan jag kombinera olika tjänster?',
      answer: 'Absolut! Vi erbjuder rabatterade paket när du väljer flera tjänster. Kontakta oss för en skräddarsydd lösning.'
    },
    {
      question: 'Finns det setup-avgifter?',
      answer: 'Nej, alla våra månadspriser inkluderar setup och onboarding utan extra kostnader.'
    },
    {
      question: 'Kan jag avbryta när som helst?',
      answer: 'Ja, du kan avbryta din prenumeration när som helst. Vi erbjuder också en 30-dagars pengarna-tillbaka-garanti.'
    },
    {
      question: 'Vad ingår i supporten?',
      answer: 'Alla paket inkluderar e-post support. Professional och Enterprise inkluderar prioriterad support, och Enterprise inkluderar dedikerad support.'
    },
    {
      question: 'Kan ni hjälpa med flera platser?',
      answer: 'Ja! Vi har specialiserade paket för företag med flera platser. Kontakta oss för en skräddarsydd lösning.'
    }
  ];

  return (
    <main id="main" className="bg-black">
      {/* Scroll Progress Bar */}
      <ScrollProgressBar />
      
      <Hero
        title={
          <TextReveal direction="up">
            <GradientText colors={['from-blue', 'via-teal', 'to-purple']}>
              Transparenta priser för alla behov.
            </GradientText>
          </TextReveal>
        }
        sub={
          <TextReveal direction="up" className="delay-300">
            Välj det paket som passar ditt företag bäst. Alla priser inkluderar setup, support och kontinuerlig optimering.
          </TextReveal>
        }
        align="center"
        trustText={
          <FloatingElement delay={0.5}>
            Inga dolda kostnader, inga setup-avgifter
          </FloatingElement>
        }
        ctas={
          <StaggeredContainer staggerDelay={0.2}>
            <MagneticElement>
              <Button variant="primary" size="lg" href="/booking">
                Boka gratis konsultation
              </Button>
            </MagneticElement>
            <MagneticElement>
              <Button variant="ghost" size="lg" href="/#tjanster">
                Se våra tjänster
              </Button>
            </MagneticElement>
          </StaggeredContainer>
        }
      />

      <MeasurableResults />

      {/* Maps Pricing */}
      <section ref={mapsSectionRef} className="relative py-16 lg:py-24">
        {/* Background blend from black to gray - goes full width */}
        <div className="absolute inset-0 w-full bg-gradient-to-b from-transparent via-black/5 to-black/15"></div>
        
        <div className="relative">
          <div className="container-bk">
            <div className="text-center mb-16">
              <TextReveal direction="up">
                <h2 className="font-display text-h2 text-ink mb-6">
                  <GradientText colors={['from-blue', 'to-teal']}>
                    Google Maps-optimering
                  </GradientText>
                </h2>
              </TextReveal>
              <TextReveal direction="up" className="delay-200">
                <p className="lede mx-auto max-w-3xl">
                  Dominera Google Maps med optimerade företagsprofiler som syns först när kunder söker
                </p>
              </TextReveal>
            </div>

            <Pricing
              tiers={allServicesPricing}
              title=""
              subtitle=""
            />
          </div>
        </div>
      </section>

      {/* Bookings Pricing */}
      <section ref={bookingsSectionRef} className="relative py-16 lg:py-24">
        {/* Background blend from black to gray - goes full width */}
        <div className="absolute inset-0 w-full bg-gradient-to-b from-transparent via-black/8 to-black/20"></div>
        
        <div className="relative">
          <div className="container-bk">
            <div className="text-center mb-16">
              <h2 className="font-display text-h2 text-ink mb-6">Bokningssystem</h2>
              <p className="lede mx-auto max-w-3xl">
                Automatisera ditt bokningsflöde med smarta kalendrar och online-betalningar
              </p>
            </div>

            <Pricing
              tiers={bookingsPricing}
              title=""
              subtitle=""
            />
          </div>
        </div>
      </section>

      {/* Reviews Pricing */}
      <section ref={reviewsSectionRef} className="relative py-16 lg:py-24">
        {/* Background blend from black to gray - goes full width */}
        <div className="absolute inset-0 w-full bg-gradient-to-b from-transparent via-black/5 to-black/15"></div>
        
        <div className="relative">
          <div className="container-bk">
            <div className="text-center mb-16">
              <h2 className="font-display text-h2 text-ink mb-6">Recensionshantering</h2>
              <p className="lede mx-auto max-w-3xl">
                Bygg förtroende med automatisk recensionshantering som ökar din synlighet
              </p>
            </div>

            <Pricing
              tiers={reviewsPricing}
              title=""
              subtitle=""
            />
          </div>
        </div>
      </section>

      {/* Bundle Pricing */}
      <section ref={bundleSectionRef} className="relative py-16 lg:py-24">
        {/* Background blend from black to gray - goes full width */}
        <div className="absolute inset-0 w-full bg-gradient-to-b from-transparent via-black/6 to-black/18"></div>
        
        <div className="relative">
          <div className="container-bk">
            <div className="text-center mb-16">
              <TextReveal direction="up">
                <h2 className="font-display text-h2 text-ink mb-6">
                  <GradientText colors={['from-gold', 'via-orange', 'to-yellow']}>
                    Komplett paket
                  </GradientText>
                </h2>
              </TextReveal>
              <TextReveal direction="up" className="delay-200">
                <p className="lede mx-auto max-w-3xl">
                  Få alla tre tjänster i ett komplett paket med rabatterade priser
                </p>
              </TextReveal>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="p-10 bg-gradient-to-br from-white/[0.02] to-white/[0.04] backdrop-blur-xl border border-white/[0.06] hover:border-white/[0.12] transition-all duration-700 hover:shadow-2xl hover:shadow-black/20"
                   style={{ borderRadius: '2rem' }}>
                <div className="text-center mb-10">
                  <div className="inline-flex items-center gap-3 px-6 py-3 text-sm text-gold bg-gradient-to-r from-gold/[0.08] to-yellow/[0.08] border border-gold/[0.15] backdrop-blur-sm mb-6 font-light"
                       style={{ borderRadius: '2rem' }}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    Bästa värdet
                  </div>
                  
                  <h3 className="text-h2 text-ink mb-4 font-light">Komplett paket - Alla tjänster</h3>
                  
                  <div className="text-5xl font-light text-ink mb-4">
                    <span className="text-3xl text-ink-dim line-through mr-4">24,975 kr</span>
                    <GradientText colors={['from-green', 'to-emerald']}>
                      19,980 kr
                    </GradientText>
                  </div>
                  
                  <p className="text-lg text-ink-dim mb-8 font-light">per månad (spara 20%)</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-10">
                  <div className="text-center p-6 bg-gradient-to-br from-white/[0.02] to-white/[0.04] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 font-light"
                       style={{ borderRadius: '1.5rem' }}>
                    <div className="text-xl text-ink mb-2 font-light">Maps Professional</div>
                    <div className="text-sm text-ink-dim">Normalt 4,995 kr/månad</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-white/[0.02] to-white/[0.04] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 font-light"
                       style={{ borderRadius: '1.5rem' }}>
                    <div className="text-xl text-ink mb-2 font-light">Bookings Professional</div>
                    <div className="text-sm text-ink-dim">Normalt 3,995 kr/månad</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-white/[0.02] to-white/[0.04] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-500 font-light"
                       style={{ borderRadius: '1.5rem' }}>
                    <div className="text-xl text-ink mb-2 font-light">Reviews Professional</div>
                    <div className="text-sm text-ink-dim">Normalt 2,995 kr/månad</div>
                  </div>
                </div>

                <div className="text-center">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    href="/booking"
                    className="bg-gradient-to-r from-gold to-orange hover:from-gold/90 hover:to-orange/90 text-ink font-light px-10 py-4 text-lg shadow-2xl hover:shadow-3xl transition-all duration-500"
                  >
                    Boka gratis konsultation
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing FAQ */}
      <div ref={faqSectionRef}>
        <FAQ
          items={pricingFAQ}
          title="Vanliga frågor om priser"
          subtitle="Svar på de vanligaste frågorna om våra priser och paket"
        />
      </div>

      {/* Pricing CTA */}
      <CTA
        title="Redo att komma igång?"
        subtitle="Boka en gratis konsultation idag och låt oss diskutera vilket paket som passar ditt företag bäst."
        ctas={
          <>
            <Button variant="primary" size="lg" href="/booking">
              Boka gratis konsultation
            </Button>
            <Button variant="ghost" size="lg" href="/#tjanster">
              Läs mer om våra tjänster
            </Button>
            {/* Test link */}
            <a href="/booking" className="text-blue hover:text-teal underline">
              Test länk till /booking
            </a>
            <a href="/test-booking" className="text-green hover:text-emerald underline">
              Test länk till /test-booking
            </a>
          </>
        }
      />

      {/* Scroll to Top Button */}
      <ScrollToTop />


    </main>
  );
}
