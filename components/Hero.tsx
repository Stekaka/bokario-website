import { ReactNode } from "react";
import { ThemeSurface } from "./ThemeSurface";
import { Button } from "./Button";

type Props = {
  title: ReactNode;
  sub?: ReactNode;
  ctas?: ReactNode;
  align?: "center" | "left";
  kicker?: string;
  trustText?: ReactNode;
};

export function Hero({ title, sub, ctas, align = "center", kicker, trustText }: Props) {
  const isCenter = align === "center";
  
  return (
    <ThemeSurface>
      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className={`container-bk max-w-6xl ${isCenter ? "text-center" : ""}`}>
          {kicker && (
            <div className="mb-8 inline-flex items-center gap-2 rounded-pill border border-white/20 px-6 py-3 text-sm text-ink-dim bg-white/5 backdrop-blur-sm">
              {kicker}
            </div>
          )}
          
          <h1 className="font-display text-h1 text-ink mb-8 tracking-tight leading-tight">
            {title}
          </h1>
          
          {sub && (
            <p className={`lede max-w-4xl ${isCenter ? "mx-auto" : ""} mb-12`}>
              {sub}
            </p>
          )}
          
          {ctas && (
            <div className={`flex flex-wrap gap-6 ${isCenter ? "justify-center" : ""}`}>
              {ctas}
            </div>
          )}
          
          {trustText && (
            <p className="mt-8 text-sm text-ink-dim opacity-80">
              {trustText}
            </p>
          )}
        </div>
      </section>
    </ThemeSurface>
  );
}
