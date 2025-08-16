import { ReactNode } from 'react'

interface LogoRowProps {
  title?: string
  children: ReactNode
  className?: string
}

export function LogoRow() {
  const items = ["LOGO 1", "LOGO 2", "LOGO 3", "LOGO 4", "LOGO 5"];
  
  return (
    <section className="section-tight bg-surface">
      <div className="container-bk">
        <div className="text-center mb-12">
          <p className="text-sm text-ink-dim font-medium">Företag som litar på oss</p>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-16 opacity-55 grayscale">
          {items.map((logo) => (
            <div key={logo} className="text-2xl font-bold text-ink-dim tracking-wide">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
