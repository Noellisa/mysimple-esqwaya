import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="max-w-4xl mx-auto py-8 md:py-14 px-4">
      {/* Top hand-drawn header */}
      <div className="flex items-start justify-between mb-16 md:mb-24">
        <div>
          <p className="text-sm tracking-[0.3em] uppercase text-foreground/70">Law · Study</p>
          <p className="text-sm tracking-[0.3em] uppercase text-foreground/70">Case notes</p>
          <p className="text-sm tracking-[0.3em] uppercase text-foreground/70">Ghana</p>
        </div>
        <div className="text-right">
          <p className="font-hand text-3xl leading-none">簡</p>
          <p className="font-hand text-3xl leading-none">単</p>
        </div>
      </div>

      {/* Hero */}
      <div className="mb-16 md:mb-20">
        <h1 className="font-hand text-6xl md:text-8xl font-bold leading-[0.95] tracking-tight">
          my simple
          <br />
          <span className="relative inline-block">
            Esqwaya
            <span className="absolute left-0 -bottom-1 w-full h-1 bg-foreground rounded-full" />
          </span>
          <span className="text-4xl md:text-5xl align-top ml-3">~</span>
        </h1>
        <p className="mt-6 font-hand text-2xl md:text-3xl text-foreground/80 max-w-2xl leading-snug">
          a small, hand-drawn study companion for law students —
          collect cases, sketch the connections between them, and
          test what sticks.
        </p>
      </div>

      {/* Illustration + list */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="border-2 border-foreground rounded-md p-8 relative bg-card">
          <span className="absolute -top-3 left-6 bg-background px-3 font-hand text-xl">
            what's inside ~
          </span>
          <ul className="space-y-4 font-hand text-2xl">
            <li className="flex items-start gap-3">
              <span>◦</span>
              <span>a directory of landmark cases</span>
            </li>
            <li className="flex items-start gap-3">
              <span>◦</span>
              <span>a map of how cases relate</span>
            </li>
            <li className="flex items-start gap-3">
              <span>◦</span>
              <span>flashcards & quiz mode (soon)</span>
            </li>
          </ul>
        </div>

        {/* Simple hand-drawn SVG illustration */}
        <div className="flex justify-center">
          <svg viewBox="0 0 240 240" className="w-64 h-64" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {/* book */}
            <path d="M40 180 Q120 160 200 180 L200 90 Q120 70 40 90 Z" />
            <path d="M120 75 L120 175" />
            {/* pages */}
            <path d="M55 105 L105 100" strokeWidth="1.5" />
            <path d="M55 120 L100 116" strokeWidth="1.5" />
            <path d="M55 135 L108 132" strokeWidth="1.5" />
            <path d="M135 100 L185 105" strokeWidth="1.5" />
            <path d="M140 116 L185 120" strokeWidth="1.5" />
            <path d="M132 132 L185 135" strokeWidth="1.5" />
            {/* squiggles */}
            <path d="M30 55 Q40 48 50 55 T70 55" strokeWidth="1.5" />
            <path d="M180 40 Q190 33 200 40 T220 40" strokeWidth="1.5" />
            <path d="M190 210 Q200 203 210 210" strokeWidth="1.5" />
            {/* little star */}
            <path d="M55 210 L55 220 M50 215 L60 215" strokeWidth="1.5" />
          </svg>
        </div>
      </div>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12">
        <Link
          to="/cases"
          className="font-hand text-2xl border-2 border-foreground px-6 py-2 rounded-full hover:bg-foreground hover:text-background transition-colors"
        >
          open the case directory →
        </Link>
        <Link
          to="/relationships"
          className="font-hand text-2xl underline underline-offset-4 hover:opacity-70"
        >
          or see the map ~
        </Link>
      </div>

      {/* Footer note */}
      <div className="border-t border-foreground/30 pt-6 flex justify-between items-end font-hand text-lg text-foreground/70">
        <div>
          <p>made with pen & patience</p>
          <p>~ v.01</p>
        </div>
        <p className="text-right">accra · 2026</p>
      </div>
    </div>
  );
}
