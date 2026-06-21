const request = require("supertest");
const app = require("../src/app");

describe("Auth — /api/auth", () => {
  // INSCRIPTION
  describe("POST /api/auth/register", () => {
    it("doit retourner 400 si des champs sont manquants", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({ email: "test@test.com" });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message");
    });

    it("doit retourner 400 si l'email existe déjà", async () => {
      const res = await request(app)
        .post("/api/auth/register")
        .send({
          firstName: "Test",
          lastName: "User",
          email: "admin@petitsreves.com",
          password: "Test@12345678",
        });
      expect(res.statusCode).toBe(400);
    });
  });

  //  CONNEXION
describe("POST /api/auth/login", () => {
    it("doit retourner 400 si email ou mot de passe manquant", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "test@test.com" });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("message");
    });

    it("doit retourner 401 si les identifiants sont incorrects", async () => {
      const res = await request(app)
        .post("/api/auth/login")
        .send({ email: "inconnu@test.com", password: "MauvaisPass@123" });
      expect(res.statusCode).toBe(401);
    });
  });

  // ─── MOT DE PASSE OUBLIÉ ───────────────────────────────────────
  describe("POST /api/auth/forgot-password", () => {
    it("doit retourner 200 même si l'email n'existe pas (sécurité)", async () => {
      const res = await request(app)
        .post("/api/auth/forgot-password")
        .send({ email: "inexistant@test.com" });
      expect(res.statusCode).toBe(200);
    });
  });

  // ─── ACTIVATION ────────────────────────────────────────────────
  describe("POST /api/auth/verify-activation", () => {
    it("doit retourner 400 si le code est invalide", async () => {
      const res = await request(app)
        .post("/api/auth/verify-activation")
        .send({ email: "test@test.com", code: "000000" });
      expect(res.statusCode).toBe(400);
    });
  });
});
