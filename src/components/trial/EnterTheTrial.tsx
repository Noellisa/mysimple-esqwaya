import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, Pause, Play, RotateCcw, Scale, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trialStories, trialStages, TRIAL_STAGE_DURATION, nextTrialStage } from "@/data/trialStories";
import TrialScene from "./TrialScene";

export default function EnterTheTrial({ initialCaseId, onClose }: { initialCaseId: number; onClose: () => void }) {
  const [caseId, setCaseId] = useState(initialCaseId);
  const [stage, setStage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [completed, setCompleted] = useState(false);
  const story = trialStories.find(c => c.id === caseId) ?? trialStories[0];
  useEffect(() => {
    if (!playing) return;
    const timer = window.setTimeout(() => {
      if (stage === 2) { setPlaying(false); setCompleted(true); }
      else setStage(nextTrialStage(stage));
    }, TRIAL_STAGE_DURATION);
    return () => window.clearTimeout(timer);
  }, [playing, stage, caseId]);
  function jump(value: number) { setStage(value); setPlaying(false); setCompleted(false); }
  function replay() { setStage(0); setCompleted(false); setPlaying(true); }

  return <section className="trial-player border border-border rounded-lg overflow-hidden bg-card" aria-label="Enter the Trial">
    <div className="flex items-start justify-between gap-3 p-5 border-b border-border">
      <div><div className="flex items-center gap-2 text-primary mb-1"><Scale className="h-5 w-5"/><h2 className="text-xl font-semibold">Enter the Trial</h2></div><p className="text-xs text-muted-foreground">Case story · {story.area} · {story.year}</p></div>
      <Button size="icon" variant="ghost" onClick={onClose} aria-label="Close trial" title="Close trial"><X/></Button>
    </div>
    <div className="p-5 border-b border-border"><label htmlFor="trial-case" className="text-xs text-muted-foreground block mb-2">Case</label><select id="trial-case" value={caseId} onChange={e => { setCaseId(Number(e.target.value)); jump(0); }} className="w-full rounded-md border border-input bg-background text-foreground p-3 text-sm"><optgroup label="Company Law">{trialStories.filter(c => c.area === "Company Law").map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</optgroup><optgroup label="Contract Law">{trialStories.filter(c => c.area === "Contract Law").map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</optgroup><optgroup label="Tort Law">{trialStories.filter(c => c.area === "Tort Law").map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</optgroup></select></div>
    <div className="grid grid-cols-3 border-b border-border" aria-label="Story stages">{trialStages.map((name, i) => <Button key={name} variant="ghost" onClick={() => jump(i)} aria-current={stage === i ? "step" : undefined} className={`rounded-none h-14 text-xs sm:text-sm px-1 border-b-2 ${stage === i ? "border-primary text-primary bg-primary/10" : "border-transparent text-muted-foreground"}`}><span className="hidden sm:inline">0{i + 1}</span>{name}</Button>)}</div>
    <div className="trial-art"><TrialScene story={story} stage={stage}/></div>
    <div className="px-5 sm:px-8 pb-6 min-h-[210px]" aria-live="polite"><p className="text-xs text-primary mb-2">{trialStages[stage]} · {stage + 1} of 3</p><h3 className="text-xl sm:text-2xl font-semibold mb-3">{story.titles[stage]}</h3><p className="text-sm sm:text-base leading-relaxed text-foreground/90">{stage === 0 ? story.opening : stage === 1 ? story.conflict : story.held}</p>{stage === 2 && <div className="mt-4 border-l-2 border-primary pl-4"><p className="text-xs text-primary mb-1">Remember this</p><p className="text-sm text-muted-foreground">{story.cue}</p></div>}</div>
    <div className="p-4 border-t border-border flex items-center justify-between gap-2 flex-wrap"><div className="flex gap-1"><Button variant="ghost" size="icon" aria-label="Previous stage" title="Previous stage" disabled={stage === 0} onClick={() => jump(stage - 1)}><ArrowLeft/></Button><Button variant="ghost" size="icon" aria-label="Replay story" title="Replay story" onClick={replay}><RotateCcw/></Button></div><Button onClick={() => completed ? replay() : setPlaying(!playing)}>{playing ? <Pause/> : completed ? <RotateCcw/> : <Play/>}{playing ? "Pause" : completed ? "Replay story" : "Play story"}</Button><Button variant="ghost" size="icon" aria-label="Next stage" title="Next stage" disabled={stage === 2} onClick={() => jump(nextTrialStage(stage))}><ArrowRight/></Button></div>
    <p className="px-5 pb-4 text-xs text-muted-foreground">Illustrated case summary, not a verbatim courtroom reconstruction.</p>
  </section>;
}