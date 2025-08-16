"use client";

import { useState } from 'react';

interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

interface ProcessProps {
  steps: ProcessStep[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function Process({ steps, title, subtitle, className = '' }: ProcessProps) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className={`section bg-surface ${className}`}>
      <div className="container-bk">
        {(title || subtitle) && (
          <div className="text-center mb-20">
            {title && (
              <h2 className="font-display text-h2 text-ink mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="lede mx-auto max-w-2xl">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        <div className="relative max-w-6xl mx-auto">
          {/* Modern step cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div 
                key={step.number} 
                className={`relative group cursor-pointer transition-all duration-500 ${
                  activeStep === index ? 'transform -translate-y-2' : ''
                }`}
                onClick={() => setActiveStep(index)}
              >
                {/* Modern card design */}
                <div className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${
                  activeStep === index 
                    ? 'bg-gradient-to-br from-surface/90 to-surface/70 border border-white/20 shadow-2xl' 
                    : 'bg-surface/60 border border-white/10 hover:border-white/20 hover:bg-surface/70'
                }`}>
                  {/* Subtle background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue/20 via-transparent to-teal/20" />
                  </div>
                  
                  {/* Content */}
                  <div className="relative z-10 p-8">
                    {/* Modern step number */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 transition-all duration-500 ${
                      activeStep === index 
                        ? 'bg-gradient-to-br from-blue to-teal shadow-lg shadow-blue/25' 
                        : 'bg-white/10 group-hover:bg-white/20'
                    }`}>
                      <span className={`text-xl font-bold transition-colors duration-300 ${
                        activeStep === index ? 'text-white' : 'text-ink'
                      }`}>
                        {step.number}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className={`text-xl font-semibold mb-4 transition-colors duration-300 ${
                      activeStep === index ? 'text-blue' : 'text-ink group-hover:text-ink/80'
                    }`}>
                      {step.title}
                    </h3>
                    
                    {/* Description */}
                    <p className={`text-body leading-relaxed transition-colors duration-300 ${
                      activeStep === index ? 'text-ink' : 'text-ink-dim group-hover:text-ink/70'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Active indicator */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue to-teal transition-all duration-500 ${
                    activeStep === index ? 'opacity-100' : 'opacity-0'
                  }`} />
                </div>
                
                {/* Subtle hover effect */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue/5 via-teal/5 to-purple/5 opacity-0 transition-opacity duration-500 ${
                  activeStep === index ? 'opacity-100' : 'group-hover:opacity-100'
                }`} />
              </div>
            ))}
          </div>
          
          {/* Modern progress indicator */}
          <div className="flex justify-center items-center gap-2 mt-12">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`relative transition-all duration-300 ${
                  activeStep === index ? 'scale-125' : 'scale-100 hover:scale-110'
                }`}
              >
                <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeStep === index 
                    ? 'bg-gradient-to-r from-blue to-teal' 
                    : 'bg-ink-dim hover:bg-ink/60'
                }`} />
                
                {/* Active pulse */}
                {activeStep === index && (
                  <div className="absolute inset-0 w-2 h-2 rounded-full bg-gradient-to-r from-blue to-teal animate-ping opacity-75" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
