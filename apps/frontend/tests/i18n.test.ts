import { describe, it, expect } from "vitest";
import { t } from "../lib/i18n";

describe("i18n", () => {
  it("returns Hindi disclaimer", () => {
    expect(t("hi", "disclaimer")).toContain("निदान");
  });
});
