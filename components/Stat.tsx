interface StatProps {
  value: string;
  title: string;
  desc: string;
  className?: string;
}

export function Stat({ value, title, desc, className = '' }: StatProps) {
  return (
    <div className={`group relative overflow-hidden rounded-card bg-gradient-to-br from-surface/50 to-surface/30 backdrop-blur-sm border border-white/10 p-6 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${className}`}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue/5 via-teal/5 to-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Glowing border effect */}
      <div className="absolute inset-0 rounded-card bg-gradient-to-r from-blue/20 via-teal/20 to-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
      
      {/* Content */}
      <div className="relative z-10 text-center">
        <div className="text-4xl font-black text-ink mb-3 leading-none bg-gradient-to-r from-ink via-white to-ink bg-clip-text text-transparent group-hover:from-blue group-hover:via-teal group-hover:to-purple transition-all duration-500">
          {value}
        </div>
        
        <div className="text-lg font-bold text-ink mb-2 group-hover:text-teal transition-colors duration-300">
          {title}
        </div>
        
        <div className="text-sm text-ink-dim leading-relaxed group-hover:text-ink/80 transition-colors duration-300">
          {desc}
        </div>
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-blue/30 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-4 left-4 w-1 h-1 bg-teal/30 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200" />
    </div>
  );
}
