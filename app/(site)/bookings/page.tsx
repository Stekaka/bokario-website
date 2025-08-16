"use client";

import { Hero } from "@/components/Hero";
import { Button } from "@/components/Button";
import { Stat } from "@/components/Stat";
import { FeatureList } from "@/components/FeatureList";
import { Process } from "@/components/Process";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Card } from "@/components/Card";
import { MeasurableResults } from "@/components/MeasurableResults";
import { BookingsROICalculator } from "@/components/calculators/BookingsROICalculator";

export default function BookingsPage() {
  const bookingsFeatures = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Smart bokningskalender',
      description: 'Automatisk synkronisering med din kalender och intelligent tidsbokning som undviker dubbelbokningar.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      ),
      title: 'Automatisk betalning',
      description: 'Säker online-betalning med automatisk fakturering och kvitton för en smidig kundupplevelse.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Kundkommunikation',
      description: 'Automatiska påminnelser, bekräftelser och uppföljningar som ökar din kundnöjdhet.'
    }
  ];

  const bookingsProcess = [
    {
      number: 1,
      title: 'Setup',
      description: 'Vi konfigurerar ditt bokningssystem med din kalender, tjänster och priser.'
    },
    {
      number: 2,
      title: 'Integration',
      description: 'Vi integrerar med din hemsida och sociala medier för maximal synlighet.'
    },
    {
      number: 3,
      title: 'Optimering',
      description: 'Kontinuerlig optimering av bokningsflödet för att maximera konverteringar.'
    }
  ];

  const bookingsPricing = [
    {
      name: 'Starter',
      price: '1,995',
      period: '/månad',
      description: 'Perfekt för mindre företag som vill komma igång med online-bokningar.',
      features: [
        'Grundläggande bokningskalender',
        'Upp till 100 bokningar/månad',
        'E-post support',
        'Grundläggande rapporter',
        'Mobil-optimerad'
      ],
      cta: {
        label: 'Starta nu',
        href: '/#kontakt'
      }
    },
    {
      name: 'Professional',
      price: '3,995',
      period: '/månad',
      description: 'Vår mest populära lösning med avancerade funktioner och support.',
      features: [
        'Allt i Starter',
        'Obegränsade bokningar',
        'Automatisk betalning',
        'Avancerade rapporter',
        'Prioriterad support',
        'Kundkommunikation',
        'API-integration'
      ],
      recommended: true,
      cta: {
        label: 'Välj Professional',
        href: '/#kontakt'
      }
    },
    {
      name: 'Enterprise',
      price: '5,995',
      period: '/månad',
      description: 'Fullständig bokningslösning för stora företag med komplexa behov.',
      features: [
        'Allt i Professional',
        'Flera platser',
        'White-label lösning',
        'Dedikerad support',
        'Custom integrationer',
        'Avancerad analytics',
        'SLA-garanti'
      ],
      cta: {
        label: 'Kontakta oss',
        href: '/#kontakt'
      }
    }
  ];

  const bookingsFAQ = [
    {
      question: 'Hur snabbt kan jag komma igång?',
      answer: 'Du kan komma igång med ditt bokningssystem inom 24 timmar. Vi hjälper dig med all setup och integration.'
    },
    {
      question: 'Kan jag använda min befintliga kalender?',
      answer: 'Absolut! Vi integrerar med Google Calendar, Outlook, Apple Calendar och de flesta andra kalendersystem.'
    },
    {
      question: 'Vad händer om jag inte är nöjd?',
      answer: 'Vi erbjuder en 30-dagars pengarna-tillbaka-garanti. Om du inte är nöjd, får du dina pengar tillbaka.'
    },
    {
      question: 'Kan ni hjälpa med integration på min hemsida?',
      answer: 'Ja! Vi hjälper dig att integrera bokningssystemet på din hemsida, Facebook, Instagram och andra kanaler.'
    }
  ];

  return (
    <main id="main">
      <Hero
        title="Konvertera besökare till bokningar."
        sub="Automatisera ditt bokningsflöde med smarta kalendrar, online-betalningar och kundkommunikation. Öka din konvertering och spara tid."
        align="center"
        trustText="Trusted by 300+ Swedish businesses for booking automation"
        ctas={
          <>
            <Button variant="primary" size="lg" href="/#kontakt">
              Boka gratis boknings-demo
            </Button>
            <Button variant="ghost" size="lg" href="/#tjanster">
              Se våra bokningslösningar
            </Button>
          </>
        }
      />

      {/* Bookings Conversion Stats */}
      <MeasurableResults />

      {/* Bookings Features */}
      <FeatureList
        features={bookingsFeatures}
        title="Varför välja vårt bokningssystem?"
        subtitle="Vi kombinerar enkelhet med kraftfulla funktioner för att maximera din bokningskonvertering."
      />

      {/* Bookings Process */}
      <Process
        steps={bookingsProcess}
        title="Så implementerar vi ditt bokningssystem"
        subtitle="En enkel 3-stegs process som ger resultat"
      />

      {/* Bookings Conversion Calculator */}
      <section className="section bg-surface">
        <div className="container-bk">
          <div className="text-center mb-12">
            <h2 className="font-display text-h2 text-ink mb-4">Beräkna din boknings-ROI</h2>
            <p className="lede mx-auto">
              Se hur mycket ett bokningssystem kan öka din verksamhet
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <BookingsROICalculator />
          </div>
        </div>
      </section>

      {/* Bookings Pricing */}
      <Pricing
        tiers={bookingsPricing}
        title="Välj ditt bokningspaket"
        subtitle="Flexibla priser som växer med ditt företag"
      />

      {/* Bookings FAQ */}
      <FAQ
        items={bookingsFAQ}
        title="Vanliga frågor om bokningssystem"
        subtitle="Svar på de vanligaste frågorna om våra bokningslösningar"
      />

      {/* Bookings CTA */}
      <CTA
        title="Redo att automatisera dina bokningar?"
        subtitle="Boka en gratis demo idag och låt oss visa hur vi kan hjälpa dig att öka din bokningskonvertering."
        ctas={
          <>
            <Button variant="primary" size="lg" href="/#kontakt">
              Boka gratis boknings-demo
            </Button>
            <Button variant="ghost" size="lg" href="/#tjanster">
              Läs mer om våra lösningar
            </Button>
          </>
        }
      />
    </main>
  );
}
