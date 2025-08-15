import { Page } from '@/components/Page'
import { Hero } from '@/components/sections/Hero'
import { LogoRow } from '@/components/LogoRow'
import { KPI } from '@/components/KPI'
import { FeatureList } from '@/components/sections/FeatureList'
import { Process } from '@/components/sections/Process'
import { Testimonial } from '@/components/sections/Testimonial'
import { CTA } from '@/components/sections/CTA'

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
  ]

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
  ]

  const kpis = [
    {
      value: '+25%',
      label: 'Fler samtal',
      description: 'Genomsnittlig ökning av samtal från Maps',
      trend: { value: 25, isPositive: true }
    },
    {
      value: '+40%',
      label: 'Fler recensioner',
      description: 'Genomsnittlig ökning av recensioner',
      trend: { value: 40, isPositive: true }
    },
    {
      value: '+60%',
      label: 'Fler bokningar',
      description: 'Genomsnittlig ökning av bokningar',
      trend: { value: 60, isPositive: true }
    },
    {
      value: '4.8/5',
      label: 'Kundnöjdhet',
      description: 'Genomsnittligt kundbetyg',
      trend: { value: 96, isPositive: true }
    }
  ]

  return (
    <Page title="Bokario - Hem">
      <Hero
        tagline="Från klick till kalender."
        lead="Vi sköter kartan, omdömena och bokningarna åt dig – mätbara resultat utan krångel."
        primaryCTA={{
          label: 'Boka demo',
          href: '/#kontakt'
        }}
        secondaryCTA={{
          label: 'Se våra tjänster',
          href: '/#tjanster'
        }}
      />

      <LogoRow title="Företag som litar på oss">
        <div className="text-2xl font-bold text-ink-300">LOGO 1</div>
        <div className="text-2xl font-bold text-ink-300">LOGO 2</div>
        <div className="text-2xl font-bold text-ink-300">LOGO 3</div>
        <div className="text-2xl font-bold text-ink-300">LOGO 4</div>
        <div className="text-2xl font-bold text-ink-300">LOGO 5</div>
      </LogoRow>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink-950 mb-4">Mätbara resultat</h2>
            <p className="text-lg md:text-xl text-ink-700 max-w-[65ch] mx-auto">
              Våra kunder ser konkreta resultat inom 30 dagar
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, index) => (
              <KPI key={index} {...kpi} />
            ))}
          </div>
        </div>
      </section>

      <FeatureList
        features={features}
        title="Tre pelare för framgång"
        subtitle="Vi hjälper dig att bygga en komplett digital närvaro som genererar resultat"
      />

      <Process
        steps={processSteps}
        title="Så fungerar det"
        subtitle="En enkel process från start till resultat"
      />

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ink-950 mb-4">Kundberättelser</h2>
            <p className="text-lg md:text-xl text-ink-700 max-w-[65ch] mx-auto">
              Se vad våra kunder säger om resultaten
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Testimonial
              quote="Bokario hjälpte oss att öka våra bokningar med 40% på bara 2 månader. Fantastiskt team!"
              author="Anna Andersson"
              company="Frisörsalong Vackert"
              rating={5}
            />
            <Testimonial
              quote="Våra Google-reviews har ökat dramatiskt och vi får fler kunder än någonsin."
              author="Erik Eriksson"
              company="Bilverkstad Express"
              rating={5}
            />
            <Testimonial
              quote="Professionell service med mätbara resultat. Rekommenderas varmt!"
              author="Maria Nilsson"
              company="Städfirma Rent"
              rating={5}
            />
          </div>
        </div>
      </section>

      <CTA
        title="Redo att ta ditt företag till nästa nivå?"
        subtitle="Boka en gratis konsultation idag och låt oss diskutera hur vi kan hjälpa dig att uppnå dina mål."
        cta={{
          label: 'Boka gratis konsultation',
          href: '/#kontakt'
        }}
      />
    </Page>
  )
}
