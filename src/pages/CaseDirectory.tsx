import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const cases = [
  {
    id: 1,
    name: "Salomon v Salomon & Co Ltd",
    year: "1897",
    area: "Company Law",
    facts: "Mr Salomon incorporated his business and issued himself debentures. The company went insolvent.",
    held: "A company is a separate legal entity from its shareholders.",
    principle: "Corporate personality / Separate legal entity",
  },
  {
    id: 2,
    name: "Foss v Harbottle",
    year: "1843",
    area: "Company Law",
    facts: "Minority shareholders sued the directors of a company, claiming they had misapplied and wasted company assets.",
    held: "The claim was dismissed. If a wrong is done to a company, the company itself is the only legal person who can sue.",
    principle: "The proper plaintiff rule / Majority rule",
  },
  {
    id: 3,
    name: "Lee v Lee's Air Farming Ltd",
    year: "1961",
    area: "Company Law",
    facts: "Mr Lee formed a company where he was the sole director and majority shareholder. He also employed himself as the chief pilot. He died in a work crash, and his widow claimed workers' compensation.",
    held: "The widow was entitled to compensation. Mr Lee and the company were separate legal entities.",
    principle: "Separate legal personality / Capacity of a company to contract with its directors",
  },
  {
    id: 4,
    name: "Carlill v Carbolic Smoke Ball Co",
    year: "1893",
    area: "Contract Law",
    facts: "A company advertised a £100 reward to anyone who caught the flu after using their smoke ball as directed. Mrs. Carlill used it, caught the flu, and claimed the reward.",
    held: "The advertisement constituted a legally binding unilateral offer to the whole world.",
    principle: "Unilateral contracts / Offers to the world at large",
  },
  {
    id: 5,
    name: "Hyde v Wrench",
    year: "1840",
    area: "Contract Law",
    facts: "Wrench offered to sell his farm for £1,000. Hyde offered £950. Wrench refused. Hyde then tried to accept the original £1,000 offer.",
    held: "There was no contract. Hyde's offer of £950 was a counter-offer, which destroyed the original offer.",
    principle: "Counter-offers destroy original offers",
  },
  {
    id: 6,
    name: "Hadley v Baxendale",
    year: "1854",
    area: "Contract Law",
    facts: "A mill's crankshaft broke. The carrier delayed delivery, causing lost profits. The owner sued for the lost profits.",
    held: "The carrier was not liable because the special circumstances were not communicated at the time of contract.",
    principle: "Remoteness of damages in contract / Foreseeability of loss",
  },
  {
    id: 7,
    name: "Donoghue v Stevenson",
    year: "1932",
    area: "Tort Law",
    facts: "A woman found a decomposed snail in her ginger beer bottle. She suffered gastroenteritis and shock.",
    held: "The manufacturer owed a duty of care to the end consumer, even without a direct contract.",
    principle: "The neighbour principle / Duty of care in negligence",
  },
  {
    id: 8,
    name: "Caparo Industries plc v Dickman",
    year: "1990",
    area: "Tort Law",
    facts: "Caparo relied on inaccurate audited accounts to purchase shares and launch a takeover. Caparo sued the auditors.",
    held: "The auditors owed a duty to shareholders as a body, not to individual investors.",
    principle: "Three-stage test for duty of care (Foreseeability, Proximity, Fair/Just/Reasonable)",
  },
  {
    id: 9,
    name: "Rylands v Fletcher",
    year: "1868",
    area: "Tort Law",
    facts: "A mill owner built a reservoir. Water flooded a neighboring mine through abandoned shafts.",
    held: "The mill owner was strictly liable for the damage, even without personal negligence.",
    principle: "Strict liability / Non-natural use of land / Escape of dangerous things",
  },
];

const areas = ["All", "Company Law", "Contract Law", "Tort Law"] as const;

const areaColors: Record<string, string> = {
  "Company Law": "bg-primary/20 text-primary border-primary/30",
  "Contract Law": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Tort Law": "bg-violet-500/20 text-violet-400 border-violet-500/30",
};

export default function CaseDirectory() {
  const [search, setSearch] = useState("");
  const [activeArea, setActiveArea] = useState<string>("All");

  const filtered = cases.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.principle.toLowerCase().includes(search.toLowerCase());
    const matchesArea = activeArea === "All" || c.area === activeArea;
    return matchesSearch && matchesArea;
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground font-serif">Case Directory</h1>
        <p className="text-muted-foreground mt-1">Browse landmark legal cases by area of law</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by case name or principle..."
            className="pl-10 bg-card border-border"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {areas.map((area) => (
            <Button
              key={area}
              size="sm"
              variant={activeArea === area ? "default" : "outline"}
              onClick={() => setActiveArea(area)}
              className="text-xs"
            >
              {area}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="bg-card border border-border rounded-lg p-5 hover:border-primary/40 transition-colors cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                {c.name}
              </h3>
              <span className="text-xs text-muted-foreground shrink-0">({c.year})</span>
            </div>
            <div className="mb-3">
              <Badge variant="outline" className={areaColors[c.area] || ""}>
                {c.area}
              </Badge>
            </div>
            <p className="text-sm text-primary/80 font-medium leading-relaxed">{c.principle}</p>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          No cases found matching your search.
        </div>
      )}
    </div>
  );
}
