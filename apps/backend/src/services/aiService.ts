import { env } from "../config/env.js";

export type ReportUnderstanding = {
  summary_simple_en: string;
  summary_simple_hi: string;
  highlights: Array<{ name: string; value: string; range: string; status: "normal" | "high" | "low" }>;
  risk_flags: string[];
  suggested_questions_for_doctor: string[];
};

export interface OcrProvider {
  extractText(buffer: Buffer): Promise<string>;
}

export class MockOcrProvider implements OcrProvider {
  async extractText(): Promise<string> {
    return "Hemoglobin 11 g/dL (Low). Blood sugar fasting 95 mg/dL (Normal).";
  }
}

export interface LlmProvider {
  summarize(text: string): Promise<ReportUnderstanding>;
}

export class MockLlmProvider implements LlmProvider {
  async summarize(text: string): Promise<ReportUnderstanding> {
    return {
      summary_simple_en: `Summary based on OCR: ${text.slice(0, 120)}...`,
      summary_simple_hi: "यह रिपोर्ट का सरल सारांश है।",
      highlights: [
        { name: "Hemoglobin", value: "11 g/dL", range: "12-16", status: "low" },
        { name: "Fasting Glucose", value: "95 mg/dL", range: "70-100", status: "normal" },
      ],
      risk_flags: ["Anemia risk"],
      suggested_questions_for_doctor: ["Should I take iron supplements?", "Any dietary advice?"]
    };
  }
}

export function buildOcrProvider(): OcrProvider {
  return new MockOcrProvider();
}

export function buildLlmProvider(): LlmProvider {
  return new MockLlmProvider();
}

export async function analyzeReport(buffer: Buffer): Promise<ReportUnderstanding> {
  const ocr = buildOcrProvider();
  const llm = buildLlmProvider();
  const text = await ocr.extractText(buffer);
  return llm.summarize(text);
}
