import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, GitFork, GraduationCap, Sparkles } from "lucide-react";
import heroImg from "@/assets/welcome-hero.jpg";

const features = [
  {
    icon: BookOpen,
    title: "Case Directory",
    desc: "Landmark cases with facts, ratio & principles.",
    to: "/cases",
  },
  {
    icon: GitFork,
    title: "Relationships",
    desc: "Visualise how precedents connect.",
    to: "/relationships",
  },
  {
    icon: GraduationCap,
    title: "Study & Quiz",
    desc: "Flashcards and multiple-choice practice.",
    to: "/study",
  },
];

export default function Welcome() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 md:py-16">
      {/* Hero */}
      <section className="glass-strong glass-glow overflow-hidden relative p-6 md:p-10 mb-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs tracking-wider uppercase text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              For Ghanaian law students
            </div>
            <h1 className="mt-5 text-4xl md:text-6xl font-bold leading-[1.05]">
              my simple <span className="neon-text">Esqwaya</span>
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-md leading-relaxed">
              A liquid, luminous companion for studying case law — collect cases,
              map their connections, and quiz what sticks.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/cases"
                className="group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-primary-foreground"
                style={{ background: "var(--gradient-glow)", boxShadow: "var(--shadow-glow)" }}
              >
                Open case directory
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                to="/study"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur px-5 py-2.5 text-sm font-medium hover:bg-white/10 transition"
              >
                Start a quiz
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl opacity-60 blur-3xl"
                 style={{ background: "var(--gradient-glow-soft)" }} />
            <img
              src={heroImg}
              alt="Glowing glass illustration of a law book with floating justice icons"
              width={1280}
              height={1024}
              className="relative rounded-2xl border border-white/10 shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-5">
        {features.map((f) => (
          <Link
            key={f.title}
            to={f.to}
            className="glass p-6 group hover:border-white/20 transition relative overflow-hidden"
          >
            <div
              className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-30 blur-2xl group-hover:opacity-60 transition"
              style={{ background: "var(--gradient-glow)" }}
            />
            <f.icon className="h-6 w-6 text-primary relative" strokeWidth={1.5} />
            <h3 className="mt-4 text-xl font-semibold relative">{f.title}</h3>
            <p className="mt-1.5 text-sm text-muted-foreground relative">{f.desc}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary relative">
              Explore <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </section>

      <footer className="mt-14 flex justify-between text-xs text-muted-foreground tracking-widest uppercase">
        <span>Accra · 2026</span>
        <span>v.01 — liquid edition</span>
      </footer>
    </div>
  );
}
