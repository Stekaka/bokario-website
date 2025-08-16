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

type Props = { eyebrow?: string; value: string; title: string; desc: string };
export function KPI({ eyebrow, value, title, desc }: Props) {
  return (
    <div className="card">
      {eyebrow && <div className="text-success text-[13px] font-semibold mb-1">{eyebrow}</div>}
      <div className="text-[28px] leading-tight font-extrabold mb-1">{value}</div>
      <div className="text-[14px] font-semibold">{title}</div>
      <div className="text-[14px] text-ink-700 mt-1">{desc}</div>
    </div>
  );
}
