import { describe, it, expect } from "vitest";
import { isConsentValid } from "../services/consentService.js";

describe("Consent", () => {
  it("rejects expired consent", () => {
    const expired = new Date(Date.now() - 1000);
    expect(isConsentValid(expired)).toBe(false);
  });

  it("accepts active consent", () => {
    const future = new Date(Date.now() + 1000);
    expect(isConsentValid(future)).toBe(true);
  });
});
