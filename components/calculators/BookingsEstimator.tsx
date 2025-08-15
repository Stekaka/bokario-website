'use client'

import { useState } from 'react'
import { Card } from '../Card'
import { Button } from '../Button'

export function BookingsEstimator() {
  const [adBudget, setAdBudget] = useState(10000)
  const [cpc, setCpc] = useState(15)
  const [cvr, setCvr] = useState(3)
  const [noShow, setNoShow] = useState(20)
  const [revenuePerBooking, setRevenuePerBooking] = useState(5000)

  const clicks = adBudget / cpc
  const bookings = clicks * (cvr / 100) * (1 - noShow / 100)
  const totalRevenue = bookings * revenuePerBooking

  return (
    <Card className="p-8">
      <h3 className="text-h3 text-ink-950 mb-6">Bokningsestimator</h3>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">
              Annonsbudget (kr)
            </label>
            <input
              type="number"
              value={adBudget}
              onChange={(e) => setAdBudget(Number(e.target.value))}
              className="w-full px-4 py-3 border border-line rounded-12 focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              placeholder="10000"
            />
            <p className="text-xs text-ink-600 mt-1">Månadsbudget för Google Ads</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">
              CPC - Kostnad per klick (kr)
            </label>
            <input
              type="number"
              value={cpc}
              onChange={(e) => setCpc(Number(e.target.value))}
              className="w-full px-4 py-3 border border-line rounded-12 focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              placeholder="15"
            />
            <p className="text-xs text-ink-600 mt-1">Genomsnittlig kostnad per klick</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">
              CVR - Konverteringsgrad (%)
            </label>
            <input
              type="number"
              value={cvr}
              onChange={(e) => setCvr(Number(e.target.value))}
              className="w-full px-4 py-3 border border-line rounded-12 focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              placeholder="3"
            />
            <p className="text-xs text-ink-600 mt-1">Procent klick som blir bokningar</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">
              No-show rate (%)
            </label>
            <input
              type="number"
              value={noShow}
              onChange={(e) => setNoShow(Number(e.target.value))}
              className="w-full px-4 py-3 border border-line rounded-12 focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              placeholder="20"
            />
            <p className="text-xs text-ink-600 mt-1">Procent bokningar som inte dyker upp</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">
              Intäkt per bokning (kr)
            </label>
            <input
              type="number"
              value={revenuePerBooking}
              onChange={(e) => setRevenuePerBooking(Number(e.target.value))}
              className="w-full px-4 py-3 border border-line rounded-12 focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              placeholder="5000"
            />
            <p className="text-xs text-ink-600 mt-1">Genomsnittlig intäkt per bokning</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="text-center p-6 bg-mist-50 rounded-12">
            <div className="text-2xl font-bold text-ink-950 mb-2">
              {clicks.toFixed(0)}
            </div>
            <div className="text-sm text-ink-600">Förväntade klick per månad</div>
          </div>
          
          <div className="text-center p-6 bg-mist-50 rounded-12">
            <div className="text-2xl font-bold text-ink-950 mb-2">
              {bookings.toFixed(1)}
            </div>
            <div className="text-sm text-ink-600">Förväntade bokningar per månad</div>
          </div>
          
          <div className="text-center p-6 bg-primary-600/10 rounded-12">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {totalRevenue.toLocaleString('sv-SE')} kr
            </div>
            <div className="text-sm text-ink-600">Total intäkt per månad</div>
          </div>
          
          <div className="text-center p-4 bg-mist-100 rounded-12">
            <div className="text-sm text-ink-700">
              ROI: {((totalRevenue - adBudget) / adBudget * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <Button as="a" href="/bookings" size="lg">
          Optimera ditt bokningsflöde
        </Button>
      </div>
    </Card>
  )
}
