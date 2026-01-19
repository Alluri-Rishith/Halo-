import { Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { AuthRequest } from "../middleware/auth.js";
import { analyzeReport } from "../services/aiService.js";
import { uploadBuffer, createSignedDownloadUrl } from "../services/storageService.js";
import { query } from "../config/db.js";
import { logAudit } from "../utils/audit.js";

const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"];

export async function uploadReportHandler(req: AuthRequest, res: Response): Promise<void> {
  if (!req.file) {
    res.status(400).json({ error: "Missing file" });
    return;
  }
  if (!ALLOWED_TYPES.includes(req.file.mimetype)) {
    res.status(400).json({ error: "Unsupported file type" });
    return;
  }
  const reportId = uuidv4();
  const key = `${req.user?.id}/${reportId}/${req.file.originalname}`;
  await uploadBuffer(key, req.file.buffer, req.file.mimetype);
  await query(
    "INSERT INTO reports (id, user_id, profile_id, file_key, file_name, mime_type, status) VALUES ($1,$2,$3,$4,$5,$6,$7)",
    [reportId, req.user?.id, req.body.profileId || null, key, req.file.originalname, req.file.mimetype, "processing"]
  );
  const analysis = await analyzeReport(req.file.buffer);
  await query(
    "INSERT INTO report_results (id, report_id, summary_simple_en, summary_simple_hi, highlights, risk_flags, suggested_questions) VALUES (gen_random_uuid(), $1, $2, $3, $4, $5, $6)",
    [
      reportId,
      analysis.summary_simple_en,
      analysis.summary_simple_hi,
      JSON.stringify(analysis.highlights),
      JSON.stringify(analysis.risk_flags),
      JSON.stringify(analysis.suggested_questions_for_doctor),
    ]
  );
  await query("UPDATE reports SET status = $1 WHERE id = $2", ["ready", reportId]);
  await logAudit(req.user?.id || null, "report_upload", { reportId });
  res.json({ reportId });
}

export async function listReportsHandler(req: AuthRequest, res: Response): Promise<void> {
  const reports = await query(
    "SELECT id, file_name, status, created_at FROM reports WHERE user_id = $1 ORDER BY created_at DESC",
    [req.user?.id]
  );
  res.json({ reports });
}

export async function getReportHandler(req: AuthRequest, res: Response): Promise<void> {
  const { id } = req.params;
  const reports = await query(
    "SELECT id, file_key, file_name, status FROM reports WHERE id = $1 AND user_id = $2",
    [id, req.user?.id]
  );
  const report = reports[0];
  if (!report) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  const results = await query(
    "SELECT summary_simple_en, summary_simple_hi, highlights, risk_flags, suggested_questions FROM report_results WHERE report_id = $1",
    [id]
  );
  const signedUrl = await createSignedDownloadUrl(report.file_key);
  await logAudit(req.user?.id || null, "report_view", { reportId: id });
  res.json({
    report: {
      id: report.id,
      fileName: report.file_name,
      status: report.status,
      downloadUrl: signedUrl,
      analysis: results[0] || null,
    },
  });
}
