import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, RotateCcw, Sparkles, X } from "lucide-react";

type Flashcard = { front: string; back: string; area: string };
type QuizQuestion = { question: string; choices: string[]; answer: number; explanation: string };

const flashcards: Flashcard[] = [
  { area: "Company Law", front: "Salomon v Salomon (1897)", back: "A company is a separate legal entity distinct from its shareholders." },
  { area: "Company Law", front: "Foss v Harbottle (1843)", back: "The proper plaintiff for wrongs done to a company is the company itself (majority rule)." },
  { area: "Company Law", front: "Lee v Lee's Air Farming (1961)", back: "A person may act in a dual capacity as director and employee — the company is a separate person." },
  { area: "Contract Law", front: "Carlill v Carbolic Smoke Ball (1893)", back: "An advertisement can be a unilateral offer; performance of conditions is acceptance." },
  { area: "Contract Law", front: "Hyde v Wrench (1840)", back: "A counter-offer rejects and destroys the original offer." },
  { area: "Contract Law", front: "Hadley v Baxendale (1854)", back: "Damages must arise naturally from breach or be within the reasonable contemplation of both parties." },
  { area: "Tort Law", front: "Donoghue v Stevenson (1932)", back: "The neighbour principle — duty of care owed to those foreseeably affected by one's acts." },
  { area: "Tort Law", front: "Caparo v Dickman (1990)", back: "Three-stage test: foreseeability, proximity, and fair/just/reasonable to impose a duty." },
  { area: "Tort Law", front: "Rylands v Fletcher (1868)", back: "Strict liability for the escape of dangerous things from non-natural use of land." },
];

const quiz: QuizQuestion[] = [
  {
    question: "Which case established that a company is a separate legal entity from its shareholders?",
    choices: ["Foss v Harbottle", "Salomon v Salomon & Co Ltd", "Lee v Lee's Air Farming", "Carlill v Carbolic Smoke Ball"],
    answer: 1,
    explanation: "Salomon v Salomon (1897) firmly established the doctrine of separate corporate personality.",
  },
  {
    question: "In Hyde v Wrench (1840), what was the legal effect of Hyde's £950 offer?",
    choices: ["It was a valid acceptance", "It was a mere inquiry", "It was a counter-offer that destroyed the original offer", "It formed a binding contract"],
    answer: 2,
    explanation: "A counter-offer operates as a rejection and extinguishes the original offer.",
  },
  {
    question: "What principle did Donoghue v Stevenson (1932) establish?",
    choices: ["Strict liability", "The neighbour principle / duty of care", "Privity of contract", "Consideration must move from the promisee"],
    answer: 1,
    explanation: "Lord Atkin's neighbour principle: take reasonable care to avoid acts that could foreseeably injure your neighbour.",
  },
  {
    question: "The three-stage test for duty of care (foreseeability, proximity, fair/just/reasonable) comes from:",
    choices: ["Donoghue v Stevenson", "Rylands v Fletcher", "Caparo Industries v Dickman", "Hadley v Baxendale"],
    answer: 2,
    explanation: "Caparo v Dickman (1990) refined the modern approach to duty of care.",
  },
  {
    question: "Under Hadley v Baxendale, damages for breach of contract are recoverable when the loss:",
    choices: ["Is any loss suffered by the claimant", "Arises naturally OR was within the reasonable contemplation of both parties", "Was foreseeable to the defendant only", "Was communicated after the contract was formed"],
    answer: 1,
    explanation: "The two limbs of Hadley v Baxendale limit recoverable damages by remoteness/foreseeability.",
  },
  {
    question: "Rylands v Fletcher (1868) is best associated with:",
    choices: ["Negligence", "Strict liability for escape of dangerous things", "Nuisance by noise", "Vicarious liability"],
    answer: 1,
    explanation: "Rylands establishes strict liability for non-natural use of land where a dangerous thing escapes.",
  },
  {
    question: "Carlill v Carbolic Smoke Ball Co (1893) is famous for establishing:",
    choices: ["Duty of care to consumers", "Unilateral offers to the world at large", "The postal rule", "The doctrine of frustration"],
    answer: 1,
    explanation: "The advertisement was an offer to the world; performance of the stated act was acceptance.",
  },
  {
    question: "The 'proper plaintiff' rule from Foss v Harbottle means:",
    choices: ["Any shareholder can sue for company wrongs", "Only the company itself can sue for wrongs done to it", "Only directors may sue", "Creditors have priority to sue"],
    answer: 1,
    explanation: "Wrongs to the company are enforced by the company, subject to limited exceptions.",
  },
];

type Mode = "flashcards" | "quiz";

