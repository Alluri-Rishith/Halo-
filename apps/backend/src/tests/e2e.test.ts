import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../app.js";

const hasE2E = Boolean(process.env.E2E_DATABASE_URL);

const run = hasE2E ? it : it.skip;

describe("E2E upload flow", () => {
  run("uploads and views report", async () => {
    const phone = "9999999999";
    const otpRes = await request(app).post("/auth/request-otp").send({ phone });
    const mockCode = otpRes.body.mockCode;
    const verifyRes = await request(app).post("/auth/verify-otp").send({ phone, code: mockCode });
    const token = verifyRes.body.token;
    const profileRes = await request(app)
      .post("/profiles")
      .set("Authorization", `Bearer ${token}`)
      .send({ fullName: "Test User", dob: "1980-01-01", gender: "male" });
    const profileId = profileRes.body.id;
    const reportRes = await request(app)
      .post("/reports")
      .set("Authorization", `Bearer ${token}`)
      .field("profileId", profileId)
      .attach("file", Buffer.from("sample"), { filename: "report.txt", contentType: "image/png" });
    const reportId = reportRes.body.reportId;
    const fetchRes = await request(app)
      .get(`/reports/${reportId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(fetchRes.status).toBe(200);
  });
});
