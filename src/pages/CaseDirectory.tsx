import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

interface Case {
  id: number;
  name: string;
  year: string;
  area: string;
  parties: string;
  court: string;
  facts: string;
  held: string;
  ratio: string;
  obiter: string;
  principle: string;
  relatedCases: string[];
}

const cases: Case[] = [
  {
    id: 1,
    name: "Salomon v Salomon & Co Ltd",
    year: "1897",
    area: "Company Law",
    parties: "Aron Salomon v Salomon & Co Ltd",
    court: "House of Lords",
    facts: "Mr Salomon incorporated his business and issued himself debentures. The company went insolvent. Creditors argued Salomon and the company were the same person and he should be personally liable.",
    held: "A company is a separate legal entity from its shareholders. Salomon was not personally liable for the company's debts.",
    ratio: "Once a company is validly incorporated, it is an independent legal person distinct from its members, regardless of the economic reality.",
    obiter: "The court noted that the motives behind incorporation are irrelevant as long as statutory requirements are met.",
    principle: "Corporate personality / Separate legal entity",
    relatedCases: ["Lee v Lee's Air Farming Ltd", "Foss v Harbottle"],
  },
  {
    id: 2,
    name: "Foss v Harbottle",
    year: "1843",
    area: "Company Law",
    parties: "Richard Foss & Edward Starkie Turton v Joseph Harbottle & Others",
    court: "Court of Chancery",
    facts: "Minority shareholders sued the directors of a company, claiming they had misapplied and wasted company assets.",
    held: "The claim was dismissed. If a wrong is done to a company, the company itself is the only legal person who can sue.",
    ratio: "The proper plaintiff in an action for wrongs done to a company is the company itself. The court will not interfere with the internal management of companies acting within their powers.",
    obiter: "Exceptions exist where the act is ultra vires, constitutes fraud on the minority, or requires a special majority.",
    principle: "The proper plaintiff rule / Majority rule",
    relatedCases: ["Salomon v Salomon & Co Ltd"],
  },
  {
    id: 3,
    name: "Lee v Lee's Air Farming Ltd",
    year: "1961",
    area: "Company Law",
    parties: "Mrs Lee v Lee's Air Farming Ltd",
    court: "Privy Council",
    facts: "Mr Lee formed a company where he was the sole director and majority shareholder. He also employed himself as the chief pilot. He died in a work crash, and his widow claimed workers' compensation.",
    held: "The widow was entitled to compensation. Mr Lee and the company were separate legal entities, meaning the company could legally employ him.",
    ratio: "A person can act in a dual capacity — as director and as employee — of the same company because the company is a separate legal person.",
    obiter: "The decision reinforced that the corporate veil should not be lifted merely because one person controls the company.",
    principle: "Separate legal personality / Capacity of a company to contract with its directors",
    relatedCases: ["Salomon v Salomon & Co Ltd"],
  },
  {
    id: 4,
    name: "Carlill v Carbolic Smoke Ball Co",
    year: "1893",
    area: "Contract Law",
    parties: "Louisa Carlill v Carbolic Smoke Ball Company",
    court: "Court of Appeal",
    facts: "A company advertised a £100 reward to anyone who caught the flu after using their smoke ball as directed. Mrs. Carlill used it, caught the flu, and claimed the reward. The company argued it was just an advertising 'puff.'",
    held: "The advertisement constituted a legally binding unilateral offer to the whole world, which Mrs. Carlill accepted by performing the conditions.",
    ratio: "An advertisement can constitute a unilateral offer if it demonstrates an intention to be bound. Performance of the conditions amounts to acceptance; no separate communication of acceptance is needed.",
    obiter: "The court discussed limits on offers to the world at large and the role of consideration in unilateral contracts.",
    principle: "Unilateral contracts / Offers to the world at large",
    relatedCases: ["Hyde v Wrench"],
  },
  {
    id: 5,
    name: "Hyde v Wrench",
    year: "1840",
    area: "Contract Law",
    parties: "Hyde v Wrench",
    court: "Court of Chancery",
    facts: "Wrench offered to sell his farm for £1,000. Hyde offered £950. Wrench refused. Hyde then tried to accept the original £1,000 offer.",
    held: "There was no contract. Hyde's offer of £950 was a counter-offer, which destroyed the original offer.",
    ratio: "A counter-offer operates as a rejection of the original offer and extinguishes it. The original offer cannot subsequently be accepted.",
    obiter: "A mere inquiry about terms does not constitute a counter-offer and would not destroy the original offer.",
    principle: "Counter-offers destroy original offers",
    relatedCases: ["Carlill v Carbolic Smoke Ball Co", "Hadley v Baxendale"],
  },
  {
    id: 6,
    name: "Hadley v Baxendale",
    year: "1854",
    area: "Contract Law",
    parties: "Joseph & Jonah Hadley v Baxendale & Others",
    court: "Court of Exchequer",
    facts: "A mill's crankshaft broke. The carrier delayed delivery, causing lost profits. The owner sued for the lost profits.",
    held: "The carrier was not liable because the special circumstances were not communicated at the time of contract.",
    ratio: "Damages for breach of contract should be such as may fairly and reasonably be considered arising naturally from the breach, or as may reasonably be supposed to have been in the contemplation of both parties at the time of contracting.",
    obiter: "The court noted the importance of communicating special circumstances to establish liability for consequential losses.",
    principle: "Remoteness of damages in contract / Foreseeability of loss",
    relatedCases: ["Hyde v Wrench"],
  },
  {
    id: 7,
    name: "Donoghue v Stevenson",
    year: "1932",
    area: "Tort Law",
    parties: "May Donoghue v David Stevenson",
    court: "House of Lords",
    facts: "A woman found a decomposed snail in her ginger beer bottle. She suffered gastroenteritis and shock.",
    held: "The manufacturer owed a duty of care to the end consumer, even without a direct contract.",
    ratio: "You must take reasonable care to avoid acts or omissions which you can reasonably foresee would be likely to injure your neighbour — persons so closely and directly affected by your act.",
    obiter: "The court discussed the boundaries of the neighbour principle and its potential application beyond product liability.",
    principle: "The neighbour principle / Duty of care in negligence",
    relatedCases: ["Caparo Industries plc v Dickman", "Rylands v Fletcher"],
  },
  {
    id: 8,
    name: "Caparo Industries plc v Dickman",
    year: "1990",
    area: "Tort Law",
    parties: "Caparo Industries plc v Dickman & Others",
    court: "House of Lords",
    facts: "Caparo relied on inaccurate audited accounts to purchase shares and launch a takeover. Caparo sued the auditors.",
    held: "The auditors owed a duty to shareholders as a body, not to individual investors.",
    ratio: "A duty of care in negligence requires three conditions: foreseeability of damage, sufficient proximity between the parties, and that it is fair, just, and reasonable to impose such a duty.",
    obiter: "The court cautioned against an incremental expansion of duty of care and emphasised policy considerations.",
    principle: "Three-stage test for duty of care (Foreseeability, Proximity, Fair/Just/Reasonable)",
    relatedCases: ["Donoghue v Stevenson"],
  },
  {
    id: 9,
    name: "Rylands v Fletcher",
    year: "1868",
    area: "Tort Law",
    parties: "John Rylands v Thomas Fletcher",
    court: "House of Lords",
    facts: "A mill owner built a reservoir. Water flooded a neighboring mine through abandoned shafts.",
    held: "The mill owner was strictly liable for the damage, even without personal negligence.",
    ratio: "A person who for his own purposes brings on his land and collects anything likely to do mischief if it escapes, must keep it in at his peril, and is prima facie liable for all damage caused by its escape.",
    obiter: "The rule does not apply to natural uses of land or things naturally on the land.",
    principle: "Strict liability / Non-natural use of land / Escape of dangerous things",
    relatedCases: ["Donoghue v Stevenson"],
  },
];

