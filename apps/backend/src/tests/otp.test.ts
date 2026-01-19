import { describe, it, expect } from "vitest";
import { requestOtp, verifyOtp, MockOtpProvider } from "../services/otpService.js";

const provider = new MockOtpProvider();

describe("OTP", () => {
  it("generates and verifies OTP", async () => {
    const result = await requestOtp("9999999999", provider);
    expect(result?.code).toBeTruthy();
    const valid = verifyOtp("9999999999", result!.code);
    expect(valid).toBe(true);
  });
});
