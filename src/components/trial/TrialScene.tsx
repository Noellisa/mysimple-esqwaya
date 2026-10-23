import type { trialStories } from "@/data/trialStories";

type Story = (typeof trialStories)[number];
function Person({ x, label }: { x: number; label: string }) {
  return <g transform={`translate(${x},145)`}><circle cx="0" cy="0" r="19" className="trial-person"/><path d="M-32 88V53Q-32 29 0 29Q32 29 32 53V88M-15 88v34M15 88v34" className="trial-line"/><text y="155" textAnchor="middle" className="trial-label">{label}</text></g>;
}
function ObjectScene({ id, stage }: { id: number; stage: number }) {
  if (id === 7 || id === 4) return <g><path d="M330 139v-26h40v26l15 24v78q0 13-13 13h-44q-13 0-13-13v-78z" className="trial-object"/><path d="M330 185h40M330 196h40" className="trial-line"/>{id === 7 && stage > 0 ? <g className="trial-emphasis"><path d="M339 226q-10-27 12-27t5 27h17" className="trial-line"/><circle cx="348" cy="213" r="6" className="trial-object"/></g> : <text x="350" y="229" textAnchor="middle" className="trial-detail">{id === 4 ? "£100" : "GINGER"}</text>}</g>;
  if (id === 3) return <g className="trial-plane"><path d="M290 200h130l-20 18h-93zM335 202l-25-43h20l45 43M362 211l-27 39h-20l20-39M400 200v-25h13l7 25" className="trial-object"/>{stage === 1 && <path d="M300 265l20-13 19 13 20-13 19 13 20-13" className="trial-warning"/>}</g>;
  if (id === 9) return <g><path d="M290 170h120v75H290z" className="trial-object"/><path d="M300 195q12-12 24 0t24 0t24 0t24 0" className="trial-water"/><path d="M290 250v25h145v-20h65" className="trial-line"/>{stage > 0 && <path d="M350 202v68h145" className="trial-water trial-flow"/>}<path d="M460 254l23-28 24 28" className="trial-line"/></g>;
  if (id === 8) return <g><path d="M318 130h64v120h-64z" className="trial-object"/><path d="M330 155h40M330 167h30M330 180h40M330 220l10-19 12 7 15-22" className="trial-line"/>{stage > 0 && <path d="M375 128l20 23m0-23-20 23" className="trial-warning"/>}</g>;
  return <g><path d="M285 178l65-46 65 46v75H285z" className="trial-object"/><path d="M277 178l73-53 73 53M335 253v-42h30v42M300 194h19v20h-19M381 194h19v20h-19" className="trial-line"/><text x="350" y="284" textAnchor="middle" className="trial-detail">{id === 5 ? (stage === 0 ? "£1,000" : stage === 1 ? "£950 → £1,000" : "NO CONTRACT") : id === 6 ? "MILL" : "COMPANY"}</text>{id === 6 && stage > 0 && <path d="M330 185l12 12-12 12 12 12" className="trial-warning"/>}</g>;
}

export default function TrialScene({ story, stage }: { story: Story; stage: number }) {
  return <svg viewBox="0 0 700 350" role="img" aria-label={`${story.name}: ${story.titles[stage]}`} className="trial-scene w-full" key={`${story.id}-${stage}`}>
    <defs><marker id="trial-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0L6 3L0 6" className="trial-arrowhead"/></marker></defs>
    <path d="M60 280h580" className="trial-ground"/>
    <circle cx="350" cy="194" r="100" className="trial-backdrop"/>
    <Person x={140} label={story.labels[0]}/><Person x={560} label={story.labels[2]}/>
    <ObjectScene id={story.id} stage={stage}/>
    <path d="M192 195h72M436 195h72" className={`trial-connection ${stage === 1 ? "trial-flow" : ""}`} markerEnd="url(#trial-arrow)"/>
    <text x="350" y="62" textAnchor="middle" className="trial-top-label">{stage === 0 ? story.labels[1] : stage === 1 ? "THE DISPUTE" : "THE DECISION"}</text>
    {stage === 2 && <g transform="translate(350 88)" className="trial-emphasis"><circle r="19" className="trial-verdict"/><path d="M-9 0l6 6L10-7" className="trial-check"/></g>}
  </svg>;
}