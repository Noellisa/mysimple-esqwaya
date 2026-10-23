import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

import { cases, type Case } from "@/data/cases";

const areas = ["All", "Company Law", "Contract Law", "Tort Law"] as const;

const areaColors: Record<string, string> = {
  "Company Law": "case-company",
  "Contract Law": "case-contract",
  "Tort Law": "case-tort",
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
          <h1 className="text-3xl font-bold text-foreground font-display">Case Directory</h1>
          <p className="text-muted-foreground mt-1">Browse landmark legal cases by area of law</p>
        </div>

        <div className="flex flex-col 2xl:flex-row 2xl:items-center gap-4 mb-6">
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
            <h2 className="text-xl font-display font-bold text-foreground mb-1">{selectedCase.name}</h2>
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
