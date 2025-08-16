'use client'

import { useState, useMemo } from 'react'
import { Card } from '../Card'
import { Button } from '../Button'

export function BookingsROICalculator() {
  const [currentRevenue, setCurrentRevenue] = useState(100000)
  const [currentConversion, setCurrentConversion] = useState(0.05)
  const [expectedImprovement, setExpectedImprovement] = useState(1.0)

  // Memoized calculations for better performance
  const calculations = useMemo(() => {
    if (currentRevenue <= 0 || currentConversion <= 0 || expectedImprovement <= 0) {
      return {
        currentBookings: 0,
        newBookings: 0,
        revenueIncrease: 0,
        newTotalRevenue: 0
      }
    }

    const currentBookings = currentRevenue * currentConversion
    const newBookings = currentBookings * (1 + expectedImprovement)
    const revenueIncrease = newBookings - currentBookings
    const newTotalRevenue = currentRevenue + revenueIncrease

    return {
      currentBookings,
      newBookings,
      revenueIncrease,
      newTotalRevenue
    }
  }, [currentRevenue, currentConversion, expectedImprovement])

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
            Nuvarande månadsintäkter (SEK)
          </label>
          <input 
            type="number" 
            min="0"
            step="1000"
            value={currentRevenue}
            onChange={(e) => handleInputChange(setCurrentRevenue, e.target.value)}
            placeholder="100,000"
            className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-25 rounded-card text-ink placeholder-ink-dim focus:outline-none focus:ring-2 focus:ring-blue transition-colors"
          />
          <p className="text-xs text-ink-dim mt-1">Dina nuvarande månadsintäkter</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-ink mb-2">
            Nuvarande konverteringsgrad
          </label>
          <select 
            value={currentConversion}
            onChange={(e) => handleSelectChange(setCurrentConversion, e.target.value)}
            className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-25 rounded-card text-ink focus:outline-none focus:ring-2 focus:ring-blue transition-colors"
          >
            <option value={0.02}>2% (Låg)</option>
            <option value={0.05}>5% (Genomsnittlig)</option>
            <option value={0.08}>8% (Bra)</option>
            <option value={0.12}>12% (Mycket bra)</option>
          </select>
          <p className="text-xs text-ink-dim mt-1">Hur många besökare som bokar</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">
            Förväntad förbättring med bokningssystem
          </label>
          <select 
            value={expectedImprovement}
            onChange={(e) => handleSelectChange(setExpectedImprovement, e.target.value)}
            className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-25 rounded-card text-ink focus:outline-none focus:ring-2 focus:ring-blue transition-colors"
          >
            <option value={0.5}>50% förbättring</option>
            <option value={1.0}>100% förbättring</option>
            <option value={1.5}>150% förbättring</option>
            <option value={2.0}>200% förbättring</option>
          </select>
          <p className="text-xs text-ink-dim mt-1">Förväntad ökning av konvertering</p>
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
            Baserat på {currentConversion * 100}% konvertering + {expectedImprovement * 100}% förbättring
          </div>
        </div>

        <div className="text-center">
          <Button variant="primary" size="lg" href="/booking">
            Boka gratis demo
          </Button>
        </div>
      </div>
    </Card>
  )
}