export default function StudyQuiz() {
  const [mode, setMode] = useState<Mode>("flashcards");

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-md border border-border bg-muted px-3 py-1 text-xs uppercase tracking-wider text-primary mb-3">
          <Sparkles className="h-3.5 w-3.5" /> Practice mode
        </div>
        <h1 className="text-4xl font-bold">Study &amp; Quiz</h1>
        <p className="text-muted-foreground mt-1">Reinforce the landmark cases with flashcards and multiple-choice questions.</p>
      </header>

      <div className="glass inline-flex p-1 mb-8 gap-1">
        {(["flashcards", "quiz"] as Mode[]).map((m) => (
          <Button
            key={m}
            variant={mode === m ? "default" : "ghost"}
            onClick={() => setMode(m)}
            className="px-5 py-2 text-sm capitalize"
          >
            {m}
          </Button>
        ))}
      </div>

      {mode === "flashcards" ? <Flashcards /> : <Quiz />}
    </div>
  );
}

function Flashcards() {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const card = flashcards[i];

  const go = (delta: number) => {
    setFlipped(false);
    setI((prev) => (prev + delta + flashcards.length) % flashcards.length);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
        <span>Card {i + 1} of {flashcards.length}</span>
        <span className="uppercase tracking-wider text-primary">{card.area}</span>
      </div>

      <Button variant="outline"
        onClick={() => setFlipped((f) => !f)}
        className="whitespace-normal h-auto glass-strong w-full min-h-[280px] md:min-h-[340px] p-8 md:p-12 flex items-center justify-center text-center transition hover:scale-[1.01]"
      >
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-4">
            {flipped ? "Principle" : "Case"}
          </p>
          <p className="text-2xl md:text-3xl font-semibold leading-snug">
            {flipped ? card.back : card.front}
          </p>
          <p className="text-xs text-muted-foreground mt-6">Tap to flip</p>
        </div>
      </Button>

      <div className="mt-6 flex items-center justify-between gap-3">
        <Button variant="outline" onClick={() => go(-1)}>
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>
        <Button variant="outline" onClick={() => setFlipped((f) => !f)}>
          <RotateCcw className="h-4 w-4" /> Flip
        </Button>
        <Button variant="outline" onClick={() => go(1)}>
          Next <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

function Quiz() {
  const [i, setI] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>([]);
  const q = quiz[i];
  const done = answered.length === quiz.length;

  const submit = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === q.answer;
    if (correct) setScore((s) => s + 1);
    setAnswered((a) => [...a, correct]);
  };

  const next = () => {
    setSelected(null);
    setI((p) => Math.min(p + 1, quiz.length - 1));
  };

  const reset = () => {
    setI(0); setSelected(null); setScore(0); setAnswered([]);
  };

  const percent = useMemo(() => Math.round((score / quiz.length) * 100), [score]);

  if (done) {
    return (
      <div className="glass-strong p-10 text-center">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Result</p>
        <p className="mt-4 text-6xl font-bold font-display">{score}/{quiz.length}</p>
        <p className="mt-3 text-muted-foreground">
          {percent >= 80 ? "Excellent — you're ready." : percent >= 50 ? "Good — review the misses." : "Keep studying, you've got this."}
        </p>
        <Button onClick={reset} className="mt-8">
          <RotateCcw className="h-4 w-4" /> Restart
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
        <span>Question {i + 1} of {quiz.length}</span>
        <span>Score: <span className="text-primary font-medium">{score}</span></span>
      </div>

      <div className="h-1.5 rounded-md bg-muted overflow-hidden mb-6">
        <div
          className="h-full transition-all bg-primary"
          style={{ width: `${((i + (selected !== null ? 1 : 0)) / quiz.length) * 100}%` }}
        />
      </div>

      <div className="glass-strong p-6 md:p-8">
        <p className="text-lg md:text-xl font-medium mb-6 leading-snug">{q.question}</p>
        <div className="space-y-2.5">
          {q.choices.map((c, idx) => {
            const isSel = selected === idx;
            const isCorrect = idx === q.answer;
            const revealed = selected !== null;
            let cls = "border-border hover:border-primary hover:bg-muted";
            if (revealed && isCorrect) cls = "quiz-correct";
            else if (revealed && isSel && !isCorrect) cls = "quiz-incorrect";
            else if (revealed) cls = "border-border opacity-60";
            return (
              <Button variant="outline"
                key={idx}
                disabled={selected !== null}
                onClick={() => submit(idx)}
                className={`whitespace-normal h-auto w-full text-left px-4 py-3 rounded-md border transition flex items-center justify-between gap-3 ${cls}`}
              >
                <span>{c}</span>
                {revealed && isCorrect && <Check className="h-4 w-4 text-primary shrink-0" />}
                {revealed && isSel && !isCorrect && <X className="h-4 w-4 text-destructive shrink-0" />}
              </Button>
            );
          })}
        </div>

        {selected !== null && (
          <div className="mt-6 rounded-md border border-border bg-muted p-4 text-sm text-foreground/90">
            <span className="text-primary font-medium">Why: </span>{q.explanation}
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={next} disabled={selected === null}>
          {i === quiz.length - 1 ? "See result" : "Next"} <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
