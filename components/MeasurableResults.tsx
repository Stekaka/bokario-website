import { Stat } from './Stat';

export function MeasurableResults() {
  return (
    <section className="section bg-surface">
      <div className="container-bk">
        <div className="text-center mb-12">
          <h2 className="font-display text-h2 text-ink mb-4">Mätbara resultat</h2>
          <p className="lede mx-auto max-w-2xl">
            Våra kunder ser konkreta resultat inom 30 dagar
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
          <Stat value="+25%" title="Fler samtal" desc="Genomsnittlig ökning från Maps" />
          <Stat value="+40%" title="Fler recensioner" desc="Genomsnittlig ökning av recensioner" />
          <Stat value="+60%" title="Fler bokningar" desc="Genomsnittlig ökning av bokningar" />
          <Stat value="4,8/5" title="Kundnöjdhet" desc="Genomsnittligt betyg" />
        </div>
      </div>
    </section>
  );
}
