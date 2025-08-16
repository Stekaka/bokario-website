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
import { MapsROICalculator } from "@/components/calculators/MapsROICalculator";

export default function MapsPage() {
  const mapsFeatures = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Lokal SEO-optimering',
      description: 'Vi optimerar din Google My Business-profil för att synas först i lokala sökningar.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Ranking-övervakning',
      description: 'Kontinuerlig övervakning av din position i Google Maps och lokala sökningar.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Snabb resultat',
      description: 'Se förbättringar inom 30 dagar med vår beprövade Maps-optimering.'
    }
  ];

  const mapsProcess = [
    {
      number: 1,
      title: 'Analys',
      description: 'Vi analyserar din nuvarande Maps-position och identifierar förbättringsmöjligheter.'
    },
    {
      number: 2,
      title: 'Optimering',
      description: 'Vi optimerar din Google My Business-profil med rätt nyckelord och innehåll.'
    },
    {
      number: 3,
      title: 'Resultat',
      description: 'Du ser ökad synlighet och fler kunder från Google Maps inom 30 dagar.'
    }
  ];

  const mapsPricing = [
    {
      name: 'Starter',
      price: '2,995',
      period: '/månad',
      description: 'Perfekt för mindre företag som vill komma igång med Maps-optimering.',
      features: [
        'Google My Business-optimering',
        'Månadsrapport',
        'Grundläggande support',
        'Nyckelordsoptimering'
      ],
      cta: {
        label: 'Starta nu',
        href: '/#kontakt'
      }
    },
    {
      name: 'Professional',
      price: '4,995',
      period: '/månad',
      description: 'Vår mest populära lösning med avancerad optimering och support.',
      features: [
        'Allt i Starter',
        'Avancerad nyckelordsoptimering',
        'Veckorapport',
        'Prioriterad support',
        'Konkurrentsanalys',
        'Lokal SEO-strategi'
      ],
      recommended: true,
      cta: {
        label: 'Välj Professional',
        href: '/#kontakt'
      }
    },
    {
      name: 'Enterprise',
      price: '7,995',
      period: '/månad',
      description: 'Fullständig Maps-optimering för stora företag med flera platser.',
      features: [
        'Allt i Professional',
        'Flera platser',
        'Daglig övervakning',
        'Dedikerad strateg',
        'Månadsstrategimöte',
        'Custom rapporter'
      ],
      cta: {
        label: 'Kontakta oss',
        href: '/#kontakt'
      }
    }
  ];

  const mapsFAQ = [
    {
      question: 'Hur lång tid tar det att se resultat?',
      answer: 'De flesta av våra kunder ser förbättringar inom 30 dagar. Vissa ser resultat redan efter 2 veckor.'
    },
    {
      question: 'Vad ingår i Maps-optimering?',
      answer: 'Vi optimerar din Google My Business-profil, nyckelord, beskrivningar, bilder och säkerställer att all information är korrekt och aktuell.'
    },
    {
      question: 'Kan ni hjälpa med flera platser?',
      answer: 'Absolut! Vi har specialiserat oss på att hantera flera platser för stora företag med vårt Enterprise-paket.'
    },
    {
      question: 'Hur mäter ni framgång?',
      answer: 'Vi spårar din position i Google Maps, antal visningar, klick och samtal som genereras från Maps.'
    }
  ];

  return (
    <main id="main">
      <Hero
        title="Dominera Google Maps."
        sub="Vi hjälper dig att synas först när kunder söker efter dina tjänster i ditt område. Öka din synlighet och få fler kunder från Maps."
        align="center"
        trustText="Trusted by 500+ Swedish businesses for Maps optimization"
        ctas={
          <>
            <Button variant="primary" size="lg" href="/#kontakt">
              Boka gratis Maps-konsultation
            </Button>
            <Button variant="ghost" size="lg" href="/#tjanster">
              Se våra Maps-tjänster
            </Button>
          </>
        }
      />

      {/* Maps ROI Stats */}
      <MeasurableResults />

      {/* Maps Features */}
      <FeatureList
        features={mapsFeatures}
        title="Varför välja vår Maps-optimering?"
        subtitle="Vi kombinerar lokal SEO-expertis med beprövade strategier för att få dig att synas först i Google Maps."
      />

      {/* Maps Process */}
      <Process
        steps={mapsProcess}
        title="Så optimerar vi din Maps-position"
        subtitle="En enkel 3-stegs process som ger resultat"
      />

      {/* Maps ROI Calculator */}
      <section className="section bg-surface">
        <div className="container-bk">
          <div className="text-center mb-12">
            <h2 className="font-display text-h2 text-ink mb-4">Beräkna din Maps-ROI</h2>
            <p className="lede mx-auto">
              Se hur mycket Maps-optimering kan öka din verksamhet
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <MapsROICalculator />
          </div>
        </div>
      </section>

      {/* Maps Pricing */}
      <Pricing
        tiers={mapsPricing}
        title="Välj ditt Maps-paket"
        subtitle="Flexibla priser som växer med ditt företag"
      />

      {/* Maps FAQ */}
      <FAQ
        items={mapsFAQ}
        title="Vanliga frågor om Maps-optimering"
        subtitle="Svar på de vanligaste frågorna om vår Maps-tjänst"
      />

      {/* Maps CTA */}
      <CTA
        title="Redo att dominera Google Maps?"
        subtitle="Boka en gratis konsultation idag och låt oss diskutera hur vi kan hjälpa dig att synas först i Maps."
        ctas={
          <>
            <Button variant="primary" size="lg" href="/#kontakt">
              Boka gratis Maps-konsultation
            </Button>
            <Button variant="ghost" size="lg" href="/#tjanster">
              Läs mer om våra tjänster
            </Button>
          </>
        }
      />
    </main>
  );
}
