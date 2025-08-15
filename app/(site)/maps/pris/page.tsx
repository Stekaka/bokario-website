import { Page } from '../../../../components/Page'
import { Hero } from '../../../../components/sections/Hero'
import { Pricing } from '../../../../components/sections/Pricing'
import { FAQ } from '../../../../components/sections/FAQ'
import { CTA } from '../../../../components/sections/CTA'
import { RoiCalculator } from '../../../../components/calculators/RoiCalculator'
import { Card } from '../../../../components/Card'

export default function MapsPricingPage() {
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
      question: 'Vad kostar lokal synlighet på Google?',
      answer: 'Kostnaden varierar beroende på bransch, konkurrens och geografisk plats. Vi erbjuder transparenta priser från 2,500 kr/månad.'
    },
    {
      question: 'Hur lång tid tar det att se resultat?',
      answer: 'De flesta kunder ser förbättringar inom 2-4 veckor, med fulla resultat efter 2-3 månader.'
    },
    {
      question: 'Vad händer om jag inte ser fler samtal?',
      answer: 'Vi erbjuder en garanti: +25% fler samtal på 30 dagar – annars jobbar vi gratis tills du ser det.'
    },
    {
      question: 'Kan jag avbryta när som helst?',
      answer: 'Ja, du kan avbryta med 30 dagars uppsägningstid. Inga långa bindningstider.'
    },
    {
      question: 'Vad ingår i priset?',
      answer: 'Allt från optimering och övervakning till support och rapportering. Inga dolda kostnader.'
    }
  ]

  return (
    <Page title="Vad kostar lokal synlighet på Google? - Bokario">
      <Hero
        tagline="Vad kostar lokal synlighet på Google?"
        lead="En transparent guide till kostnaderna för Google Maps-optimering och vad du får för pengarna."
        primaryCTA={{
          label: 'Boka gratis konsultation',
          href: '/#kontakt'
        }}
        secondaryCTA={{
          label: 'Se våra paket',
          href: '/maps'
        }}
      />

      <section className="section">
        <div className="container-bk">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-ink-950 mb-4">Prisfaktorer</h2>
            <p className="text-lead text-ink-700 max-w-[65ch] mx-auto">
              Förstå vad som påverkar kostnaden för lokal synlighet
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary-600/10 text-primary-600 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
              <h3 className="text-h3 text-ink-950 mb-3">Geografisk plats</h3>
              <p className="text-body text-ink-700">
                Städer med hög konkurrens kostar mer att optimera för, men ger också högre avkastning.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary-600/10 text-primary-600 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-h3 text-ink-950 mb-3">Bransch</h3>
              <p className="text-body text-ink-700">
                Vissa branscher har högre konkurrens och kräver mer avancerad optimering.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary-600/10 text-primary-600 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-h3 text-ink-950 mb-3">Nuvarande status</h3>
              <p className="text-body text-ink-700">
                Företag som redan har en bra grund kan optimeras snabbare och billigare.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-bk">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-ink-950 mb-4">Vanliga misstag</h2>
            <p className="text-lead text-ink-700 max-w-[65ch] mx-auto">
              Undvik dessa kostliga misstag när du väljer Maps-optimering
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-h3 text-ink-950 mb-3">Billiga &ldquo;snabb-fix&rdquo;</h3>
              <p className="text-body text-ink-700 mb-4">
                Många företag väljer billiga lösningar som inte ger hållbara resultat. Det kostar mer i längden.
              </p>
              <div className="text-sm text-ink-600">
                <strong>Konsekvens:</strong> Ingen förbättring, förlorad tid och pengar
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="text-h3 text-ink-950 mb-3">Ingen kontinuerlig optimering</h3>
              <p className="text-body text-ink-700 mb-4">
                Google uppdaterar algoritmerna regelbundet. Utan kontinuerlig optimering tappar du positioner.
              </p>
              <div className="text-sm text-ink-600">
                <strong>Konsekvens:</strong> Tappade positioner och minskad synlighet
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
              <div className="text-4xl font-bold text-ink-950 mb-2">15,000+ kr</div>
              <div className="text-sm text-ink-600 mb-4">per månad</div>
              <ul className="text-sm text-ink-700 space-y-2 text-left">
                <li>• Långa bindningstider</li>
                <li>• Dolda kostnader</li>
                <li>• Långsam implementation</li>
                <li>• Begränsad support</li>
              </ul>
            </Card>
            <Card className="p-6 text-center border-2 border-primary-600">
              <h3 className="text-h3 text-ink-950 mb-3">Bokario</h3>
              <div className="text-4xl font-bold text-primary-600 mb-2">från 2,500 kr</div>
              <div className="text-sm text-ink-600 mb-4">per månad</div>
              <ul className="text-sm text-ink-700 space-y-2 text-left">
                <li>• Transparenta priser</li>
                <li>• Snabb implementation</li>
                <li>• Resultatgaranti</li>
                <li>• Prioriterad support</li>
              </ul>
            </Card>
            <Card className="p-6 text-center">
              <h3 className="text-h3 text-ink-950 mb-3">Freelancer</h3>
              <div className="text-4xl font-bold text-ink-950 mb-2">1,000-3,000 kr</div>
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
        title="Redo att investera i din synlighet?"
        subtitle="Boka en gratis konsultation och låt oss visa hur Maps-optimering kan öka dina intäkter."
        cta={{
          label: 'Boka gratis konsultation',
          href: '/#kontakt'
        }}
      />
    </Page>
  )
}
