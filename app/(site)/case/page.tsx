"use client";

import { Hero } from "@/components/Hero";
import { Button } from "@/components/Button";
import { Stat } from "@/components/Stat";
import { FeatureList } from "@/components/FeatureList";
import { Process } from "@/components/Process";
import { Pricing } from "@/components/Pricing";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Card } from "@/components/Card";
import { MeasurableResults } from "@/components/MeasurableResults";

export default function CasePage() {
  const successStories = [
    {
      company: 'Frisörsalong Stil',
      industry: 'Skönhet & Hälsa',
      location: 'Stockholm',
      challenge: 'Låg synlighet i Google Maps, få kunder från lokala sökningar',
      solution: 'Maps-optimering med lokal SEO-strategi',
      results: [
        '+300% fler Maps-visningar',
        '+150% fler klick till hemsida',
        '+80% fler samtal från Maps',
        'Från position 15 till position 3'
      ],
      testimonial: '&quot;Bokario hjälpte oss att synas först när kunder söker efter frisörer i Stockholm. Vi har fått fler kunder än någonsin!&quot;',
      contact: 'Anna Lindberg, Ägare'
    },
    {
      company: 'Fysioterapi Centrum',
      industry: 'Hälsa & Vård',
      location: 'Göteborg',
      challenge: 'Inget online-bokningssystem, många uteblivna tider',
      solution: 'Komplett bokningssystem med automatiska påminnelser',
      results: [
        '+120% fler online-bokningar',
        '+85% färre no-shows',
        '+60% tidsbesparing på bokningshantering',
        '4.9/5 kundbetyg'
      ],
      testimonial: '&quot;Vårt bokningssystem från Bokario har revolutionerat vårt sätt att arbeta. Vi sparer timmar varje dag och våra kunder älskar den enkla bokningen.&quot;',
      contact: 'Marcus Andersson, Fysioterapeut'
    },
    {
      company: 'Restaurang Köket',
      industry: 'Restaurang & Mat',
      location: 'Malmö',
      challenge: 'Få recensioner, lågt förtroende hos potentiella kunder',
      solution: 'Automatisk recensionshantering med kundkommunikation',
      results: [
        '+200% fler kundrecensioner',
        '+150% bättre synlighet i sökningar',
        '+80% fler konverteringar',
        'Från 3.8 till 4.7/5 betyg'
      ],
      testimonial: '&quot;Våra recensioner har exploderat sedan vi började arbeta med Bokario. Vi syns nu högre upp i sökningar och får fler bokningar än någonsin.&quot;',
      contact: 'Sofia Nilsson, Chef'
    }
  ];

  const industryStats = [
    {
      eyebrow: 'Genomsnittlig ökning',
      value: '+180%',
      title: 'Fler kunder',
      desc: 'Genomsnittlig ökning av kunder för alla våra klienter'
    },
    {
      eyebrow: 'Genomsnittlig ROI',
      value: '320%',
      title: 'Return on Investment',
      desc: 'Genomsnittlig ROI inom 6 månader'
    },
    {
      eyebrow: 'Genomsnittlig tid',
      value: '22 dagar',
      title: 'Till första resultat',
      desc: 'Genomsnittlig tid till första mätbara resultat'
    },
    {
      eyebrow: 'Kundnöjdhet',
      value: '4.8/5',
      title: 'Genomsnittsbetyg',
      desc: 'Genomsnittligt kundbetyg för våra tjänster'
    }
  ];

  const testimonials = [
    {
      quote: '&quot;Bokario har varit en game-changer för vårt företag. Vi har fått fler kunder på 3 månader än vi hade på hela förra året.&quot;',
      author: 'Erik Johansson',
      title: 'VD, Digital Solutions AB',
      company: 'Stockholm'
    },
    {
      quote: '&quot;Deras Maps-optimering är fantastisk. Vi syns nu först när kunder söker efter våra tjänster i vårt område.&quot;',
      author: 'Maria Svensson',
      title: 'Marknadschef',
      company: 'Göteborg'
    },
    {
      quote: '&quot;Vårt bokningssystem från Bokario har gjort att vi kan fokusera på att ta hand om våra kunder istället för att hantera bokningar.&quot;',
      author: 'Lars Bergman',
      title: 'Ägare',
      company: 'Malmö'
    }
  ];

  return (
    <main id="main">
      <Hero
        title="Kundberättelser som inspirerar."
        sub="Se hur våra kunder har lyckats öka sin verksamhet med våra tjänster. Från Maps-optimering till bokningssystem - vi hjälper företag att växa."
        align="center"
        trustText="Trusted by 500+ Swedish businesses across all industries"
        ctas={
          <>
            <Button variant="primary" size="lg" href="/booking">
              Boka gratis konsultation
            </Button>
            <Button variant="ghost" size="lg" href="/#tjanster">
              Se våra tjänster
            </Button>
          </>
        }
      />

      {/* Industry Stats */}
      <section className="section bg-surface">
        <div className="container-bk">
          <div className="text-center mb-12">
            <h2 className="font-display text-h2 text-ink mb-4">Våra resultat i siffror</h2>
            <p className="lede mx-auto">
              Genomsnittliga resultat för alla våra kunder
            </p>
          </div>

          <div 
            className="stats-grid max-w-6xl mx-auto"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
              width: '100%'
            }}
          >
            {industryStats.map((stat, index) => (
              <Stat key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section">
        <div className="container-bk">
          <div className="text-center mb-16">
            <h2 className="font-display text-h2 text-ink mb-4">Kundberättelser</h2>
            <p className="lede mx-auto">
              Läs om hur våra kunder har lyckats öka sin verksamhet med våra tjänster
            </p>
          </div>

          <div className="grid gap-8">
            {successStories.map((story, index) => (
              <Card key={index} variant="glass" className="p-8">
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Company Info */}
                  <div>
                    <div className="mb-6">
                      <div className="text-sm text-teal font-semibold mb-2">{story.industry}</div>
                      <h3 className="text-h3 text-ink mb-2">{story.company}</h3>
                      <div className="text-body text-ink-dim">{story.location}</div>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-ink mb-2">Utmaning</h4>
                      <p className="text-body text-ink-dim">{story.challenge}</p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-ink mb-2">Lösning</h4>
                      <p className="text-body text-ink-dim">{story.solution}</p>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-ink mb-2">Resultat</h4>
                      <ul className="space-y-2">
                        {story.results.map((result, resultIndex) => (
                          <li key={resultIndex} className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-teal mr-3 flex-shrink-0" />
                            <span className="text-sm text-ink-dim">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Testimonial */}
                  <div className="flex flex-col justify-center">
                    <div className="mb-6">
                      <div className="text-4xl text-teal mb-4">&quot;</div>
                      <blockquote className="text-lead text-ink italic mb-6">
                        {story.testimonial}
                      </blockquote>
                      <div className="text-sm text-ink-dim">
                        <div className="font-semibold text-ink">{story.contact}</div>
                        <div>{story.company}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section bg-surface">
        <div className="container-bk">
          <div className="text-center mb-12">
            <h2 className="font-display text-h2 text-ink mb-4">Vad våra kunder säger</h2>
            <p className="lede mx-auto">
              Kortare citat från nöjda kunder
            </p>
          </div>

          <div className="grid-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} variant="glass" className="p-6 text-center">
                <div className="text-3xl text-teal mb-4">&quot;</div>
                <blockquote className="text-body text-ink mb-6 leading-relaxed">
                  {testimonial.quote}
                </blockquote>
                <div className="text-sm text-ink-dim">
                  <div className="font-semibold text-ink">{testimonial.author}</div>
                  <div>{testimonial.title}</div>
                  <div>{testimonial.company}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="section">
        <div className="container-bk">
          <div className="text-center mb-12">
            <h2 className="font-display text-h2 text-ink mb-4">Branscher vi hjälper</h2>
            <p className="lede mx-auto">
              Vi har hjälpt företag inom alla branscher att öka sin synlighet och få fler kunder
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Skönhet & Hälsa',
              'Restaurang & Mat',
              'Hälsa & Vård',
              'Handel & E-handel',
              'Tjänster & Konsulting',
              'Bildning & Utbildning',
              'Sport & Fritid',
              'Transport & Logistik'
            ].map((industry, index) => (
              <Card key={index} variant="glass" className="p-6 text-center">
                <div className="text-body font-semibold text-ink">{industry}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case CTA */}
      <CTA
        title="Redo att bli nästa success story?"
        subtitle="Boka en gratis konsultation idag och låt oss diskutera hur vi kan hjälpa dig att uppnå liknande resultat."
        ctas={
          <>
            <Button variant="primary" size="lg" href="/booking">
              Boka gratis konsultation
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
