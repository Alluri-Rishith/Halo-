import { describe, it, expect } from "vitest";
import { analyzeReport } from "../services/aiService.js";

describe("AI report understanding", () => {
  it("returns structured response", async () => {
    const result = await analyzeReport(Buffer.from("fake"));
    expect(result.summary_simple_en).toBeTruthy();
    expect(result.summary_simple_hi).toBeTruthy();
    expect(Array.isArray(result.highlights)).toBe(true);
    expect(Array.isArray(result.risk_flags)).toBe(true);
    expect(Array.isArray(result.suggested_questions_for_doctor)).toBe(true);
  });
});
