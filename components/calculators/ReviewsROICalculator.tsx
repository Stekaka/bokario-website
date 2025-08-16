'use client'

import { useState, useMemo } from 'react'
import { Card } from '../Card'
import { Button } from '../Button'

export function ReviewsROICalculator() {
  const [currentReviews, setCurrentReviews] = useState(25)
  const [currentRating, setCurrentRating] = useState(4.0)
  const [targetReviews, setTargetReviews] = useState(100)

  // Memoized calculations for better performance
  const calculations = useMemo(() => {
    if (currentReviews <= 0 || targetReviews <= 0 || currentRating <= 0) {
      return {
        reviewIncrease: 0,
        ratingImprovement: 0,
        estimatedImpact: 0
      }
    }

    const reviewIncrease = targetReviews - currentReviews
    const ratingImprovement = Math.min(0.5, (targetReviews - currentReviews) / 100) // Max 0.5 improvement
    const estimatedImpact = reviewIncrease * 100 // Rough estimate: each review = 100 SEK value

    return {
      reviewIncrease,
      ratingImprovement,
      estimatedImpact
    }
  }, [currentReviews, targetReviews, currentRating])

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
            Nuvarande antal recensioner
          </label>
          <input 
            type="number" 
            min="1"
            step="1"
            value={currentReviews}
            onChange={(e) => handleInputChange(setCurrentReviews, e.target.value)}
            placeholder="25"
            className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-25 rounded-card text-ink placeholder-ink-dim focus:outline-none focus:ring-2 focus:ring-blue transition-colors"
          />
          <p className="text-xs text-ink-dim mt-1">Antal recensioner du har just nu</p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-ink mb-2">
            Nuvarande genomsnittsbetyg
          </label>
          <select 
            value={currentRating}
            onChange={(e) => handleSelectChange(setCurrentRating, e.target.value)}
            className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-25 rounded-card text-ink focus:outline-none focus:ring-2 focus:ring-blue transition-colors"
          >
            <option value={3.5}>3.5/5 (Lågt)</option>
            <option value={4.0}>4.0/5 (Genomsnittligt)</option>
            <option value={4.3}>4.3/5 (Bra)</option>
            <option value={4.6}>4.6/5 (Mycket bra)</option>
          </select>
          <p className="text-xs text-ink-dim mt-1">Ditt nuvarande Google-snitt</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2">
            Målsättning för recensioner
          </label>
          <select 
            value={targetReviews}
            onChange={(e) => handleSelectChange(setTargetReviews, e.target.value)}
            className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-25 rounded-card text-ink focus:outline-none focus:ring-2 focus:ring-blue transition-colors"
          >
            <option value={50}>50 recensioner</option>
            <option value={100}>100 recensioner</option>
            <option value={200}>200 recensioner</option>
            <option value={500}>500 recensioner</option>
          </select>
          <p className="text-xs text-ink-dim mt-1">Antal recensioner du vill uppnå</p>
        </div>

        <div className="text-center p-6 bg-gradient-to-r from-blue/20 to-teal/20 rounded-card border border-blue/30">
          <div className="text-sm text-ink-dim mb-2">Beräknad påverkan</div>
          <div className="text-3xl font-bold text-ink">
            +{calculations.reviewIncrease} recensioner
          </div>
          <div className="text-sm text-ink-dim mt-2">
            Från {currentReviews} till {targetReviews} recensioner
          </div>
          <div className="text-xs text-ink-dim mt-1">
            Uppskattad värdeökning: {calculations.estimatedImpact.toLocaleString('sv-SE')} SEK
          </div>
          <div className="text-xs text-ink-dim mt-1">
            Förväntad betygsförbättring: {currentRating.toFixed(1)} → {(currentRating + calculations.ratingImprovement).toFixed(1)}
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
