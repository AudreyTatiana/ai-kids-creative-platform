const request = require("supertest");
const app = require("../src/app");

describe("Orders — /api/orders", () => {
  describe("GET /api/orders", () => {
    it("doit retourner 401 sans token", async () => {
      const res = await request(app).get("/api/orders");
      expect(res.statusCode).toBe(401);
    });
  });

  describe("GET /api/orders/realisation/:orderNumber", () => {
    it("doit retourner 404 pour un numéro de commande inexistant", async () => {
      const res = await request(app)
        .get("/api/orders/realisation/PR-0000-00000")
        .query({ email: "test@test.com" });
      expect([404, 400]).toContain(res.statusCode);
    });
  });
});
