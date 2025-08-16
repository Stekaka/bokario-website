"use client";

import { Hero } from '@/components/Hero';
import { Button } from '@/components/Button';
import { FeatureList } from '@/components/FeatureList';
import { Process } from '@/components/Process';
import { CTA } from '@/components/CTA';
import { LogoRow } from '@/components/LogoRow';
import { MeasurableResults } from '@/components/MeasurableResults';

export default function HomePage() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: 'Synlighet (Maps)',
      description: 'Dominera Google Maps med optimerade företagsprofiler som syns först när kunder söker.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      title: 'Rykte (Reviews)',
      description: 'Bygg förtroende med äkta kundrecensioner som ökar din synlighet och konverteringsgrad.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Bokningar (Bookings)',
      description: 'Konvertera besökare till bokningar med optimerade bokningsflöden och kalenderintegration.'
    }
  ];

  const processSteps = [
    {
      number: 1,
      title: 'Starta',
      description: 'Vi analyserar din nuvarande situation och skapar en skräddarsydd strategi för att uppnå dina mål.'
    },
    {
      number: 2,
      title: 'Setup',
      description: 'Vårt team implementerar strategin med precision och omsorg för att maximera resultaten.'
    },
    {
      number: 3,
      title: 'Resultat',
      description: 'Vi övervakar, analyserar och optimerar kontinuerligt för att säkerställa att du får de bästa resultaten.'
    }
  ];

  return (
    <main id="main">
      <Hero
        title="Från klick till kalender."
        sub="Vi sköter kartan, omdömena och bokningarna åt dig – mätbara resultat utan krångel."
        align="center"
        trustText="Trusted by 500+ Swedish businesses"
        ctas={
          <>
            <Button variant="primary" size="lg" href="/booking">
              Boka demo
            </Button>
            <Button variant="ghost" size="lg" href="/#tjanster">
              Se våra tjänster
            </Button>
          </>
        }
      />

      <LogoRow />

      <MeasurableResults />

      <section id="tjanster" className="section">
        <FeatureList
          features={features}
          title="Tre pelare för framgång"
          subtitle="Vi hjälper dig att bygga en komplett digital närvaro som genererar resultat"
        />
      </section>

      <Process
        steps={processSteps}
        title="Så fungerar det"
        subtitle="En enkel process från start till resultat"
      />

      <CTA
        title="Redo att ta ditt företag till nästa nivå?"
        subtitle="Boka en gratis konsultation idag och låt oss diskutera hur vi kan hjälpa dig att uppnå dina mål."
        ctas={
          <>
            <Button variant="primary" size="lg" href="/booking">
              Boka gratis konsultation
            </Button>
            <Button variant="ghost" size="lg" href="/#tjanster">
              Läs mer
            </Button>
          </>
        }
      />

      {/* Contact Section */}
      <section id="kontakt" className="section bg-surface/30">
        <div className="container-bk">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-ink mb-4">Kontakta oss</h2>
            <p className="text-lg text-ink-dim max-w-2xl mx-auto">
              Redo att komma igång? Låt oss diskutera hur vi kan hjälpa dig att uppnå dina mål.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-surface/50 border border-white/10 rounded-card p-8">
              <h3 className="text-xl font-semibold text-ink mb-4">Boka Demo</h3>
              <p className="text-ink-dim mb-6">
                Se hur våra lösningar fungerar i praktiken med en personlig demo.
              </p>
              <Button variant="primary" size="lg" href="/booking">
                Boka Demo
              </Button>
            </div>
            
            <div className="bg-surface/50 border border-white/10 rounded-card p-8">
              <h3 className="text-xl font-semibold text-ink mb-4">Kontakt</h3>
              <p className="text-ink-dim mb-6">
                Har du frågor? Vi finns här för att hjälpa dig.
              </p>
              <div className="space-y-2 text-ink-dim">
                <p>📧 hej@bokario.se</p>
                <p>📱 +46-70-123-45-67</p>
                <p>📍 Stockholm, Sverige</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

