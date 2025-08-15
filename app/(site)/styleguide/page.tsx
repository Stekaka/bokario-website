import { Page } from '../../../components/Page'
import { SectionHeading } from '../../../components/SectionHeading'
import { Button } from '../../../components/Button'
import { Badge } from '../../../components/Badge'
import { Card } from '../../../components/Card'
import { KPI } from '../../../components/KPI'
import { RoiCalculator } from '../../../components/calculators/RoiCalculator'
import { BookingsEstimator } from '../../../components/calculators/BookingsEstimator'
import { ReviewsImpactCalculator } from '../../../components/calculators/ReviewsImpactCalculator'
import { MapsCallsEstimator } from '../../../components/calculators/MapsCallsEstimator'

export default function StyleguidePage() {
  return (
    <Page title="Styleguide - Bokario">
      <section className="section">
        <div className="container-bk">
          <SectionHeading
            title="Styleguide"
            subtitle="Alla design-tokens, komponenter och kalkylatorer för BokarioV2"
            centered
          />
        </div>
      </section>

      {/* Typografi */}
      <section className="section">
        <div className="container-bk">
          <SectionHeading title="Typografi" subtitle="Våra typografiska skala och font-familjer" />
          <div className="space-y-8">
            <div>
              <h1 className="text-h1 text-ink-950 mb-4">H1 - clamp(40px,6vw,64px) 700 -0.02em</h1>
              <p className="text-body text-ink-600">Manrope, Inter, system-ui, sans-serif</p>
            </div>
            <div>
              <h2 className="text-h2 text-ink-950 mb-4">H2 - clamp(28px,4.5vw,40px) 700</h2>
              <p className="text-body text-ink-600">Manrope, Inter, system-ui, sans-serif</p>
            </div>
            <div>
              <h3 className="text-h3 text-ink-950 mb-4">H3 - 24px 700</h3>
              <p className="text-body text-ink-600">Manrope, Inter, system-ui, sans-serif</p>
            </div>
            <div>
              <p className="text-lead text-ink-950 mb-4">Lead - 20px 500</p>
              <p className="text-body text-ink-600">Manrope, Inter, system-ui, sans-serif</p>
            </div>
            <div>
              <p className="text-body-l text-ink-950 mb-4">Body L - 18px 500</p>
              <p className="text-body text-ink-600">Manrope, Inter, system-ui, sans-serif</p>
            </div>
            <div>
              <p className="text-body text-ink-950 mb-4">Body - 16px 500</p>
              <p className="text-body text-ink-600">Manrope, Inter, system-ui, sans-serif</p>
            </div>
            <div>
              <p className="text-caption text-ink-950 mb-4">Caption - 14px 500</p>
              <p className="text-body text-ink-600">Manrope, Inter, system-ui, sans-serif</p>
            </div>
            <div>
              <p className="font-serif text-ink-950 mb-4">Serif - Instrument Serif</p>
              <p className="text-body text-ink-600">Instrument Serif, serif</p>
            </div>
          </div>
        </div>
      </section>

      {/* Färger */}
      <section className="section">
        <div className="container-bk">
          <SectionHeading title="Färger" subtitle="Våra färg-tokens och palett" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <div className="w-full h-20 bg-primary-600 rounded-12"></div>
              <div className="text-center">
                <div className="font-medium text-ink-950">Primary 600</div>
                <div className="text-sm text-ink-600">#2F5DFF</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="w-full h-20 bg-primary-700 rounded-12"></div>
              <div className="text-center">
                <div className="font-medium text-ink-950">Primary 700</div>
                <div className="text-sm text-ink-600">#2144C9</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="w-full h-20 bg-ink-950 rounded-12"></div>
              <div className="text-center">
                <div className="font-medium text-white">Ink 950</div>
                <div className="text-sm text-ink-300">#0A1721</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="w-full h-20 bg-ink-800 rounded-12"></div>
              <div className="text-center">
                <div className="font-medium text-white">Ink 800</div>
                <div className="text-sm text-ink-300">#14202A</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="w-full h-20 bg-ink-700 rounded-12"></div>
              <div className="text-center">
                <div className="font-medium text-white">Ink 700</div>
                <div className="text-sm text-ink-300">#25313B</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="w-full h-20 bg-mist-50 rounded-12 border border-line"></div>
              <div className="text-center">
                <div className="font-medium text-ink-950">Mist 50</div>
                <div className="text-sm text-ink-600">#FAFBFD</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="w-full h-20 bg-mist-100 rounded-12 border border-line"></div>
              <div className="text-center">
                <div className="font-medium text-ink-950">Mist 100</div>
                <div className="text-sm text-ink-600">#F6F8FB</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="w-full h-20 bg-mist-200 rounded-12 border border-line"></div>
              <div className="text-center">
                <div className="font-medium text-ink-950">Mist 200</div>
                <div className="text-sm text-ink-600">#EDF1F7</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="w-full h-20 bg-success rounded-12"></div>
              <div className="text-center">
                <div className="font-medium text-white">Success</div>
                <div className="text-sm text-success-200">#17B6A5</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="w-full h-20 bg-gold rounded-12"></div>
              <div className="text-center">
                <div className="font-medium text-white">Gold</div>
                <div className="text-sm text-gold-200">#D4A017</div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="w-full h-20 bg-line rounded-12 border border-line"></div>
              <div className="text-center">
                <div className="font-medium text-ink-950">Line</div>
                <div className="text-sm text-ink-600">#E6EBF2</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Knappar */}
      <section className="section">
        <div className="container-bk">
          <SectionHeading title="Knappar" subtitle="Alla knappvarianter och storlekar" />
          <div className="space-y-8">
            <div>
              <h3 className="text-h3 text-ink-950 mb-4">Primära knappar</h3>
              <div className="flex flex-wrap gap-4">
                <Button size="md">Button MD</Button>
                <Button size="lg">Button LG</Button>
                <Button size="md" disabled>Disabled</Button>
              </div>
            </div>
            <div>
              <h3 className="text-h3 text-ink-950 mb-4">Ghost knappar</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="ghost" size="md">Ghost MD</Button>
                <Button variant="ghost" size="lg">Ghost LG</Button>
              </div>
            </div>
            <div>
              <h3 className="text-h3 text-ink-950 mb-4">Link knappar</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="link" size="md">Link MD</Button>
                <Button variant="link" size="lg">Link LG</Button>
              </div>
            </div>
            <div>
              <h3 className="text-h3 text-ink-950 mb-4">Som länkar</h3>
              <div className="flex flex-wrap gap-4">
                <Button as="a" href="#" size="md">Link Button MD</Button>
                <Button as="a" href="#" size="lg">Link Button LG</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Badges */}
      <section className="section">
        <div className="container-bk">
          <SectionHeading title="Badges" subtitle="Alla badge-varianter" />
          <div className="flex flex-wrap gap-4">
            <Badge variant="default">Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </div>
      </section>

      {/* Kort */}
      <section className="section">
        <div className="container-bk">
          <SectionHeading title="Kort" subtitle="Alla kortvarianter och skuggor" />
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="text-h3 text-ink-950 mb-3">Standard kort</h3>
              <p className="text-body text-ink-700">Standard kort med e1 skugga som blir e2 vid hover.</p>
            </Card>
            <Card className="p-6" elevated>
              <h3 className="text-h3 text-ink-950 mb-3">Elevated kort</h3>
              <p className="text-body text-ink-700">Elevated kort med e2 skugga som blir e3 vid hover.</p>
            </Card>
            <Card className="p-6" hover={false}>
              <h3 className="text-h3 text-ink-950 mb-3">Ingen hover</h3>
              <p className="text-body text-ink-700">Kort utan hover-effekt.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* KPI */}
      <section className="section">
        <div className="container-bk">
          <SectionHeading title="KPI-kort" subtitle="Exempel på KPI-komponenter" />
          <div className="grid md:grid-cols-3 gap-6">
            <KPI
              value="+25%"
              label="Fler samtal"
              description="Genomsnittlig ökning av samtal från Maps"
              trend={{ value: 25, isPositive: true }}
            />
            <KPI
              value="4.8/5"
              label="Kundnöjdhet"
              description="Genomsnittligt kundbetyg"
              trend={{ value: 96, isPositive: true }}
            />
            <KPI
              value="+60%"
              label="Fler bokningar"
              description="Genomsnittlig ökning av bokningar"
              trend={{ value: 60, isPositive: true }}
            />
          </div>
        </div>
      </section>

      {/* Kalkulatorer */}
      <section className="section">
        <div className="container-bk">
          <SectionHeading title="Kalkylatorer" subtitle="Alla interaktiva kalkylatorer" />
          <div className="space-y-12">
            <div>
              <h3 className="text-h3 text-ink-950 mb-6">ROI-kalkylator</h3>
              <RoiCalculator />
            </div>
            <div>
              <h3 className="text-h3 text-ink-950 mb-6">Bokningsestimator</h3>
              <BookingsEstimator />
            </div>
            <div>
              <h3 className="text-h3 text-ink-950 mb-6">Recensionspåverkan-kalkylator</h3>
              <ReviewsImpactCalculator />
            </div>
            <div>
              <h3 className="text-h3 text-ink-950 mb-6">Maps-samtal-estimator</h3>
              <MapsCallsEstimator />
            </div>
          </div>
        </div>
      </section>

      {/* Spacing */}
      <section className="section">
        <div className="container-bk">
          <SectionHeading title="Spacing" subtitle="Våra spacing-tokens" />
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 bg-primary-600 rounded"></div>
              <span className="text-body text-ink-700">4px</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-primary-600 rounded"></div>
              <span className="text-body text-ink-700">8px</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-primary-600 rounded"></div>
              <span className="text-body text-ink-700">12px</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-primary-600 rounded"></div>
              <span className="text-body text-ink-700">16px</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-primary-600 rounded"></div>
              <span className="text-body text-ink-700">24px</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-32 h-32 bg-primary-600 rounded"></div>
              <span className="text-body text-ink-700">32px</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-40 h-40 bg-primary-600 rounded"></div>
              <span className="text-body text-ink-700">40px</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-48 h-48 bg-primary-600 rounded"></div>
              <span className="text-body text-ink-700">48px</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-64 h-64 bg-primary-600 rounded"></div>
              <span className="text-body text-ink-700">64px</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-80 h-80 bg-primary-600 rounded"></div>
              <span className="text-body text-ink-700">80px</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-96 h-96 bg-primary-600 rounded"></div>
              <span className="text-body text-ink-700">96px</span>
            </div>
          </div>
        </div>
      </section>

      {/* Skuggor */}
      <section className="section">
        <div className="container-bk">
          <SectionHeading title="Skuggor" subtitle="Våra skugga-tokens" />
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 shadow-e1">
              <h3 className="text-h3 text-ink-950 mb-3">E1 skugga</h3>
              <p className="text-body text-ink-700">0 1px 2px rgba(10,23,33,.06)</p>
            </Card>
            <Card className="p-6 shadow-e2">
              <h3 className="text-h3 text-ink-950 mb-3">E2 skugga</h3>
              <p className="text-body text-ink-700">0 4px 12px rgba(10,23,33,.08)</p>
            </Card>
            <Card className="p-6 shadow-e3">
              <h3 className="text-h3 text-ink-950 mb-3">E3 skugga</h3>
              <p className="text-body text-ink-700">0 10px 24px rgba(10,23,33,.12)</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Border radius */}
      <section className="section">
        <div className="container-bk">
          <SectionHeading title="Border Radius" subtitle="Våra radius-tokens" />
          <div className="flex flex-wrap gap-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-600 rounded-12 mb-2"></div>
              <span className="text-body text-ink-700">12px</span>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary-600 rounded-999 mb-2"></div>
              <span className="text-body text-ink-700">999px</span>
            </div>
          </div>
        </div>
      </section>
    </Page>
  )
}
