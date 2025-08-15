'use client'

import { useState } from 'react'
import { Card } from '../Card'
import { Button } from '../Button'

export function ReviewsImpactCalculator() {
  const [currentRating, setCurrentRating] = useState(4.2)
  const [targetRating, setTargetRating] = useState(4.7)
  const [currentReviews, setCurrentReviews] = useState(25)
  const [monthlyTraffic, setMonthlyTraffic] = useState(1000)
  const [ctrLift, setCtrLift] = useState(15)
  const [cvr, setCvr] = useState(3)
  const [revenuePerBooking, setRevenuePerBooking] = useState(5000)

  const ratingDifference = targetRating - currentRating
  const extraClicks = monthlyTraffic * (ctrLift / 100)
  const extraBookings = extraClicks * (cvr / 100)
  const extraRevenue = extraBookings * revenuePerBooking

  return (
    <Card className="p-8">
      <h3 className="text-h3 text-ink-950 mb-6">Recensionspåverkan-kalkylator</h3>
      
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">
              Nuvarande snittbetyg (1-5)
            </label>
            <input
              type="number"
              step="0.1"
              min="1"
              max="5"
              value={currentRating}
              onChange={(e) => setCurrentRating(Number(e.target.value))}
              className="w-full px-4 py-3 border border-line rounded-12 focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              placeholder="4.2"
            />
            <p className="text-xs text-ink-600 mt-1">Ditt nuvarande Google-snitt</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">
              Målsnitt (1-5)
            </label>
            <input
              type="number"
              step="0.1"
              min="1"
              max="5"
              value={targetRating}
              onChange={(e) => setTargetRating(Number(e.target.value))}
              className="w-full px-4 py-3 border border-line rounded-12 focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              placeholder="4.7"
            />
            <p className="text-xs text-ink-600 mt-1">Målsnitt du vill uppnå</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">
              Antal recensioner nu
            </label>
            <input
              type="number"
              value={currentReviews}
              onChange={(e) => setCurrentReviews(Number(e.target.value))}
              className="w-full px-4 py-3 border border-line rounded-12 focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              placeholder="25"
            />
            <p className="text-xs text-ink-600 mt-1">Nuvarande antal recensioner</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">
              Trafik per månad
            </label>
            <input
              type="number"
              value={monthlyTraffic}
              onChange={(e) => setMonthlyTraffic(Number(e.target.value))}
              className="w-full px-4 py-3 border border-line rounded-12 focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              placeholder="1000"
            />
            <p className="text-xs text-ink-600 mt-1">Besökare som ser ditt företag</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-ink-700 mb-2">
              CTR-lyft (%)
            </label>
            <input
              type="number"
              value={ctrLift}
              onChange={(e) => setCtrLift(Number(e.target.value))}
              className="w-full px-4 py-3 border border-line rounded-12 focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              placeholder="15"
            />
            <p className="text-xs text-ink-600 mt-1">Förväntad ökning av klick</p>
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
              {ratingDifference.toFixed(1)}
            </div>
            <div className="text-sm text-ink-600">Betygsökning att uppnå</div>
          </div>
          
          <div className="text-center p-6 bg-mist-50 rounded-12">
            <div className="text-2xl font-bold text-ink-950 mb-2">
              {extraClicks.toFixed(0)}
            </div>
            <div className="text-sm text-ink-600">Extra klick per månad</div>
          </div>
          
          <div className="text-center p-6 bg-mist-50 rounded-12">
            <div className="text-2xl font-bold text-ink-950 mb-2">
              {extraBookings.toFixed(1)}
            </div>
            <div className="text-sm text-ink-600">Extra bokningar per månad</div>
          </div>
          
          <div className="text-center p-6 bg-success/10 rounded-12">
            <div className="text-3xl font-bold text-success mb-2">
              {extraRevenue.toLocaleString('sv-SE')} kr
            </div>
            <div className="text-sm text-ink-600">Extra intäkter per månad</div>
          </div>
          
          <div className="text-center p-4 bg-mist-100 rounded-12">
            <div className="text-sm text-ink-700">
              {ratingDifference > 0 
                ? `Förbättra ditt betyg med ${ratingDifference.toFixed(1)} stjärnor`
                : 'Ditt betyg är redan på målnivå'
              }
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
        <Button as="a" href="/reviews" size="lg">
          Bygg ditt rykte med fler recensioner
        </Button>
      </div>
    </Card>
  )
}
