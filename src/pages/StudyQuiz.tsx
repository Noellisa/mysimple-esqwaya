import { GraduationCap } from "lucide-react";

export default function StudyQuiz() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Study & Quiz</h1>
        <p className="text-muted-foreground mt-1">Test your knowledge of Ghanaian case law</p>
      </div>

      <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
        <GraduationCap className="h-16 w-16 mb-4 text-primary/40" />
        <p className="text-lg font-medium">Coming Soon</p>
        <p className="text-sm mt-1">Flashcards and quizzes are under development.</p>
      </div>
    </div>
  );
}
