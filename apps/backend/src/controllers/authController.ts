import { Request, Response } from "express";
import Joi from "joi";
import { query } from "../config/db.js";
import { encryptEnvelope } from "../utils/encryption.js";
import { requestOtp, verifyOtp, MockOtpProvider } from "../services/otpService.js";
import { signToken } from "../middleware/auth.js";
import crypto from "crypto";

const phoneSchema = Joi.object({
  phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
});

export async function requestOtpHandler(req: Request, res: Response): Promise<void> {
  const { error, value } = phoneSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }
  const provider = new MockOtpProvider();
  const result = await requestOtp(value.phone, provider);
  res.json({ ok: true, ...(result ? { mockCode: result.code } : {}) });
}

const verifySchema = Joi.object({
  phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
  code: Joi.string().length(6).required(),
});

export async function verifyOtpHandler(req: Request, res: Response): Promise<void> {
  const { error, value } = verifySchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }
  const valid = verifyOtp(value.phone, value.code);
  if (!valid) {
    res.status(401).json({ error: "Invalid OTP" });
    return;
  }
  const phoneHash = crypto.createHash("sha256").update(value.phone).digest("hex");
  const existing = await query<{ id: string }>("SELECT id FROM users WHERE phone_hash = $1", [phoneHash]);
  let userId = existing[0]?.id;
  if (!userId) {
    const encrypted = encryptEnvelope(value.phone);
    const inserted = await query<{ id: string }>(
      "INSERT INTO users (phone_encrypted, phone_iv, phone_auth_tag, phone_data_key_encrypted, phone_hash, role) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id",
      [encrypted.encryptedData, encrypted.iv, encrypted.authTag, encrypted.encryptedDataKey, phoneHash, "patient"]
    );
    userId = inserted[0].id;
  }
  const token = signToken({ id: userId, role: "patient" });
  res.json({ token });
}
