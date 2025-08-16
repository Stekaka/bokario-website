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
import { ReviewsROICalculator } from "@/components/calculators/ReviewsROICalculator";

export default function ReviewsPage() {
  const reviewsFeatures = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      title: 'Automatisk recensionshantering',
      description: 'Vi samlar automatiskt in recensioner från dina kunder och hanterar svaren för att bygga förtroende.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'SEO-optimering',
      description: 'Recensioner förbättrar din lokala SEO och gör att du syns högre upp i Google-sökningar.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Snabb påverkan',
      description: 'Se förbättringar i din synlighet och konvertering inom 14 dagar med vår recensionsstrategi.'
    }
  ];

  const reviewsProcess = [
    {
      number: 1,
      title: 'Strategi',
      description: 'Vi utvecklar en skräddarsydd strategi för att samla in recensioner från dina nöjda kunder.'
    },
    {
      number: 2,
      title: 'Implementation',
      description: 'Vi implementerar automatiska system för att samla in och hantera recensioner.'
    },
    {
      number: 3,
      title: 'Optimering',
      description: 'Kontinuerlig optimering av recensionsstrategin för att maximera din synlighet.'
    }
  ];

  const reviewsPricing = [
    {
      name: 'Starter',
      price: '1,495',
      period: '/månad',
      description: 'Perfekt för mindre företag som vill komma igång med recensionshantering.',
      features: [
        'Grundläggande recensionshantering',
        'Upp till 50 recensioner/månad',
        'E-post support',
        'Grundläggande rapporter',
        'Google My Business-integration'
      ],
      cta: {
        label: 'Starta nu',
        href: '/#kontakt'
      }
    },
    {
      name: 'Professional',
      price: '2,995',
      period: '/månad',
      description: 'Vår mest populära lösning med avancerad recensionshantering och support.',
      features: [
        'Allt i Starter',
        'Obegränsade recensioner',
        'Automatisk recensionssamling',
        'Avancerade rapporter',
        'Prioriterad support',
        'Multi-plattform support',
        'Kundkommunikation'
      ],
      recommended: true,
      cta: {
        label: 'Välj Professional',
        href: '/#kontakt'
      }
    },
    {
      name: 'Enterprise',
      price: '4,995',
      period: '/månad',
      description: 'Fullständig recensionslösning för stora företag med flera platser.',
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

  const reviewsFAQ = [
    {
      question: 'Hur snabbt kan jag se resultat?',
      answer: 'De flesta av våra kunder ser förbättringar inom 14 dagar. Recensioner påverkar din SEO omedelbart.'
    },
    {
      question: 'Vad händer med negativa recensioner?',
      answer: 'Vi hjälper dig att hantera negativa recensioner professionellt och konvertera dem till positiva upplevelser.'
    },
    {
      question: 'Kan ni hjälpa med flera platser?',
      answer: 'Absolut! Vi har specialiserat oss på att hantera flera platser för stora företag med vårt Enterprise-paket.'
    },
    {
      question: 'Hur mäter ni framgång?',
      answer: 'Vi spårar antal recensioner, genomsnittsbetyg, SEO-förbättringar och ökning av synlighet.'
    }
  ];

  return (
    <main id="main">
      <Hero
        title="Bygg förtroende med recensioner."
        sub="Automatisera din recensionshantering och låt dina nöjda kunder hjälpa dig att synas först i sökningar. Öka din synlighet och konvertering med äkta kundrecensioner."
        align="center"
        trustText="Trusted by 400+ Swedish businesses for review management"
        ctas={
          <>
            <Button variant="primary" size="lg" href="/#kontakt">
              Boka gratis recensions-strategi
            </Button>
            <Button variant="ghost" size="lg" href="/#tjanster">
              Se våra recensionslösningar
            </Button>
          </>
        }
      />

      {/* Reviews Impact Stats */}
      <MeasurableResults />

      {/* Reviews Features */}
      <FeatureList
        features={reviewsFeatures}
        title="Varför välja vår recensionshantering?"
        subtitle="Vi kombinerar automatisk recensionssamling med strategisk hantering för att maximera din synlighet."
      />

      {/* Reviews Process */}
      <Process
        steps={reviewsProcess}
        title="Så bygger vi ditt förtroende med recensioner"
        subtitle="En enkel 3-stegs process som ger resultat"
      />

      {/* Reviews Impact Calculator */}
      <section className="section bg-surface">
        <div className="container-bk">
          <div className="text-center mb-12">
            <h2 className="font-display text-h2 text-ink mb-4">Beräkna din recensions-påverkan</h2>
            <p className="lede mx-auto">
              Se hur mycket recensioner kan öka din verksamhet
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <ReviewsROICalculator />
          </div>
        </div>
      </section>

      {/* Reviews Pricing */}
      <Pricing
        tiers={reviewsPricing}
        title="Välj ditt recensionspaket"
        subtitle="Flexibla priser som växer med ditt företag"
      />

      {/* Reviews FAQ */}
      <FAQ
        items={reviewsFAQ}
        title="Vanliga frågor om recensionshantering"
        subtitle="Svar på de vanligaste frågorna om våra recensionslösningar"
      />

      {/* Reviews CTA */}
      <CTA
        title="Redo att bygga förtroende med recensioner?"
        subtitle="Boka en gratis strategikonsultation idag och låt oss diskutera hur vi kan hjälpa dig att samla in fler recensioner."
        ctas={
          <>
            <Button variant="primary" size="lg" href="/#kontakt">
              Boka gratis recensions-strategi
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
