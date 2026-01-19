import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 4000),
  databaseUrl: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/swasthya",
  jwtSecret: process.env.JWT_SECRET || "dev-secret",
  encryptionMasterKey: process.env.ENCRYPTION_MASTER_KEY || "dev-master-key-32chars-long!!",
  s3: {
    endpoint: process.env.S3_ENDPOINT || "http://localhost:9000",
    region: process.env.S3_REGION || "us-east-1",
    accessKeyId: process.env.S3_ACCESS_KEY || "minioadmin",
    secretAccessKey: process.env.S3_SECRET_KEY || "minioadmin",
    bucket: process.env.S3_BUCKET || "swasthya",
  },
  otp: {
    ttlMinutes: Number(process.env.OTP_TTL_MINUTES || 5),
    mock: process.env.OTP_MODE !== "provider",
  },
  ai: {
    ocrProvider: process.env.OCR_PROVIDER || "mock",
    llmProvider: process.env.LLM_PROVIDER || "mock",
  },
  demoMode: process.env.DEMO_MODE === "true",
};
