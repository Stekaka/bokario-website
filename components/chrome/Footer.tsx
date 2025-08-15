import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <div className="text-lg font-semibold mb-3">Bokario</div>
            <p className="text-sm text-ink-700">Från klick till kalender.</p>
          </div>
          <div>
            <div className="font-semibold mb-3">Produkt</div>
            <ul className="space-y-2 text-sm">
              <li>Maps</li>
              <li>Bookings</li>
              <li>Reviews</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Resurser</div>
            <ul className="space-y-2 text-sm">
              <li>Pris</li>
              <li>Case</li>
              <li>Vanliga frågor</li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-3">Kontakt</div>
            <p className="text-sm">hej@bokario.se</p>
          </div>
        </div>
        <div className="border-t border-line text-xs text-ink-700">
          <div className="py-4">© 2025 Bokario</div>
        </div>
      </div>
    </footer>
  )
}