const areas = ["All", "Company Law", "Contract Law", "Tort Law"] as const;

const areaColors: Record<string, string> = {
  "Company Law": "bg-primary/20 text-primary border-primary/30",
  "Contract Law": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Tort Law": "bg-violet-500/20 text-violet-400 border-violet-500/30",
};

function DetailSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">{label}</h4>
      <div className="text-sm text-foreground/90 leading-relaxed">{children}</div>
    </div>
  );
}

export default function CaseDirectory() {
  const [search, setSearch] = useState("");
  const [activeArea, setActiveArea] = useState<string>("All");
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  const filtered = cases.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.principle.toLowerCase().includes(search.toLowerCase());
    const matchesArea = activeArea === "All" || c.area === activeArea;
    return matchesSearch && matchesArea;
  });

  return (
    <div className="flex gap-6 h-[calc(100vh-5rem)]">
      {/* Left: List */}
      <div className={`flex-1 min-w-0 flex flex-col ${selectedCase ? "hidden md:flex" : "flex"}`}>
        <div className="mb-6">
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

        <ScrollArea className="flex-1">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 pb-4">
            {filtered.map((c) => (
              <div
                key={c.id}
                onClick={() => setSelectedCase(c)}
                className={`bg-card border rounded-lg p-5 hover:border-primary/40 transition-colors cursor-pointer group ${
                  selectedCase?.id === c.id ? "border-primary ring-1 ring-primary/30" : "border-border"
                }`}
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
            <div className="text-center py-12 text-muted-foreground">No cases found matching your search.</div>
          )}
        </ScrollArea>
      </div>

      {/* Right: Detail Panel */}
      {selectedCase && (
        <div className="w-full md:w-[420px] lg:w-[480px] shrink-0 bg-card border border-border rounded-lg flex flex-col">
          <div className="flex items-center justify-between p-5 pb-3">
            <Badge variant="outline" className={areaColors[selectedCase.area] || ""}>
              {selectedCase.area}
            </Badge>
            <Button variant="ghost" size="icon" onClick={() => setSelectedCase(null)} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <ScrollArea className="flex-1 px-5 pb-5">
            <h2 className="text-xl font-serif font-bold text-foreground mb-1">{selectedCase.name}</h2>
            <p className="text-xs text-muted-foreground mb-4">({selectedCase.year})</p>

            <div className="space-y-4">
              <DetailSection label="Parties">{selectedCase.parties}</DetailSection>
              <Separator className="bg-border/50" />
              <DetailSection label="Court">{selectedCase.court}</DetailSection>
              <Separator className="bg-border/50" />
              <DetailSection label="Facts">{selectedCase.facts}</DetailSection>
              <Separator className="bg-border/50" />
              <DetailSection label="Decision (Held)">{selectedCase.held}</DetailSection>
              <Separator className="bg-border/50" />
              <DetailSection label="Ratio Decidendi">{selectedCase.ratio}</DetailSection>
              <Separator className="bg-border/50" />
              <DetailSection label="Obiter Dicta">
                <span className="italic text-foreground/70">{selectedCase.obiter}</span>
              </DetailSection>
              <Separator className="bg-border/50" />
              <DetailSection label="Key Legal Principle">
                <span className="text-primary font-medium">{selectedCase.principle}</span>
              </DetailSection>
              <Separator className="bg-border/50" />
              <DetailSection label="Related Cases">
                <div className="flex flex-wrap gap-2 mt-1">
                  {selectedCase.relatedCases.map((rc) => {
                    const related = cases.find((c) => c.name === rc);
                    return (
                      <Badge
                        key={rc}
                        variant="outline"
                        className="cursor-pointer hover:bg-primary/10 transition-colors"
                        onClick={() => related && setSelectedCase(related)}
                      >
                        {rc}
                      </Badge>
                    );
                  })}
                </div>
              </DetailSection>
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
