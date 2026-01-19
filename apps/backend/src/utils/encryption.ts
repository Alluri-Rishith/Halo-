import crypto from "crypto";
import { env } from "../config/env.js";

const MASTER_KEY = crypto.createHash("sha256").update(env.encryptionMasterKey).digest();

export type EncryptedPayload = {
  encryptedData: string;
  iv: string;
  encryptedDataKey: string;
  authTag: string;
};

function encryptWithKey(plain: string, key: Buffer): { encrypted: string; iv: string; authTag: string } {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return { encrypted: encrypted.toString("base64"), iv: iv.toString("base64"), authTag: authTag.toString("base64") };
}

function decryptWithKey(encrypted: string, iv: string, authTag: string, key: Buffer): string {
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, Buffer.from(iv, "base64"));
  decipher.setAuthTag(Buffer.from(authTag, "base64"));
  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encrypted, "base64")),
    decipher.final(),
  ]);
  return decrypted.toString("utf8");
}

export function encryptEnvelope(plain: string): EncryptedPayload {
  const dataKey = crypto.randomBytes(32);
  const encryptedData = encryptWithKey(plain, dataKey);
  const encryptedKey = encryptWithKey(dataKey.toString("base64"), MASTER_KEY);
  return {
    encryptedData: encryptedData.encrypted,
    iv: encryptedData.iv,
    authTag: encryptedData.authTag,
    encryptedDataKey: JSON.stringify(encryptedKey),
  };
}

export function decryptEnvelope(payload: EncryptedPayload): string {
  const encryptedKey = JSON.parse(payload.encryptedDataKey) as { encrypted: string; iv: string; authTag: string };
  const dataKeyBase64 = decryptWithKey(encryptedKey.encrypted, encryptedKey.iv, encryptedKey.authTag, MASTER_KEY);
  return decryptWithKey(payload.encryptedData, payload.iv, payload.authTag, Buffer.from(dataKeyBase64, "base64"));
}
