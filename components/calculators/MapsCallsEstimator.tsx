'use client'

import { useState, useMemo } from 'react'
import { Card } from '../Card'
import { Button } from '../Button'

export function MapsCallsEstimator() {
  const [monthlyViews, setMonthlyViews] = useState(500)
  const [ctrToCalls, setCtrToCalls] = useState(8)
  const [visibilityLift, setVisibilityLift] = useState(25)
  const [showRate, setShowRate] = useState(70)
  const [revenuePerBooking, setRevenuePerBooking] = useState(5000)

  // Memoized calculations for better performance
  const calculations = useMemo(() => {
    if (monthlyViews <= 0 || ctrToCalls <= 0 || ctrToCalls > 100 || visibilityLift < 0 || showRate <= 0 || showRate > 100) {
      return {
        newViews: 0,
        calls: 0,
        bookings: 0,
        totalRevenue: 0,
        visibilityIncrease: 0
      }
    }

    const newViews = monthlyViews * (1 + visibilityLift / 100)
    const calls = newViews * (ctrToCalls / 100)
    const bookings = calls * (showRate / 100)
    const totalRevenue = bookings * revenuePerBooking
    const visibilityIncrease = ((newViews - monthlyViews) / monthlyViews) * 100

    return {
      newViews,
      calls,
      bookings,
      totalRevenue,
      visibilityIncrease
    }
  }, [monthlyViews, ctrToCalls, visibilityLift, showRate, revenuePerBooking])

  const handleInputChange = (setter: (value: number) => void, value: string) => {
    const numValue = Number(value)
    if (!isNaN(numValue) && numValue >= 0) {
      setter(numValue)
    }
  }

  return (
    <Card className="p-8">
      <h3 className="text-h3 text-ink-950 mb-6">Maps-samtal-estimator</h3>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">
              Visningar per månad
            </label>
            <input
              type="number"
              min="1"
              step="1"
              value={monthlyViews}
              onChange={(e) => handleInputChange(setMonthlyViews, e.target.value)}
              className="w-full px-4 py-3 border border-line rounded-12 focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors"
              placeholder="500"
            />
            <p className="text-xs text-ink-600 mt-1">Antal gånger ditt företag visas</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">
              CTR till samtal (%)
            </label>
            <input
              type="number"
              min="0.01"
              max="100"
              step="0.01"
              value={ctrToCalls}
              onChange={(e) => handleInputChange(setCtrToCalls, e.target.value)}
              className="w-full px-4 py-3 border border-line rounded-12 focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors"
              placeholder="8"
            />
            <p className="text-xs text-ink-600 mt-1">Procent visningar som blir samtal</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">
              Synlighetslyft (%)
            </label>
            <input
              type="number"
              min="0"
              step="0.1"
              value={visibilityLift}
              onChange={(e) => handleInputChange(setVisibilityLift, e.target.value)}
              className="w-full px-4 py-3 border border-line rounded-12 focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors"
              placeholder="25"
            />
            <p className="text-xs text-ink-600 mt-1">Förväntad ökning av synlighet</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">
              Show rate (%)
            </label>
            <input
              type="number"
              min="0.01"
              max="100"
              step="0.01"
              value={showRate}
              onChange={(e) => handleInputChange(setShowRate, e.target.value)}
              className="w-full px-4 py-3 border border-line rounded-12 focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors"
              placeholder="70"
            />
            <p className="text-xs text-ink-600 mt-1">Procent samtal som blir bokningar</p>
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
              {calculations.newViews.toFixed(0)}
            </div>
            <div className="text-sm text-ink-600">Nya visningar per månad</div>
          </div>
          
          <div className="text-center p-6 bg-mist-50 rounded-12 border border-mist-200">
            <div className="text-2xl font-bold text-ink-950 mb-2">
              {calculations.calls.toFixed(1)}
            </div>
            <div className="text-sm text-ink-600">Förväntade samtal per månad</div>
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
            <div className="text-sm text-ink-700 font-medium">
              +{visibilityLift}% synlighet = +{calculations.visibilityIncrease.toFixed(0)}% fler visningar
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <Button href="/maps" size="lg">
          Dominera kartan med Google Maps
        </Button>
      </div>
    </Card>
  )
}
