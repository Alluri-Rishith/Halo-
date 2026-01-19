import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import multer from "multer";
import { authMiddleware, requireRole } from "./middleware/auth.js";
import { requestOtpHandler, verifyOtpHandler } from "./controllers/authController.js";
import {
  createProfileHandler,
  listProfilesHandler,
  createFamilyMemberHandler,
  listFamilyHandler,
} from "./controllers/profileController.js";
import {
  uploadReportHandler,
  listReportsHandler,
  getReportHandler,
} from "./controllers/reportController.js";
import { generateDoctorCodeHandler, doctorAccessHandler } from "./controllers/shareController.js";
import { emergencyCardHandler } from "./controllers/emergencyController.js";

export const app = express();
const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } });

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(rateLimit({ windowMs: 60 * 1000, max: 120 }));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.post("/auth/request-otp", requestOtpHandler);
app.post("/auth/verify-otp", verifyOtpHandler);

app.get("/profiles", authMiddleware, listProfilesHandler);
app.post("/profiles", authMiddleware, createProfileHandler);

app.get("/family", authMiddleware, listFamilyHandler);
app.post("/family", authMiddleware, createFamilyMemberHandler);

app.get("/reports", authMiddleware, listReportsHandler);
app.get("/reports/:id", authMiddleware, getReportHandler);
app.post(
  "/reports",
  authMiddleware,
  requireRole(["patient", "caregiver"]),
  upload.single("file"),
  uploadReportHandler
);

app.post("/share", authMiddleware, generateDoctorCodeHandler);
app.post("/doctor/access", doctorAccessHandler);

app.get("/emergency-card", authMiddleware, emergencyCardHandler);
