'use client'

import { useState } from 'react'
import { Card } from '../Card'
import { Button } from '../Button'

export function RoiCalculator() {
  const [revenue, setRevenue] = useState(5000)
  const [extraBookings, setExtraBookings] = useState(10)
  const [monthlyFee, setMonthlyFee] = useState(2500)

  const extraRevenue = revenue * extraBookings
  const roi = monthlyFee > 0 ? ((extraRevenue - monthlyFee) / monthlyFee) * 100 : 0
  const isPositive = roi > 0

  return (
    <Card className="p-8">
      <h3 className="text-h3 text-ink-950 mb-6">ROI-kalkylator</h3>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">
              Intäkt per bokning (kr)
            </label>
            <input
              type="number"
              value={revenue}
              onChange={(e) => setRevenue(Number(e.target.value))}
              className="w-full px-4 py-3 border border-line rounded-12 focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              placeholder="5000"
            />
            <p className="text-xs text-ink-600 mt-1">Genomsnittlig intäkt per bokning</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">
              Extra bokningar per månad (st)
            </label>
            <input
              type="number"
              value={extraBookings}
              onChange={(e) => setExtraBookings(Number(e.target.value))}
              className="w-full px-4 py-3 border border-line rounded-12 focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              placeholder="10"
            />
            <p className="text-xs text-ink-600 mt-1">Förväntade extra bokningar</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">
              Månadsavgift (kr)
            </label>
            <input
              type="number"
              value={monthlyFee}
              onChange={(e) => setMonthlyFee(Number(e.target.value))}
              className="w-full px-4 py-3 border border-line rounded-12 focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              placeholder="2500"
            />
            <p className="text-xs text-ink-600 mt-1">Vår månadsavgift för tjänsten</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="text-center p-6 bg-mist-50 rounded-12">
            <div className="text-2xl font-bold text-ink-950 mb-2">
              {extraRevenue.toLocaleString('sv-SE')} kr
            </div>
            <div className="text-sm text-ink-600">Extra intäkter per månad</div>
          </div>
          
          <div className="text-center p-6 bg-mist-50 rounded-12">
            <div className={`text-3xl font-bold mb-2 ${isPositive ? 'text-success' : 'text-red-500'}`}>
              {roi.toFixed(1)}%
            </div>
            <div className="text-sm text-ink-600">ROI (Return on Investment)</div>
          </div>
          
          <div className="text-center p-4 bg-mist-100 rounded-12">
            <div className="text-sm text-ink-700">
              {isPositive 
                ? `Du tjänar ${(extraRevenue - monthlyFee).toLocaleString('sv-SE')} kr netto per månad`
                : 'Tjänsten behöver optimeras för att bli lönsam'
              }
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <Button as="a" href="/#kontakt" size="lg">
          Boka demo för att se ditt ROI
        </Button>
      </div>
    </Card>
  )
}
