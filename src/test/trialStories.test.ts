import { describe, it, expect } from "vitest";
import { trialStories, trialStages, nextTrialStage } from "@/data/trialStories";
import { cases } from "@/data/cases";

describe("trial story flow", () => {
  it("follows introduction, body, conclusion", () => {
    expect([...trialStages]).toEqual(["Introduction", "Body", "Conclusion"]);
    expect(nextTrialStage(0)).toBe(1);
    expect(nextTrialStage(1)).toBe(2);
    expect(nextTrialStage(2)).toBe(2);
  });
  it("covers each of the nine existing cases with facts and a decision", () => {
    expect(trialStories).toHaveLength(9);
    for (const c of cases) {
      const story = trialStories.find(s => s.id === c.id);
      expect(story?.held).toBe(c.held);
      expect(story?.opening.length).toBeGreaterThan(20);
      expect(story?.conflict.length).toBeGreaterThan(20);
      expect(story?.titles).toHaveLength(3);
    }
  });
});