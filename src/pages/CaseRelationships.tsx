import { useState, useMemo, useCallback } from "react";
import { Play, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import EnterTheTrial from "@/components/trial/EnterTheTrial";

interface CaseNode {
  id: number;
  name: string;
  area: string;
  principle: string;
  x: number;
  y: number;
}

interface Edge {
  from: number;
  to: number;
  principle: string;
}

const nodes: CaseNode[] = [
  { id: 1, name: "Salomon v Salomon & Co Ltd", area: "Company Law", principle: "Corporate personality", x: 180, y: 140 },
  { id: 2, name: "Foss v Harbottle", area: "Company Law", principle: "Proper plaintiff rule", x: 340, y: 80 },
  { id: 3, name: "Lee v Lee's Air Farming Ltd", area: "Company Law", principle: "Separate legal personality", x: 260, y: 260 },
  { id: 4, name: "Carlill v Carbolic Smoke Ball Co", area: "Contract Law", principle: "Unilateral contracts", x: 560, y: 120 },
  { id: 5, name: "Hyde v Wrench", area: "Contract Law", principle: "Counter-offers", x: 700, y: 240 },
  { id: 6, name: "Hadley v Baxendale", area: "Contract Law", principle: "Remoteness of damages", x: 580, y: 340 },
  { id: 7, name: "Donoghue v Stevenson", area: "Tort Law", principle: "Duty of care", x: 420, y: 440 },
  { id: 8, name: "Caparo Industries plc v Dickman", area: "Tort Law", principle: "Three-stage test", x: 260, y: 480 },
  { id: 9, name: "Rylands v Fletcher", area: "Tort Law", principle: "Strict liability", x: 580, y: 500 },
];

const edges: Edge[] = [
  { from: 1, to: 2, principle: "Corporate personality & shareholder rights" },
  { from: 1, to: 3, principle: "Separate legal entity doctrine" },
  { from: 4, to: 5, principle: "Offer and acceptance rules" },
  { from: 5, to: 6, principle: "Contract formation & damages" },
  { from: 7, to: 8, principle: "Duty of care in negligence" },
  { from: 7, to: 9, principle: "Liability without direct fault" },
];

const areaColors: Record<string, { fill: string; stroke: string; label: string }> = {
  "Company Law": { fill: "hsl(var(--case-company) / 0.25)", stroke: "hsl(var(--case-company))", label: "hsl(var(--case-company))" },
  "Contract Law": { fill: "hsl(var(--case-contract) / 0.25)", stroke: "hsl(var(--case-contract))", label: "hsl(var(--case-contract))" },
  "Tort Law": { fill: "hsl(var(--case-tort) / 0.25)", stroke: "hsl(var(--case-tort))", label: "hsl(var(--case-tort))" },
};

const NODE_R = 28;

export default function CaseRelationships() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [hoveredEdge, setHoveredEdge] = useState<number | null>(null);
  const [trialCaseId, setTrialCaseId] = useState<number | null>(null);

  const connectedIds = useMemo(() => {
    if (selectedId === null) return new Set<number>();
    const s = new Set<number>([selectedId]);
    edges.forEach((e) => {
      if (e.from === selectedId) s.add(e.to);
      if (e.to === selectedId) s.add(e.from);
    });
    return s;
  }, [selectedId]);

  const isEdgeHighlighted = useCallback(
    (e: Edge) => selectedId !== null && (e.from === selectedId || e.to === selectedId),
    [selectedId]
  );

  const getNode = (id: number) => nodes.find((n) => n.id === id);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground font-display">Case Relationships</h1>
        <p className="text-muted-foreground mt-1">Explore how landmark cases connect through shared legal principles</p>
      </div>

      {trialCaseId !== null ? (
        <div className="max-w-4xl mb-8"><EnterTheTrial initialCaseId={trialCaseId} onClose={() => setTrialCaseId(null)} /></div>
      ) : (
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 mb-5 border-y border-border">
          <div className="flex items-center gap-3"><Scale className="h-7 w-7 text-primary shrink-0"/><div><h2 className="text-xl font-semibold">Enter the Trial</h2><p className="text-sm text-muted-foreground">Nine cases. Three acts. A story to remember.</p></div></div>
          <Button onClick={() => setTrialCaseId(selectedId ?? 1)}><Play className="h-4 w-4"/>Enter the Trial</Button>
        </section>
      )}

      {/* Legend */}
      <div className="flex gap-5 mb-4 flex-wrap">
        {Object.entries(areaColors).map(([area, c]) => (
          <div key={area} className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-full" style={{ background: c.stroke }} />
            <span className="text-muted-foreground">{area}</span>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <svg
          viewBox="0 0 900 580"
          className="w-full h-auto"
          style={{ minHeight: 400 }}
          onClick={() => setSelectedId(null)}
        >
          {/* Edges */}
          {edges.map((e, i) => {
            const a = getNode(e.from);
            const b = getNode(e.to);
            if (!a || !b) return null;
            const highlighted = isEdgeHighlighted(e);
            const dimmed = selectedId !== null && !highlighted;
            const isHovered = hoveredEdge === i;

            return (
              <g key={i}>
                {/* Wider invisible hitarea */}
                <line
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke="transparent"
                  strokeWidth={16}
                  onMouseEnter={() => setHoveredEdge(i)}
                  onMouseLeave={() => setHoveredEdge(null)}
                  className="cursor-pointer"
                />
                <line
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  stroke={highlighted ? "hsl(var(--case-company))" : "hsl(var(--border))"}
                  strokeWidth={highlighted || isHovered ? 2.5 : 1.5}
                  strokeDasharray={highlighted ? "none" : "6 4"}
                  opacity={dimmed ? 0.15 : isHovered ? 1 : 0.6}
                  className="pointer-events-none transition-all duration-200"
                />
                {/* Edge tooltip */}
                {isHovered && (
                  <g>
                    <rect
                      x={(a.x + b.x) / 2 - e.principle.length * 3.5}
                      y={(a.y + b.y) / 2 - 24}
                      width={e.principle.length * 7}
                      height={22}
                      rx={4}
                      fill="hsl(var(--popover))"
                      stroke="hsl(var(--border))"
                      strokeWidth={1}
                    />
                    <text
                      x={(a.x + b.x) / 2}
                      y={(a.y + b.y) / 2 - 10}
                      textAnchor="middle"
                      fill="hsl(var(--foreground))"
                      fontSize={11}
                      className="pointer-events-none"
                    >
                      {e.principle}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map((n) => {
            const c = areaColors[n.area];
            const isSelected = selectedId === n.id;
            const dimmed = selectedId !== null && !connectedIds.has(n.id);
            const isHovered = hoveredNode === n.id;

            return (
              <g
                key={n.id}
                onClick={(ev) => {
                  ev.stopPropagation();
                  setSelectedId(selectedId === n.id ? null : n.id);
                }}
                onMouseEnter={() => setHoveredNode(n.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer"
                opacity={dimmed ? 0.2 : 1}
                style={{ transition: "opacity 0.2s" }}
              >
                {/* Glow ring */}
                {isSelected && (
                  <circle cx={n.x} cy={n.y} r={NODE_R + 6} fill="none" stroke={c.stroke} strokeWidth={2} opacity={0.5} />
                )}
                <circle
                  cx={n.x} cy={n.y} r={NODE_R}
                  fill={c.fill}
                  stroke={c.stroke}
                  strokeWidth={isSelected ? 2.5 : 1.5}
                />
                {/* Short label inside */}
                <text
                  x={n.x} y={n.y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={c.label}
                  fontSize={10}
                  fontWeight={600}
                  className="pointer-events-none select-none"
                >
                  {n.name.split(" v ")[0].slice(0, 8)}
                </text>

                {/* Hover tooltip */}
                {isHovered && (
                  <g className="pointer-events-none">
                    <rect
                      x={n.x - n.name.length * 3.2}
                      y={n.y - NODE_R - 30}
                      width={n.name.length * 6.4}
                      height={22}
                      rx={4}
                      fill="hsl(var(--popover))"
                      stroke={c.stroke}
                      strokeWidth={1}
                    />
                    <text
                      x={n.x}
                      y={n.y - NODE_R - 16}
                      textAnchor="middle"
                      fill="hsl(var(--foreground))"
                      fontSize={11}
                      fontWeight={500}
                    >
                      {n.name}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <p className="text-xs text-muted-foreground mt-3">Click a node to highlight its connections. Hover edges to see shared principles.</p>
    </div>
  );
}
