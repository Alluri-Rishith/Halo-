import { query } from "../config/db.js";

export async function logAudit(userId: string | null, action: string, metadata: Record<string, unknown>): Promise<void> {
  await query(
    "INSERT INTO audit_logs (id, user_id, action, metadata) VALUES (gen_random_uuid(), $1, $2, $3)",
    [userId, action, metadata]
  );
}
