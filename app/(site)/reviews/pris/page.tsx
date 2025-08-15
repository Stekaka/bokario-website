import { Page } from '../../../../components/Page'
import { Hero } from '../../../../components/sections/Hero'
import { Pricing } from '../../../../components/sections/Pricing'
import { FAQ } from '../../../../components/sections/FAQ'
import { CTA } from '../../../../components/sections/CTA'
import { RoiCalculator } from '../../../../components/calculators/RoiCalculator'
import { Card } from '../../../../components/Card'

export default function ReviewsPricingPage() {
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
      question: 'Vad kostar en review-motor?',
      answer: 'Vi erbjuder transparenta priser från 1,500 kr/månad med ingen setup-avgift. Alla priser inkluderar full support och rapportering.'
    },
    {
      question: 'Hur lång tid tar det att se resultat?',
      answer: 'De flesta kunder ser förbättringar inom 2-4 veckor, med fulla resultat efter 1-2 månader.'
    },
    {
      question: 'Vad händer om jag inte fördubblar recensionstakten på 60 dagar?',
      answer: 'Vi erbjuder en garanti: fördubbla recensionstakten på 60 dagar – annars bjuder vi på nästa månad.'
    },
    {
      question: 'Kan jag avbryta när som helst?',
      answer: 'Ja, du kan avbryta med 30 dagars uppsägningstid. Inga långa bindningstider.'
    },
    {
      question: 'Vad ingår i priset?',
      answer: 'Allt från SMS/QR-system och svarsmallar till support och rapportering. Inga dolda kostnader.'
    }
  ]

  return (
    <Page title="Vad kostar en review-motor? - Bokario">
      <Hero
        tagline="Vad kostar en review-motor?"
        lead="En transparent guide till kostnaderna för recensionshantering och vad du får för pengarna."
        primaryCTA={{
          label: 'Boka gratis konsultation',
          href: '/#kontakt'
        }}
        secondaryCTA={{
          label: 'Se våra paket',
          href: '/reviews'
        }}
      />

      <section className="section">
        <div className="container-bk">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-ink-950 mb-4">Prisfaktorer</h2>
            <p className="text-lead text-ink-700 max-w-[65ch] mx-auto">
              Förstå vad som påverkar kostnaden för recensionshantering
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary-600/10 text-primary-600 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-h3 text-ink-950 mb-3">Kundvolym</h3>
              <p className="text-body text-ink-700">
                Fler kunder kräver mer avancerade system och högre SMS-kostnader.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary-600/10 text-primary-600 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-h3 text-ink-950 mb-3">Funktionalitet</h3>
              <p className="text-body text-ink-700">
                Avancerade funktioner som A/B-testning och konkurrensanalys ökar kostnaden.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary-600/10 text-primary-600 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <h3 className="text-h3 text-ink-950 mb-3">Geografisk plats</h3>
              <p className="text-body text-ink-700">
                SMS-kostnader varierar beroende på land och operatör.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-bk">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-ink-950 mb-4">Policy-kompatibilitet</h2>
            <p className="text-lead text-ink-700 max-w-[65ch] mx-auto">
              Varför det är viktigt att välja rätt lösning
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-h3 text-ink-950 mb-3">Billiga lösningar</h3>
              <p className="text-body text-ink-700 mb-4">
                Många billiga lösningar bryter mot plattformars riktlinjer och kan få ditt konto avstängt.
              </p>
              <div className="text-sm text-ink-600">
                <strong>Risk:</strong> Avstängda konton och förlorad synlighet
              </div>
            </Card>
            <Card className="p-6 border-2 border-success">
              <h3 className="text-h3 text-ink-950 mb-3">Bokario</h3>
              <p className="text-body text-ink-700 mb-4">
                Vi följer alla plattformars riktlinjer och samlar endast in äkta kundrecensioner.
              </p>
              <div className="text-sm text-success">
                <strong>Säkerhet:</strong> Följer alla riktlinjer
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-bk">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-ink-950 mb-4">Jämförelse mot byråer</h2>
            <p className="text-lead text-ink-700 max-w-[65ch] mx-auto">
              Se hur våra priser jämför sig med traditionella byråer
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <h3 className="text-h3 text-ink-950 mb-3">Traditionell byrå</h3>
              <div className="text-4xl font-bold text-ink-950 mb-2">5,000+ kr</div>
              <div className="text-sm text-ink-600 mb-4">per månad</div>
              <ul className="text-sm text-ink-700 space-y-2 text-left">
                <li>• Långa bindningstider</li>
                <li>• Ingen resultatgaranti</li>
                <li>• Långsam implementation</li>
                <li>• Begränsad support</li>
              </ul>
            </Card>
            <Card className="p-6 text-center border-2 border-primary-600">
              <h3 className="text-h3 text-ink-950 mb-3">Bokario</h3>
              <div className="text-4xl font-bold text-primary-600 mb-2">från 1,500 kr</div>
              <div className="text-sm text-ink-600 mb-4">per månad</div>
              <ul className="text-sm text-ink-700 space-y-2 text-left">
                <li>• Transparenta priser</li>
                <li>• Resultatgaranti</li>
                <li>• Snabb implementation</li>
                <li>• Prioriterad support</li>
              </ul>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="text-h3 text-ink-950 mb-3">Freelancer</h3>
              <div className="text-4xl font-bold text-ink-950 mb-2">800-2,000 kr</div>
              <div className="text-sm text-ink-600 mb-4">per månad</div>
              <ul className="text-sm text-ink-700 space-y-2 text-left">
                <li>• Ovarierande kvalitet</li>
                <li>• Ingen garanti</li>
                <li>• Begränsad tillgänglighet</li>
                <li>• Risk för avbrott</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-bk">
          <RoiCalculator />
        </div>
      </section>

      <Pricing
        tiers={pricingTiers}
        title="Våra prispaket"
        subtitle="Välj det paket som passar ditt företag bäst"
      />

      <FAQ
        items={faqItems}
        title="Vanliga frågor om priser"
        subtitle="Svar på de vanligaste frågorna om kostnader och betalningar"
      />

      <CTA
        title="Redo att få fler recensioner?"
        subtitle="Boka en gratis konsultation och låt oss visa hur recensionshantering kan öka dina intäkter."
        cta={{
          label: 'Boka gratis konsultation',
          href: '/#kontakt'
        }}
      />
    </Page>
  )
}
