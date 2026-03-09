import { useState, useRef, useEffect, useCallback } from "react";

interface CaseNode {
  id: number;
  name: string;
  shortName: string;
  area: string;
  x: number;
  y: number;
  connections: number[];
}

const nodes: CaseNode[] = [
  { id: 1, name: "Salomon v Salomon & Co Ltd", shortName: "Salomon", area: "Company Law", x: 0, y: 0, connections: [2, 3] },
  { id: 2, name: "Foss v Harbottle", shortName: "Foss", area: "Company Law", x: 0, y: 0, connections: [1] },
  { id: 3, name: "Lee v Lee's Air Farming Ltd", shortName: "Lee", area: "Company Law", x: 0, y: 0, connections: [1] },
  { id: 4, name: "Carlill v Carbolic Smoke Ball Co", shortName: "Carlill", area: "Contract Law", x: 0, y: 0, connections: [5] },
  { id: 5, name: "Hyde v Wrench", shortName: "Hyde", area: "Contract Law", x: 0, y: 0, connections: [4, 6] },
  { id: 6, name: "Hadley v Baxendale", shortName: "Hadley", area: "Contract Law", x: 0, y: 0, connections: [5] },
  { id: 7, name: "Donoghue v Stevenson", shortName: "Donoghue", area: "Tort Law", x: 0, y: 0, connections: [8, 9] },
  { id: 8, name: "Caparo Industries plc v Dickman", shortName: "Caparo", area: "Tort Law", x: 0, y: 0, connections: [7] },
  { id: 9, name: "Rylands v Fletcher", shortName: "Rylands", area: "Tort Law", x: 0, y: 0, connections: [7] },
];

const areaColorMap: Record<string, { fill: string; stroke: string; glow: string }> = {
  "Company Law": { fill: "#D4A24E", stroke: "#B8892F", glow: "rgba(212,162,78,0.3)" },
  "Contract Law": { fill: "#34D399", stroke: "#10B981", glow: "rgba(52,211,153,0.3)" },
  "Tort Law": { fill: "#A78BFA", stroke: "#8B5CF6", glow: "rgba(167,139,250,0.3)" },
};

function layoutNodes(width: number, height: number): CaseNode[] {
  const cx = width / 2;
  const cy = height / 2;
  const groups: Record<string, number[]> = {};
  nodes.forEach((n) => {
    if (!groups[n.area]) groups[n.area] = [];
    groups[n.area].push(n.id);
  });

  const areaKeys = Object.keys(groups);
  const cloned = nodes.map((n) => ({ ...n }));

  areaKeys.forEach((area, gi) => {
    const angle = (gi / areaKeys.length) * Math.PI * 2 - Math.PI / 2;
    const clusterR = Math.min(width, height) * 0.28;
    const clusterCx = cx + Math.cos(angle) * clusterR;
    const clusterCy = cy + Math.sin(angle) * clusterR;
    const ids = groups[area];
    ids.forEach((id, i) => {
      const a = (i / ids.length) * Math.PI * 2 - Math.PI / 2;
      const r = ids.length === 1 ? 0 : 70;
      const node = cloned.find((n) => n.id === id)!;
      node.x = clusterCx + Math.cos(a) * r;
      node.y = clusterCy + Math.sin(a) * r;
    });
  });
  return cloned;
}

export default function CaseRelationships() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ w: 800, h: 500 });
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) setDims({ w: width, h: height });
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const laid = layoutNodes(dims.w, dims.h);
  const nodeMap = Object.fromEntries(laid.map((n) => [n.id, n]));

  const edges: { from: CaseNode; to: CaseNode; key: string }[] = [];
  const seen = new Set<string>();
  laid.forEach((n) => {
    n.connections.forEach((cid) => {
      const k = [Math.min(n.id, cid), Math.max(n.id, cid)].join("-");
      if (!seen.has(k)) {
        seen.add(k);
        edges.push({ from: n, to: nodeMap[cid], key: k });
      }
    });
  });

  const isConnected = useCallback(
    (nodeId: number) => {
      if (activeNode === null) return true;
      if (nodeId === activeNode) return true;
      const active = nodeMap[activeNode];
      return active?.connections.includes(nodeId);
    },
    [activeNode, nodeMap]
  );

  const isEdgeActive = useCallback(
    (from: number, to: number) => {
      if (activeNode === null) return true;
      return from === activeNode || to === activeNode;
    },
    [activeNode]
  );

  const tooltipNode = hoveredNode !== null ? nodeMap[hoveredNode] : null;
  const NODE_R = 26;

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)]">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-foreground font-serif">Case Relationships</h1>
        <p className="text-muted-foreground mt-1">Explore how landmark cases connect — click a node to highlight its connections</p>
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-4 flex-wrap">
        {Object.entries(areaColorMap).map(([area, colors]) => (
          <div key={area} className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.fill }} />
            {area}
          </div>
        ))}
      </div>

      <div
        ref={containerRef}
        className="flex-1 bg-card border border-border rounded-lg relative overflow-hidden cursor-default"
        onClick={() => setActiveNode(null)}
      >
        <svg width={dims.w} height={dims.h}>
          {/* Edges */}
          {edges.map(({ from, to, key }) => {
            const active = isEdgeActive(from.id, to.id);
            return (
              <line
                key={key}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={active ? "hsl(var(--muted-foreground))" : "hsl(var(--muted-foreground))"}
                strokeOpacity={active ? 0.5 : 0.08}
                strokeWidth={active ? 2 : 1}
                style={{ transition: "stroke-opacity 0.3s, stroke-width 0.3s" }}
              />
            );
          })}

          {/* Nodes */}
          {laid.map((n) => {
            const colors = areaColorMap[n.area];
            const connected = isConnected(n.id);
            const isActive = activeNode === n.id;
            const isHovered = hoveredNode === n.id;

            return (
              <g
                key={n.id}
                style={{ cursor: "pointer", transition: "opacity 0.3s" }}
                opacity={connected ? 1 : 0.15}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveNode(activeNode === n.id ? null : n.id);
                }}
                onMouseEnter={() => setHoveredNode(n.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                {/* Glow */}
                {(isActive || isHovered) && (
                  <circle cx={n.x} cy={n.y} r={NODE_R + 8} fill={colors.glow} />
                )}
                <circle
                  cx={n.x}
                  cy={n.y}
                  r={NODE_R}
                  fill={colors.fill}
                  stroke={isActive ? "#fff" : colors.stroke}
                  strokeWidth={isActive ? 3 : 2}
                />
                <text
                  x={n.x}
                  y={n.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#1a1a2e"
                  fontSize={10}
                  fontWeight={700}
                  style={{ pointerEvents: "none", userSelect: "none" }}
                >
                  {n.shortName}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {tooltipNode && (
          <div
            className="absolute pointer-events-none bg-popover border border-border rounded-md px-3 py-2 shadow-lg text-sm text-foreground max-w-[220px]"
            style={{
              left: tooltipNode.x + NODE_R + 12,
              top: tooltipNode.y - 20,
              transform: tooltipNode.x > dims.w * 0.7 ? "translateX(calc(-100% - 64px))" : undefined,
            }}
          >
            <p className="font-semibold font-serif text-xs">{tooltipNode.name}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{tooltipNode.area} · {nodes.find(n => n.id === tooltipNode.id)?.connections.length} connections</p>
          </div>
        )}
      </div>
    </div>
  );
}
