import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, GitFork, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/ink-study.jpg";

const features = [
  { icon: BookOpen, title: "Case Directory", to: "/cases", number: "01" },
  { icon: GitFork, title: "Case Relationships", to: "/relationships", number: "02" },
  { icon: GraduationCap, title: "Study & Quiz", to: "/study", number: "03" },
];

export default function Welcome() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center text-xs font-display text-muted-foreground pb-5 border-b border-border">
        <span>law · study · a little curiosity</span><span aria-hidden="true" className="text-xl text-foreground">~</span>
      </div>
      <section className="welcome-story">
        <img src={heroImg} alt="Black ink illustration of a Ghanaian law student studying beside books and scales of justice" width={1536} height={1024} className="welcome-art" />
        <div className="welcome-copy">
          <p className="text-xs font-display text-muted-foreground mb-6">For Ghanaian law students</p>
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight">my simple<br /><span className="ink-underline">Esqwaya</span></h1>
          <p className="mt-7 text-base text-muted-foreground max-w-xs leading-relaxed">Every case has a story.<br />Make it part of yours.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild><Link to="/cases">Open case directory <ArrowRight /></Link></Button>
            <Button asChild variant="outline"><Link to="/study">Start a quiz</Link></Button>
          </div>
        </div>
      </section>
      <section className="grid sm:grid-cols-3 border-y border-border">
        {features.map(f => <Button key={f.title} variant="ghost" asChild className="h-auto whitespace-normal justify-start rounded-none px-4 py-6 sm:py-8 border-b sm:border-b-0 last:border-b-0 sm:border-r last:border-r-0 border-border"><Link to={f.to}><span className="font-display text-xs text-muted-foreground mr-2">{f.number}</span><f.icon strokeWidth={1.5}/><span className="font-display text-sm">{f.title}</span><ArrowRight className="ml-auto shrink-0"/></Link></Button>)}
      </section>
      <footer className="mt-8 flex justify-between gap-3 text-xs text-muted-foreground font-display"><span>A case at a time.</span><span>my simple Esqwaya ~</span></footer>
    </div>
  );
}
