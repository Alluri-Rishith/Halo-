import { Response } from "express";
import { AuthRequest } from "../middleware/auth.js";
import { query } from "../config/db.js";

export async function emergencyCardHandler(req: AuthRequest, res: Response): Promise<void> {
  const profile = await query(
    "SELECT full_name, medical_id, dob, gender FROM profiles WHERE user_id = $1 ORDER BY created_at ASC LIMIT 1",
    [req.user?.id]
  );
  const latestReport = await query(
    "SELECT created_at FROM reports WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1",
    [req.user?.id]
  );
  res.json({
    profile: profile[0] || null,
    lastReportDate: latestReport[0]?.created_at || null,
    disclaimer: "This is not a medical diagnosis. Always consult a doctor.",
  });
}
