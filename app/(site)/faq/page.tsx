"use client";

import { Hero } from "@/components/Hero";
import { Button } from "@/components/Button";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";

export default function FAQPage() {
  const generalFAQ = [
    {
      question: 'Hur snabbt kan jag se resultat?',
      answer: 'De flesta av våra kunder ser förbättringar inom 14-30 dagar. Recensioner påverkar din SEO omedelbart, Maps-optimering tar cirka 30 dagar, och bokningssystem ger resultat från dag 1.'
    },
    {
      question: 'Vad händer om jag inte är nöjd?',
      answer: 'Vi erbjuder en 30-dagars pengarna-tillbaka-garanti. Om du inte är nöjd med våra tjänster, får du dina pengar tillbaka utan frågor.'
    },
    {
      question: 'Kan ni hjälpa med flera platser?',
      answer: 'Absolut! Vi har specialiserade paket för företag med flera platser. Kontakta oss för en skräddarsydd lösning som passar dina behov.'
    },
    {
      question: 'Vad ingår i supporten?',
      answer: 'Alla paket inkluderar e-post support. Professional och Enterprise inkluderar prioriterad support, och Enterprise inkluderar dedikerad support med strategimöten.'
    }
  ];

  const mapsFAQ = [
    {
      question: 'Vad ingår i Maps-optimering?',
      answer: 'Vi optimerar din Google My Business-profil, nyckelord, beskrivningar, bilder och säkerställer att all information är korrekt och aktuell för maximal synlighet.'
    },
    {
      question: 'Hur lång tid tar det att se resultat?',
      answer: 'De flesta av våra kunder ser förbättringar inom 30 dagar. Vissa ser resultat redan efter 2 veckor med vår beprövade Maps-optimering.'
    },
    {
      question: 'Behöver jag ha en Google Business Profile?',
      answer: 'Nej, vi hjälper dig att skapa och optimera din profil från grunden. Vi kan också hjälpa dig att verifiera din profil om den inte redan är verifierad.'
    },
    {
      question: 'Hur mäter ni framgång?',
      answer: 'Vi spårar din position i Google Maps, antal visningar, klick och samtal som genereras från Maps. Du får regelbundna rapporter som visar dina framsteg.'
    }
  ];

  const bookingsFAQ = [
    {
      question: 'Hur snabbt kan jag komma igång?',
      answer: 'Du kan komma igång med ditt bokningssystem inom 24 timmar. Vi hjälper dig med all setup och integration med din befintliga kalender.'
    },
    {
      question: 'Kan jag använda min befintliga kalender?',
      answer: 'Absolut! Vi integrerar med Google Calendar, Outlook, Apple Calendar och de flesta andra kalendersystem. Din kalender synkroniseras automatiskt.'
    },
    {
      question: 'Vad händer om jag inte är nöjd?',
      answer: 'Vi erbjuder en 30-dagars pengarna-tillbaka-garanti. Om du inte är nöjd, får du dina pengar tillbaka och vi hjälper dig att hitta en bättre lösning.'
    },
    {
      question: 'Kan ni hjälpa med integration på min hemsida?',
      answer: 'Ja! Vi hjälper dig att integrera bokningssystemet på din hemsida, Facebook, Instagram och andra kanaler för maximal synlighet.'
    }
  ];

  const reviewsFAQ = [
    {
      question: 'Hur samlar ni in recensioner?',
      answer: 'Vi använder automatiska system som skickar förfrågningar till dina nöjda kunder via e-post, SMS eller QR-koder. Allt följer plattformarnas riktlinjer.'
    },
    {
      question: 'Vad händer med negativa recensioner?',
      answer: 'Vi hjälper dig att hantera negativa recensioner professionellt och konvertera dem till positiva upplevelser. Vi ger dig mallar och strategier för att svara konstruktivt.'
    },
    {
      question: 'Är recensionerna äkta?',
      answer: 'Ja, vi följer alla plattformars riktlinjer och samlar endast in äkta kundrecensioner. Vi använder inga falska recensioner eller manipulerade betyg.'
    },
    {
      question: 'Hur mäter ni framgång?',
      answer: 'Vi spårar antal recensioner, genomsnittsbetyg, SEO-förbättringar och ökning av synlighet. Du får regelbundna rapporter som visar dina framsteg.'
    }
  ];

  const pricingFAQ = [
    {
      question: 'Kan jag kombinera olika tjänster?',
      answer: 'Absolut! Vi erbjuder rabatterade paket när du väljer flera tjänster. Du kan spara upp till 20% med vårt kompletta paket som inkluderar alla tre tjänster.'
    },
    {
      question: 'Finns det setup-avgifter?',
      answer: 'Nej, alla våra månadspriser inkluderar setup och onboarding utan extra kostnader. Vi vill att du ska kunna komma igång snabbt och enkelt.'
    },
    {
      question: 'Kan jag avbryta när som helst?',
      answer: 'Ja, du kan avbryta din prenumeration när som helst. Vi erbjuder också en 30-dagars pengarna-tillbaka-garanti om du inte är nöjd.'
    },
    {
      question: 'Vad ingår i priset?',
      answer: 'Alla priser inkluderar setup, support, kontinuerlig optimering och rapporter. Det finns inga dolda kostnader eller extra avgifter.'
    }
  ];

  return (
    <main id="main">
      <Hero
        title="Vanliga frågor och svar."
        sub="Här hittar du svar på de vanligaste frågorna om våra tjänster. Kan du inte hitta svaret du letar efter? Kontakta oss direkt."
        align="center"
        trustText="Transparenta svar på alla dina frågor"
        ctas={
          <>
            <Button variant="primary" size="lg" href="/#kontakt">
              Kontakta oss
            </Button>
            <Button variant="ghost" size="lg" href="/#tjanster">
              Se våra tjänster
            </Button>
          </>
        }
      />

      {/* General FAQ */}
      <section className="section bg-surface">
        <div className="container-bk">
          <FAQ
            items={generalFAQ}
            title="Allmänna frågor"
            subtitle="Svar på vanliga frågor om våra tjänster och processer"
          />
        </div>
      </section>

      {/* Maps FAQ */}
      <section className="section">
        <div className="container-bk">
          <FAQ
            items={mapsFAQ}
            title="Google Maps-optimering"
            subtitle="Svar på frågor om vår Maps-optimeringstjänst"
          />
        </div>
      </section>

      {/* Bookings FAQ */}
      <section className="section bg-surface">
        <div className="container-bk">
          <FAQ
            items={bookingsFAQ}
            title="Bokningssystem"
            subtitle="Svar på frågor om våra bokningslösningar"
          />
        </div>
      </section>

      {/* Reviews FAQ */}
      <section className="section">
        <div className="container-bk">
          <FAQ
            items={reviewsFAQ}
            title="Recensionshantering"
            subtitle="Svar på frågor om vår recensionshanteringstjänst"
          />
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="section bg-surface">
        <div className="container-bk">
          <FAQ
            items={pricingFAQ}
            title="Priser och paket"
            subtitle="Svar på frågor om våra priser och paket"
          />
        </div>
      </section>

      {/* FAQ CTA */}
      <CTA
        title="Har du fler frågor?"
        subtitle="Kontakta oss direkt så hjälper vi dig att hitta svaren du letar efter. Vi finns här för att hjälpa dig att lyckas."
        ctas={
          <>
            <Button variant="primary" size="lg" href="/#kontakt">
              Kontakta oss
            </Button>
            <Button variant="ghost" size="lg" href="/pricing">
              Se våra priser
            </Button>
          </>
        }
      />
    </main>
  );
}
