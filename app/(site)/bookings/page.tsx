import { Page } from '../../../components/Page'
import { Hero } from '../../../components/sections/Hero'
import { FeatureList } from '../../../components/sections/FeatureList'
import { Process } from '../../../components/sections/Process'
import { Pricing } from '../../../components/sections/Pricing'
import { FAQ } from '../../../components/sections/FAQ'
import { CTA } from '../../../components/sections/CTA'
import { BookingsEstimator } from '../../../components/calculators/BookingsEstimator'
import { KPI } from '../../../components/KPI'

export default function BookingsPage() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Funnel-optimering',
      description: 'Konvertera fler besökare till bokningar med optimerade bokningsflöden och A/B-testning.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
      title: 'Annonsoptimering',
      description: 'Maximera din annonsbudget med optimerade Google Ads som konverterar besökare till bokningar.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Kalenderintegration',
      description: 'Sömlös integration med dina befintliga kalendersystem för enkel bokningshantering.'
    }
  ]

  const processSteps = [
    {
      number: 1,
      title: 'Analys',
      description: 'Vi analyserar ditt nuvarande bokningsflöde och identifierar förbättringsområden.'
    },
    {
      number: 2,
      title: 'Optimering',
      description: 'Vi optimerar ditt bokningsflöde, annonser och kalenderintegration för maximal konvertering.'
    },
    {
      number: 3,
      title: 'Resultat',
      description: 'Kontinuerlig övervakning och optimering för att maximera dina bokningar.'
    }
  ]

  const pricingTiers = [
    {
      name: 'Setup',
      price: '15,000',
      period: 'engångs',
      description: 'Enmalig setup av optimerat bokningsflöde',
      features: [
        'Funnel-analys och optimering',
        'A/B-testning av bokningsflöde',
        'Kalenderintegration',
        'Mobiloptimering',
        'Rapport och rekommendationer'
      ],
      cta: { label: 'Börja nu', href: '/#kontakt' }
    },
    {
      name: 'Retainer',
      price: '5,000',
      period: 'månad',
      description: 'Kontinuerlig optimering och support',
      features: [
        'Allt i Setup +',
        'Kontinuerlig A/B-testning',
        'Annonsoptimering',
        'Månadsrapport',
        'Prioriterad support',
        'Resultatgaranti'
      ],
      popular: true,
      cta: { label: 'Välj Retainer', href: '/#kontakt' }
    },
    {
      name: 'Success Fee',
      price: '20%',
      period: 'av ökning',
      description: 'Betala endast för resultat',
      features: [
        'Allt i Retainer +',
        'Dedikerad strateg',
        'Veckorapport',
        '24/7 support',
        'Betala endast för ökning'
      ],
      cta: { label: 'Kontakta oss', href: '/#kontakt' }
    }
  ]

  const faqItems = [
    {
      question: 'Hur snart ser jag fler bokningar?',
      answer: 'De flesta kunder ser förbättringar inom 2-4 veckor, med fulla resultat efter 1-2 månader.'
    },
    {
      question: 'Vad händer om jag inte får 20 bokningar på 30 dagar?',
      answer: 'Vi erbjuder en garanti: 20 nya bokningar på 30 dagar – annars pausar vi vår avgift.'
    },
    {
      question: 'Behöver jag ha Google Ads?',
      answer: 'Nej, vi kan optimera ditt befintliga bokningsflöde. Google Ads är valfritt men rekommenderas.'
    },
    {
      question: 'Kan ni integrera med min befintliga kalender?',
      answer: 'Ja, vi kan integrera med de flesta kalendersystem som Google Calendar, Outlook, och specialiserade bokningssystem.'
    },
    {
      question: 'Vad kostar det att komma igång?',
      answer: 'Setup-kostnaden är 15,000 kr engångs, sedan 5,000 kr/månad för kontinuerlig optimering.'
    }
  ]

  const kpis = [
    {
      value: '+60%',
      label: 'Fler bokningar',
      description: 'Genomsnittlig ökning av bokningar',
      trend: { value: 60, isPositive: true }
    },
    {
      value: '+40%',
      label: 'Bättre CVR',
      description: 'Genomsnittlig förbättring av konverteringsgrad',
      trend: { value: 40, isPositive: true }
    },
    {
      value: '-30%',
      label: 'Lägre CPC',
      description: 'Genomsnittlig minskning av kostnad per klick',
      trend: { value: 30, isPositive: true }
    }
  ]

  return (
    <Page title="Bokningsoptimering - Bokario">
      <Hero
        tagline="20 nya bokningar på 30 dagar"
        lead="Vi gör tider till intäkter – från annons till kalender. Annars pausar vi vår avgiften."
        primaryCTA={{
          label: 'Boka gratis konsultation',
          href: '/#kontakt'
        }}
        secondaryCTA={{
          label: 'Se våra priser',
          href: '/bookings/pris'
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
        title="Vad ingår i vår bokningsoptimering?"
        subtitle="En komplett lösning för att maximera dina bokningar"
      />

      <Process
        steps={processSteps}
        title="Så fungerar det"
        subtitle="En enkel process från start till resultat"
      />

      <section className="section">
        <div className="container-bk">
          <BookingsEstimator />
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
        subtitle="Svar på de vanligaste frågorna om vår bokningsoptimering"
      />

      <CTA
        title="Redo att få fler bokningar?"
        subtitle="Boka en gratis konsultation och låt oss visa hur vi kan hjälpa dig att öka dina bokningar."
        cta={{
          label: 'Boka gratis konsultation',
          href: '/#kontakt'
        }}
      />
    </Page>
  )
}
