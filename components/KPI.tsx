import { ReactNode } from 'react'
import { Card } from './Card'

interface KPIProps {
  value: string | number
  label: string
  description?: string
  icon?: ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  className?: string
}

export function KPI({ value, label, description, icon, trend, className = '' }: KPIProps) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        {icon && (
          <div className="w-8 h-8 rounded-lg bg-primary-600/10 text-primary-600 flex items-center justify-center">
            {icon}
          </div>
        )}
        {trend && (
          <div className="text-sm font-medium text-success">
            +{trend.value}%
          </div>
        )}
      </div>
      
      <div className="mb-2">
        <div className="text-3xl font-bold text-ink-950">{value}</div>
        <div className="text-base font-medium text-ink-700">{label}</div>
      </div>
      
      <p className="text-sm text-ink-600">{description}</p>
    </Card>
  )
}
