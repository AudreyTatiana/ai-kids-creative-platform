const request = require("supertest");
const app = require("../src/app");

describe("Payment — /api/payment", () => {
  describe("POST /api/payment/create-session", () => {
    it("doit retourner 400 si les données sont manquantes", async () => {
      const res = await request(app)
        .post("/api/payment/create-session")
        .send({});
      expect(res.statusCode).toBe(400);
    });

    it("doit retourner 400 sans email client", async () => {
      const res = await request(app)
        .post("/api/payment/create-session")
        .send({ product: "Pack d'images", amount: 29.9 });
      expect(res.statusCode).toBe(400);
    });
  });
});
