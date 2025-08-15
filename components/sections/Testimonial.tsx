import { ReactNode } from 'react'
import { Card } from '../Card'

interface TestimonialProps {
  quote: string
  author: string
  company?: string
  avatar?: ReactNode
  rating?: number
  className?: string
}

export function Testimonial({ quote, author, company, avatar, rating, className = '' }: TestimonialProps) {
  return (
    <Card className="p-8">
      <div className="flex gap-1 mb-4">
        {[...Array(rating)].map((_, i) => (
          <svg key={i} className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      
      <blockquote className="text-xl text-ink-800 italic mb-8">
        &ldquo;{quote}&rdquo;
      </blockquote>
      
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-mist-200 flex items-center justify-center">
          <span className="text-lg font-semibold text-ink-600">
            {author.charAt(0)}
          </span>
        </div>
        <div>
          <div className="font-medium text-ink-950">{author}</div>
          <div className="text-sm text-ink-600">{company}</div>
        </div>
      </div>
    </Card>
  )
}
