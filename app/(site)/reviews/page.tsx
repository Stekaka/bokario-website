import { Page } from '../../../components/Page'
import { Hero } from '../../../components/sections/Hero'
import { FeatureList } from '../../../components/sections/FeatureList'
import { Process } from '../../../components/sections/Process'
import { Pricing } from '../../../components/sections/Pricing'
import { FAQ } from '../../../components/sections/FAQ'
import { CTA } from '../../../components/sections/CTA'
import { ReviewsImpactCalculator } from '../../../components/calculators/ReviewsImpactCalculator'
import { KPI } from '../../../components/KPI'

export default function ReviewsPage() {
  const features = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'SMS/QR-system',
      description: 'Automatiskt system som skickar SMS eller QR-koder till kunder för enkla recensioner.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: 'Svarsmallar',
      description: 'Fördefinierade mallar för olika typer av recensioner som ökar svarsfrekvensen.'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      title: 'Rapportering',
      description: 'Detaljerade rapporter som visar recensionstrends och påverkan på din synlighet.'
    }
  ]

  const processSteps = [
    {
      number: 1,
      title: 'Setup',
      description: 'Vi sätter upp ditt recensionssystem med SMS/QR och svarsmallar.'
    },
    {
      number: 2,
      title: 'Automatisering',
      description: 'Systemet skickar automatiskt recensionsförfrågningar till dina kunder.'
    },
    {
      number: 3,
      title: 'Resultat',
      description: 'Kontinuerlig övervakning och optimering för att maximera recensioner.'
    }
  ]

  const pricingTiers = [
    {
      name: 'Start',
      price: '1,500',
      period: 'månad',
      description: 'Perfekt för mindre företag som vill komma igång',
      features: [
        'SMS/QR-system',
        'Grundläggande svarsmallar',
        'Månadsrapport',
        'E-post support'
      ],
      cta: { label: 'Börja nu', href: '/#kontakt' }
    },
    {
      name: 'Pro',
      price: '2,500',
      period: 'månad',
      description: 'Vår mest populära lösning för växande företag',
      features: [
        'Allt i Start +',
        'Avancerade svarsmallar',
        'A/B-testning',
        'Veckorapport',
        'Prioriterad support',
        'Policy-kompatibilitet'
      ],
      popular: true,
      cta: { label: 'Välj Pro', href: '/#kontakt' }
    },
    {
      name: 'Elite',
      price: '4,000',
      period: 'månad',
      description: 'Komplett lösning för stora företag',
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
      question: 'Hur snart ser jag fler recensioner?',
      answer: 'De flesta kunder ser förbättringar inom 2-4 veckor, med fulla resultat efter 1-2 månader.'
    },
    {
      question: 'Vad händer om jag inte fördubblar recensionstakten på 60 dagar?',
      answer: 'Vi erbjuder en garanti: fördubbla recensionstakten på 60 dagar – annars bjuder vi på nästa månad.'
    },
    {
      question: 'Är recensionerna äkta?',
      answer: 'Ja, vi följer alla plattformars riktlinjer och samlar endast in äkta kundrecensioner.'
    },
    {
      question: 'Kan jag välja vilka kunder som får förfrågningar?',
      answer: 'Ja, du kan filtrera kunder baserat på olika kriterier för att maximera svarsfrekvensen.'
    },
    {
      question: 'Vad kostar det att komma igång?',
      answer: 'Vi erbjuder transparenta priser från 1,500 kr/månad med ingen setup-avgift.'
    }
  ]

  const kpis = [
    {
      value: '+100%',
      label: 'Fler recensioner',
      description: 'Genomsnittlig ökning av recensioner',
      trend: { value: 100, isPositive: true }
    },
    {
      value: '+0.5',
      label: 'Bättre betyg',
      description: 'Genomsnittlig förbättring av snittbetyg',
      trend: { value: 50, isPositive: true }
    },
    {
      value: '+25%',
      label: 'Fler klick',
      description: 'Genomsnittlig ökning av klick från recensioner',
      trend: { value: 25, isPositive: true }
    }
  ]

  return (
    <Page title="Recensionshantering - Bokario">
      <Hero
        tagline="Fler äkta omdömen. Fler bokningar."
        lead="Policy-säker review-motor med SMS/QR och svarsmallar. Fördubbla recensionstakten på 60 dagar – annars bjuder vi på nästa månad."
        primaryCTA={{
          label: 'Boka gratis konsultation',
          href: '/#kontakt'
        }}
        secondaryCTA={{
          label: 'Se våra priser',
          href: '/reviews/pris'
        }}
      />

      <section className="section">
        <div className="container-bk">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-ink-950 mb-4">Mätbara resultat</h2>
            <p className="text-lead text-ink-700 max-w-[65ch] mx-auto">
              Våra kunder ser konkreta resultat inom 60 dagar
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
        title="Vad ingår i vår recensionshantering?"
        subtitle="En komplett lösning för att maximera dina recensioner"
      />

      <Process
        steps={processSteps}
        title="Så fungerar det"
        subtitle="En enkel process från start till resultat"
      />

      <section className="section">
        <div className="container-bk">
          <ReviewsImpactCalculator />
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
        subtitle="Svar på de vanligaste frågorna om vår recensionshantering"
      />

      <CTA
        title="Redo att få fler recensioner?"
        subtitle="Boka en gratis konsultation och låt oss visa hur vi kan hjälpa dig att bygga ditt rykte."
        cta={{
          label: 'Boka gratis konsultation',
          href: '/#kontakt'
        }}
      />
    </Page>
  )
}
