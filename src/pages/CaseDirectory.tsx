import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const sampleCases = [
{
  id: 1,
  name: "Republic v. Tommy Thompson Books Ltd",
  year: "1996",
  citation: "[1996] GLR 726",
  area: "Constitutional Law",
  summary: "Landmark case on freedom of expression and press freedom under the 1992 Constitution of Ghana."
},
{
  id: 2,
  name: "Tuffuor v. Attorney-General",
  year: "1980",
  citation: "[1980] GLR 637",
  area: "Constitutional Law",
  summary: "Established the principle that the Constitution is a living document and should be interpreted broadly."
},
{
  id: 3,
  name: "New Patriotic Party v. Inspector General of Police",
  year: "1993",
  citation: "[1993-94] 2 GLR 459",
  area: "Human Rights",
  summary: "Affirmed the right to demonstrate and protest as part of fundamental human rights."
},
{
  id: 4,
  name: "Amidu v. Attorney-General",
  year: "2013",
  citation: "[2013] SCGLR 112",
  area: "Administrative Law",
  summary: "Significant case regarding public accountability and the role of the Attorney-General."
},
{
  id: 5,
  name: "Ahumah Ocansey v. Electoral Commission",
  year: "2010",
  citation: "[2010] SCGLR 575",
  area: "Electoral Law",
  summary: "Dealt with matters relating to voter registration and the right to vote."
},
{
  id: 6,
  name: "Ghana Lotto Operators Association v. National Lottery Authority",
  year: "2007",
  citation: "[2007-08] SCGLR 1088",
  area: "Commercial Law",
  summary: "Addressed issues of licensing, regulation, and the power of statutory bodies."
}];


const areaColors: Record<string, string> = {
  "Constitutional Law": "bg-primary/20 text-primary border-primary/30",
  "Human Rights": "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  "Administrative Law": "bg-blue-500/20 text-blue-400 border-blue-500/30",
  "Electoral Law": "bg-violet-500/20 text-violet-400 border-violet-500/30",
  "Commercial Law": "bg-orange-500/20 text-orange-400 border-orange-500/30"
};

export default function CaseDirectory() {
  const [search, setSearch] = useState("");

  const filtered = sampleCases.filter(
    (c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.area.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground font-serif">Case Directory</h1>
        <p className="text-muted-foreground mt-1">Browse landmark Ghanaian legal cases</p>
      </div>

      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search cases by name or area of law..."
          className="pl-10 bg-card border-border"
          value={search}
          onChange={(e) => setSearch(e.target.value)} />
        
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((c) =>
        <div
          key={c.id}
          className="bg-card border border-border rounded-lg p-5 hover:border-primary/40 transition-colors cursor-pointer group">
          
            <div className="flex items-start justify-between gap-2 mb-3">
              <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
                {c.name}
              </h3>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline" className={areaColors[c.area] || ""}>
                {c.area}
              </Badge>
              <span className="text-xs text-muted-foreground">{c.year}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{c.summary}</p>
            <p className="text-xs text-muted-foreground/60 mt-3 font-mono">{c.citation}</p>
          </div>
        )}
      </div>

      {filtered.length === 0 &&
      <div className="text-center py-12 text-muted-foreground">
          No cases found matching your search.
        </div>
      }
    </div>);

}