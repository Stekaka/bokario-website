'use client'

import { useState, useMemo } from 'react'
import { Card } from '../Card'
import { Button } from '../Button'

export function BookingsEstimator() {
  const [adBudget, setAdBudget] = useState(10000)
  const [cpc, setCpc] = useState(15)
  const [cvr, setCvr] = useState(3)
  const [noShow, setNoShow] = useState(20)
  const [revenuePerBooking, setRevenuePerBooking] = useState(5000)

  // Memoized calculations for better performance
  const calculations = useMemo(() => {
    if (cpc <= 0 || cvr <= 0 || noShow < 0 || noShow > 100) {
      return {
        clicks: 0,
        bookings: 0,
        totalRevenue: 0,
        roi: 0
      }
    }

    const clicks = adBudget / cpc
    const bookings = clicks * (cvr / 100) * (1 - noShow / 100)
    const totalRevenue = bookings * revenuePerBooking
    const roi = adBudget > 0 ? ((totalRevenue - adBudget) / adBudget) * 100 : 0

    return {
      clicks,
      bookings,
      totalRevenue,
      roi
    }
  }, [adBudget, cpc, cvr, noShow, revenuePerBooking])

  const handleInputChange = (setter: (value: number) => void, value: string) => {
    const numValue = Number(value)
    if (!isNaN(numValue) && numValue >= 0) {
      setter(numValue)
    }
  }

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
              min="0"
              step="100"
              value={adBudget}
              onChange={(e) => handleInputChange(setAdBudget, e.target.value)}
              className="w-full px-4 py-3 border border-line rounded-12 focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors"
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
              min="0.01"
              step="0.01"
              value={cpc}
              onChange={(e) => handleInputChange(setCpc, e.target.value)}
              className="w-full px-4 py-3 border border-line rounded-12 focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors"
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
              min="0.01"
              max="100"
              step="0.01"
              value={cvr}
              onChange={(e) => handleInputChange(setCvr, e.target.value)}
              className="w-full px-4 py-3 border border-line rounded-12 focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors"
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
              min="0"
              max="100"
              step="0.1"
              value={noShow}
              onChange={(e) => handleInputChange(setNoShow, e.target.value)}
              className="w-full px-4 py-3 border border-line rounded-12 focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors"
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
              min="0"
              step="100"
              value={revenuePerBooking}
              onChange={(e) => handleInputChange(setRevenuePerBooking, e.target.value)}
              className="w-full px-4 py-3 border border-line rounded-12 focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors"
              placeholder="5000"
            />
            <p className="text-xs text-ink-600 mt-1">Genomsnittlig intäkt per bokning</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="text-center p-6 bg-mist-50 rounded-12 border border-mist-200">
            <div className="text-2xl font-bold text-ink-950 mb-2">
              {calculations.clicks.toFixed(0)}
            </div>
            <div className="text-sm text-ink-600">Förväntade klick per månad</div>
          </div>
          
          <div className="text-center p-6 bg-mist-50 rounded-12 border border-mist-200">
            <div className="text-2xl font-bold text-ink-950 mb-2">
              {calculations.bookings.toFixed(1)}
            </div>
            <div className="text-sm text-ink-600">Förväntade bokningar per månad</div>
          </div>
          
          <div className="text-center p-6 bg-primary-600/10 rounded-12 border border-primary-200">
            <div className="text-3xl font-bold text-primary-600 mb-2">
              {calculations.totalRevenue.toLocaleString('sv-SE')} kr
            </div>
            <div className="text-sm text-ink-600">Total intäkt per månad</div>
          </div>
          
          <div className="text-center p-4 bg-mist-100 rounded-12 border border-mist-200">
            <div className={`text-sm font-medium ${calculations.roi >= 0 ? 'text-success' : 'text-red-500'}`}>
              ROI: {calculations.roi.toFixed(1)}%
            </div>
            <div className="text-xs text-ink-600 mt-1">
              {calculations.roi >= 0 ? 'Positiv avkastning' : 'Negativ avkastning'}
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <Button href="/bookings" size="lg">
          Optimera ditt bokningsflöde
        </Button>
      </div>
    </Card>
  )
}
