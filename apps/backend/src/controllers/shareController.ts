import { Response, Request } from "express";
import Joi from "joi";
import { query } from "../config/db.js";
import { AuthRequest } from "../middleware/auth.js";
import { logAudit } from "../utils/audit.js";
import crypto from "crypto";

export async function generateDoctorCodeHandler(req: AuthRequest, res: Response): Promise<void> {
  const code = crypto.randomInt(100000, 999999).toString();
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
  const result = await query<{ id: string }>(
    "INSERT INTO doctor_access (id, user_id, code, expires_at) VALUES (gen_random_uuid(), $1, $2, $3) RETURNING id",
    [req.user?.id, code, expiresAt]
  );
  await logAudit(req.user?.id || null, "doctor_share_created", { codeId: result[0].id });
  res.json({ code, expiresAt });
}

const verifySchema = Joi.object({
  code: Joi.string().length(6).required(),
});

export async function doctorAccessHandler(req: Request, res: Response): Promise<void> {
  const { error, value } = verifySchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.message });
    return;
  }
  const accessRows = await query<{ id: string; user_id: string; expires_at: string }>(
    "SELECT id, user_id, expires_at FROM doctor_access WHERE code = $1 AND used_at IS NULL",
    [value.code]
  );
  const access = accessRows[0];
  if (!access || new Date(access.expires_at).getTime() < Date.now()) {
    res.status(401).json({ error: "Invalid or expired code" });
    return;
  }
  await query("UPDATE doctor_access SET used_at = NOW() WHERE id = $1", [access.id]);
  await logAudit(access.user_id, "doctor_access_granted", { doctorAccessId: access.id });
  const profile = await query(
    "SELECT full_name, medical_id FROM profiles WHERE user_id = $1 ORDER BY created_at ASC LIMIT 1",
    [access.user_id]
  );
  const reports = await query(
    "SELECT id, file_name, created_at FROM reports WHERE user_id = $1 ORDER BY created_at DESC",
    [access.user_id]
  );
  res.json({
    patient: profile[0] || null,
    reports,
  });
}
