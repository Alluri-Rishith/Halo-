import { describe, it, expect } from "vitest";
import { requireRole } from "../middleware/auth.js";

function createRes() {
  return {
    statusCode: 200,
    body: undefined as unknown,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(payload: unknown) {
      this.body = payload;
      return this;
    },
  };
}

describe("RBAC", () => {
  it("blocks missing role", () => {
    const middleware = requireRole(["patient"]);
    const req = { user: { id: "1", role: "doctor" } } as any;
    const res = createRes();
    let nextCalled = false;
    middleware(req, res as any, () => {
      nextCalled = true;
    });
    expect(nextCalled).toBe(false);
    expect(res.statusCode).toBe(403);
  });
});
