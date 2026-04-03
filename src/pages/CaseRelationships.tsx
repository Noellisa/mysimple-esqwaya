import { GitFork } from "lucide-react";

export default function CaseRelationships() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Case Relationships</h1>
        <p className="text-muted-foreground mt-1">Explore how landmark cases connect and influence each other</p>
      </div>

      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <GitFork className="h-16 w-16 mb-4 text-primary/40" />
        <p className="text-lg font-medium">Coming Soon</p>
        <p className="text-sm mt-1">Visual case relationship mapping is under development.</p>
      </div>
    </div>
  );
}
