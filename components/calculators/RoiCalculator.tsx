'use client'

import { useState, useMemo } from 'react'
import { Card } from '../Card'
import { Button } from '../Button'

export function RoiCalculator() {
  const [revenue, setRevenue] = useState(5000)
  const [extraBookings, setExtraBookings] = useState(10)
  const [monthlyFee, setMonthlyFee] = useState(2500)

  // Memoized calculations for better performance
  const calculations = useMemo(() => {
    if (revenue <= 0 || extraBookings <= 0 || monthlyFee < 0) {
      return {
        extraRevenue: 0,
        roi: 0,
        netProfit: 0
      }
    }

    const extraRevenue = revenue * extraBookings
    const roi = monthlyFee > 0 ? ((extraRevenue - monthlyFee) / monthlyFee) * 100 : 0
    const netProfit = extraRevenue - monthlyFee

    return {
      extraRevenue,
      roi,
      netProfit
    }
  }, [revenue, extraBookings, monthlyFee])

  const handleInputChange = (setter: (value: number) => void, value: string) => {
    const numValue = Number(value)
    if (!isNaN(numValue) && numValue >= 0) {
      setter(numValue)
    }
  }

  const isPositive = calculations.roi > 0

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
              min="0"
              step="100"
              value={revenue}
              onChange={(e) => handleInputChange(setRevenue, e.target.value)}
              className="w-full px-4 py-3 border border-line rounded-12 focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors"
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
              min="1"
              step="1"
              value={extraBookings}
              onChange={(e) => handleInputChange(setExtraBookings, e.target.value)}
              className="w-full px-4 py-3 border border-line rounded-12 focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors"
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
              min="0"
              step="100"
              value={monthlyFee}
              onChange={(e) => handleInputChange(setMonthlyFee, e.target.value)}
              className="w-full px-4 py-3 border border-line rounded-12 focus:ring-2 focus:ring-primary-600 focus:border-transparent transition-colors"
              placeholder="2500"
            />
            <p className="text-xs text-ink-600 mt-1">Vår månadsavgift för tjänsten</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="text-center p-6 bg-mist-50 rounded-12 border border-mist-200">
            <div className="text-2xl font-bold text-ink-950 mb-2">
              {calculations.extraRevenue.toLocaleString('sv-SE')} kr
            </div>
            <div className="text-sm text-ink-600">Extra intäkter per månad</div>
          </div>
          
          <div className="text-center p-6 bg-mist-50 rounded-12 border border-mist-200">
            <div className={`text-3xl font-bold mb-2 ${isPositive ? 'text-success' : 'text-red-500'}`}>
              {calculations.roi.toFixed(1)}%
            </div>
            <div className="text-sm text-ink-600">ROI (Return on Investment)</div>
          </div>
          
          <div className="text-center p-4 bg-mist-100 rounded-12 border border-mist-200">
            <div className={`text-sm font-medium ${isPositive ? 'text-success' : 'text-red-500'}`}>
              {isPositive 
                ? `Du tjänar ${calculations.netProfit.toLocaleString('sv-SE')} kr netto per månad`
                : `Du förlorar ${Math.abs(calculations.netProfit).toLocaleString('sv-SE')} kr netto per månad`
              }
            </div>
            <div className="text-xs text-ink-600 mt-1">
              {isPositive 
                ? 'Tjänsten är lönsam'
                : 'Tjänsten behöver optimeras för att bli lönsam'
              }
            </div>
          </div>
          
          <div className="text-center p-4 bg-primary-50 rounded-12 border border-primary-200">
            <div className="text-sm text-ink-700">
              <strong>Break-even:</strong> {monthlyFee > 0 && revenue > 0 
                ? `${(monthlyFee / revenue).toFixed(1)} bokningar/månad`
                : 'Kan inte beräknas'
              }
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center">
                    <Button href="/booking" size="lg">
              Boka demo för att se ditt ROI
            </Button>
      </div>
    </Card>
  )
}
