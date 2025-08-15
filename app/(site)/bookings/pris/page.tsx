import { Page } from '../../../../components/Page'
import { Hero } from '../../../../components/sections/Hero'
import { Pricing } from '../../../../components/sections/Pricing'
import { FAQ } from '../../../../components/sections/FAQ'
import { CTA } from '../../../../components/sections/CTA'
import { RoiCalculator } from '../../../../components/calculators/RoiCalculator'
import { Card } from '../../../../components/Card'

export default function BookingsPricingPage() {
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
      question: 'Vad kostar DFY-bokningsflöde?',
      answer: 'Setup-kostnaden är 15,000 kr engångs, sedan 5,000 kr/månad för kontinuerlig optimering. Vi erbjuder också success fee-modeller.'
    },
    {
      question: 'Hur lång tid tar det att se resultat?',
      answer: 'De flesta kunder ser förbättringar inom 2-4 veckor, med fulla resultat efter 1-2 månader.'
    },
    {
      question: 'Vad händer om jag inte får 20 bokningar på 30 dagar?',
      answer: 'Vi erbjuder en garanti: 20 nya bokningar på 30 dagar – annars pausar vi vår avgift.'
    },
    {
      question: 'Kan jag avbryta när som helst?',
      answer: 'Ja, du kan avbryta med 30 dagars uppsägningstid. Inga långa bindningstider.'
    },
    {
      question: 'Vad ingår i priset?',
      answer: 'Allt från funnel-analys och optimering till kontinuerlig support och rapportering. Inga dolda kostnader.'
    }
  ]

  return (
    <Page title="Vad kostar DFY-bokningsflöde? - Bokario">
      <Hero
        tagline="Vad kostar DFY-bokningsflöde?"
        lead="En transparent guide till kostnaderna för bokningsoptimering och vad du får för pengarna."
        primaryCTA={{
          label: 'Boka gratis konsultation',
          href: '/#kontakt'
        }}
        secondaryCTA={{
          label: 'Se våra paket',
          href: '/bookings'
        }}
      />

      <section className="section">
        <div className="container-bk">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-ink-950 mb-4">Prisfaktorer</h2>
            <p className="text-lead text-ink-700 max-w-[65ch] mx-auto">
              Förstå vad som påverkar kostnaden för bokningsoptimering
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary-600/10 text-primary-600 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-h3 text-ink-950 mb-3">Komplexitet</h3>
              <p className="text-body text-ink-700">
                Flera tjänster, komplexa priser och avancerade funktioner kräver mer optimering.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary-600/10 text-primary-600 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                </svg>
              </div>
              <h3 className="text-h3 text-ink-950 mb-3">Traffikvolym</h3>
              <p className="text-body text-ink-700">
                Högre traffik kräver mer avancerad optimering och kontinuerlig övervakning.
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-primary-600/10 text-primary-600 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-h3 text-ink-950 mb-3">Integrationer</h3>
              <p className="text-body text-ink-700">
                Flera kalendersystem och CRM-integrationer ökar komplexiteten och kostnaden.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-bk">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-ink-950 mb-4">Risk vs Garanti</h2>
            <p className="text-lead text-ink-700 max-w-[65ch] mx-auto">
              Förstå skillnaden mellan traditionella byråer och vår resultatbaserade approach
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h3 className="text-h3 text-ink-950 mb-3">Traditionell byrå</h3>
              <p className="text-body text-ink-700 mb-4">
                Du betalar månadsvis oavsett resultat. Ingen garanti för att få fler bokningar.
              </p>
              <div className="text-sm text-ink-600">
                <strong>Risk:</strong> Betalar för arbete, inte resultat
              </div>
            </Card>
            <Card className="p-6 border-2 border-success">
              <h3 className="text-h3 text-ink-950 mb-3">Bokario</h3>
              <p className="text-body text-ink-700 mb-4">
                Vi garanterar 20 nya bokningar på 30 dagar – annars pausar vi vår avgift.
              </p>
              <div className="text-sm text-success">
                <strong>Garanti:</strong> Betalar endast för resultat
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
              <div className="text-4xl font-bold text-ink-950 mb-2">8,000+ kr</div>
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
              <div className="text-4xl font-bold text-primary-600 mb-2">från 5,000 kr</div>
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
              <div className="text-4xl font-bold text-ink-950 mb-2">2,000-5,000 kr</div>
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
        title="Redo att få fler bokningar?"
        subtitle="Boka en gratis konsultation och låt oss visa hur bokningsoptimering kan öka dina intäkter."
        cta={{
          label: 'Boka gratis konsultation',
          href: '/#kontakt'
        }}
      />
    </Page>
  )
}
