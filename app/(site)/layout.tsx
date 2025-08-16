import { SectionProvider } from '@/components/SectionProvider'
import { Header } from '@/components/chrome/Header'
import { Footer } from '@/components/chrome/Footer'
import { UserAnalytics } from '@/components/analytics/UserAnalytics'
import { BusinessIntelligence } from '@/components/analytics/BusinessIntelligence'
import { AdvancedInsights } from '@/components/analytics/AdvancedInsights'
import { CookieConsent } from '@/components/security/CookieConsent'

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SectionProvider>
              <UserAnalytics enableHeatmap={true} enableSessionRecording={true}>
          <BusinessIntelligence enableROITracking={true} enableLeadScoring={true}>
            <AdvancedInsights
              enableHeatmap={true}
              enableFunnelAnalysis={true}
              enableCohortAnalysis={true}
              enablePredictiveAnalytics={true}
            >
              <Header />
              <main>
                {children}
              </main>
              <Footer />
              <CookieConsent />
            </AdvancedInsights>
          </BusinessIntelligence>
        </UserAnalytics>
    </SectionProvider>
  )
}
