import { Page } from '../../../components/Page'
import { Hero } from '../../../components/sections/Hero'
import { FeatureList } from '../../../components/sections/FeatureList'
import { Process } from '../../../components/sections/Process'
import { Pricing } from '../../../components/sections/Pricing'
import { FAQ } from '../../../components/sections/FAQ'
import { CTA } from '../../../components/sections/CTA'
import { MapsCallsEstimator } from '../../../components/calculators/MapsCallsEstimator'
import { KPI } from '../../../components/KPI'

export default function MapsPage() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: 'Google Business Profile',
      description: 'Fullständig optimering av din Google Business Profile för maximal synlighet i lokala sökningar.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        </svg>
      ),
      title: 'Lokalsignaler',
      description: 'Strategisk hantering av lokala signaler för att förbättra din ranking i Maps-sökningar.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      title: 'Omdömesflöde',
      description: 'Automatiskt system för att samla in och hantera kundrecensioner som stärker din synlighet.'
    }
  ]

  const processSteps = [
    {
      number: 1,
      title: 'Analys',
      description: 'Vi analyserar din nuvarande Google Maps-närvaro och identifierar förbättringsområden.'
    },
    {
      number: 2,
      title: 'Optimering',
      description: 'Fullständig optimering av din Business Profile med lokala SEO-strategier.'
    },
    {
      number: 3,
      title: 'Resultat',
      description: 'Kontinuerlig övervakning och optimering för att maximera din synlighet.'
    }
  ]

  const pricingTiers = [
    {
      name: 'Start',
      price: '2,500',
      period: 'månad',
      description: 'Perfekt för mindre företag som vill komma igång',
      features: [
        'Google Business Profile optimering',
        'Grundläggande lokala SEO',
        'Månadsrapport',
        'E-post support'
      ],
      cta: { label: 'Börja nu', href: '/#kontakt' }
    },
    {
      name: 'Pro',
      price: '4,500',
      period: 'månad',
      description: 'Vår mest populära lösning för växande företag',
      features: [
        'Allt i Start +',
        'Avancerad lokala SEO',
        'Omdömeshantering',
        'Veckorapport',
        'Prioriterad support',
        'A/B-testning'
      ],
      popular: true,
      cta: { label: 'Välj Pro', href: '/#kontakt' }
    },
    {
      name: 'Elite',
      price: '7,500',
      period: 'månad',
      description: 'Komplett lösning för stora företag med flera platser',
      features: [
        'Allt i Pro +',
        'Flera platser',
        'Konkurrensanalys',
        'Daglig övervakning',
        'Dedikerad strateg',
        '24/7 support'
      ],
      cta: { label: 'Kontakta oss', href: '/#kontakt' }
    }
  ]

  const faqItems = [
    {
      question: 'Hur snart ser jag resultat?',
      answer: 'De flesta kunder ser förbättringar inom 2-4 veckor, med fulla resultat efter 2-3 månader.'
    },
    {
      question: 'Vad händer om jag inte ser fler samtal?',
      answer: 'Vi erbjuder en garanti: +25% fler samtal på 30 dagar – annars jobbar vi gratis tills du ser det.'
    },
    {
      question: 'Behöver jag ha en Google Business Profile?',
      answer: 'Nej, vi hjälper dig att skapa och optimera din profil från grunden.'
    },
    {
      question: 'Kan ni hantera flera platser?',
      answer: 'Ja, vi har specialiserade paket för företag med flera platser.'
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
      label: 'Fler visningar',
      description: 'Genomsnittlig ökning av profilvisningar',
      trend: { value: 40, isPositive: true }
    },
    {
      value: '+35%',
      label: 'Fler klick',
      description: 'Genomsnittlig ökning av klick till hemsida',
      trend: { value: 35, isPositive: true }
    }
  ]

  return (
    <Page title="Google Maps Optimering - Bokario">
      <Hero
        tagline="Dominera kartan och få fler samtal"
        lead="+25% fler samtal på 30 dagar – annars jobbar vi gratis tills du ser det."
        primaryCTA={{
          label: 'Boka gratis konsultation',
          href: '/#kontakt'
        }}
        secondaryCTA={{
          label: 'Se våra priser',
          href: '/maps/pris'
        }}
      />

      <section className="section">
        <div className="container-bk">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-ink-950 mb-4">Mätbara resultat</h2>
            <p className="text-lead text-ink-700 max-w-[65ch] mx-auto">
              Våra kunder ser konkreta resultat inom 30 dagar
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {kpis.map((kpi, index) => (
              <KPI key={index} {...kpi} />
            ))}
          </div>
        </div>
      </section>

      <FeatureList
        features={features}
        title="Vad ingår i vår Maps-optimering?"
        subtitle="En komplett lösning för att maximera din synlighet på Google Maps"
      />

      <Process
        steps={processSteps}
        title="Så fungerar det"
        subtitle="En enkel process från start till resultat"
      />

      <section className="section">
        <div className="container-bk">
          <MapsCallsEstimator />
        </div>
      </section>

      <Pricing
        tiers={pricingTiers}
        title="Enkla, transparenta priser"
        subtitle="Välj det paket som passar ditt företag bäst"
      />

      <FAQ
        items={faqItems}
        title="Vanliga frågor"
        subtitle="Svar på de vanligaste frågorna om vår Maps-optimering"
      />

      <CTA
        title="Redo att dominera kartan?"
        subtitle="Boka en gratis konsultation och låt oss visa hur vi kan hjälpa dig att få fler samtal från Google Maps."
        cta={{
          label: 'Boka gratis konsultation',
          href: '/#kontakt'
        }}
      />
    </Page>
  )
}
