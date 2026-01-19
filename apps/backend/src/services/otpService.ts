import crypto from "crypto";
import { env } from "../config/env.js";

type OtpRecord = {
  phone: string;
  code: string;
  expiresAt: number;
};

const otpStore = new Map<string, OtpRecord>();

export interface OtpProvider {
  sendOtp(phone: string, code: string): Promise<void>;
}

export class MockOtpProvider implements OtpProvider {
  async sendOtp(): Promise<void> {
    return;
  }
}

export function generateOtp(): string {
  return crypto.randomInt(100000, 999999).toString();
}

export async function requestOtp(phone: string, provider: OtpProvider): Promise<{ code: string } | null> {
  const code = generateOtp();
  const expiresAt = Date.now() + env.otp.ttlMinutes * 60 * 1000;
  otpStore.set(phone, { phone, code, expiresAt });
  await provider.sendOtp(phone, code);
  return env.otp.mock ? { code } : null;
}

export function verifyOtp(phone: string, code: string): boolean {
  const record = otpStore.get(phone);
  if (!record) return false;
  if (record.expiresAt < Date.now()) {
    otpStore.delete(phone);
    return false;
  }
  const match = record.code === code;
  if (match) otpStore.delete(phone);
  return match;
}
