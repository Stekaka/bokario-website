'use client'

import { useState, useMemo } from 'react'
import { Card } from '../Card'
import { Button } from '../Button'

export function MapsROICalculator() {
  const [currentRevenue, setCurrentRevenue] = useState(50000)
  const [expectedIncrease, setExpectedIncrease] = useState(1.5)

  // Memoized calculations for better performance
  const calculations = useMemo(() => {
    if (currentRevenue <= 0 || expectedIncrease <= 0) {
      return {
        revenueIncrease: 0,
        newTotalRevenue: 0
      }
    }

    const revenueIncrease = currentRevenue * expectedIncrease
    const newTotalRevenue = currentRevenue + revenueIncrease

    return {
      revenueIncrease,
      newTotalRevenue
    }
  }, [currentRevenue, expectedIncrease])

  const handleInputChange = (setter: (value: number) => void, value: string) => {
    const numValue = Number(value)
    if (!isNaN(numValue) && numValue >= 0) {
      setter(numValue)
    }
  }

  const handleSelectChange = (setter: (value: number) => void, value: string) => {
    const numValue = Number(value)
    if (!isNaN(numValue) && numValue >= 0) {
      setter(numValue)
    }
  }

  return (
    <Card variant="glass" className="p-8">
      <div className="grid gap-6">
        <div>
          <label className="block text-sm font-medium text-ink mb-2">
            Nuvarande månadsintäkter från Maps (SEK)
          </label>
          <input 
            type="number" 
            min="0"
            step="1000"
            value={currentRevenue}
            onChange={(e) => handleInputChange(setCurrentRevenue, e.target.value)}
            placeholder="50,000"
            className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-25 rounded-card text-ink placeholder-ink-dim focus:outline-none focus:ring-2 focus:ring-blue transition-colors"
          />
          <p className="text-xs text-ink-dim mt-1">Dina nuvarande Maps-intäkter per månad</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-ink mb-2">
            Förväntad ökning med Maps-optimering
          </label>
          <select 
            value={expectedIncrease}
            onChange={(e) => handleSelectChange(setExpectedIncrease, e.target.value)}
            className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-25 rounded-card text-ink focus:outline-none focus:ring-2 focus:ring-blue transition-colors"
          >
            <option value={0.5}>50% ökning</option>
            <option value={1.0}>100% ökning</option>
            <option value={1.5}>150% ökning</option>
            <option value={2.0}>200% ökning</option>
          </select>
          <p className="text-xs text-ink-dim mt-1">Förväntad ökning av Maps-visningar och samtal</p>
        </div>

        <div className="text-center p-6 bg-gradient-to-r from-blue/20 to-teal/20 rounded-card border border-blue/30">
          <div className="text-sm text-ink-dim mb-2">Beräknad ökning av intäkter</div>
          <div className="text-3xl font-bold text-ink">
            +{calculations.revenueIncrease.toLocaleString('sv-SE')} SEK/månad
          </div>
          <div className="text-sm text-ink-dim mt-2">
            Från {currentRevenue.toLocaleString('sv-SE')} SEK till {calculations.newTotalRevenue.toLocaleString('sv-SE')} SEK
          </div>
          <div className="text-xs text-ink-dim mt-1">
            Baserat på {expectedIncrease * 100}% ökning av Maps-synlighet
          </div>
        </div>

        <div className="text-center">
                        <Button variant="primary" size="lg" href="/booking">
                Boka gratis konsultation
              </Button>
        </div>
      </div>
    </Card>
  )
}
