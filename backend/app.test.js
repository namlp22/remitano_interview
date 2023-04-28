const request = require("supertest");
const app = require("./app");

describe("Test app.js", () => {
  it("should start the server and return a 404 for the root path", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(404);
  });

  it("should use the cors middleware with the specified options", async () => {
    const response = await request(app).get("/");
    expect(response.headers["access-control-allow-origin"]).toBe(
      "http://localhost:3000"
    );
  });

  it("should use the express.json middleware", async () => {
    const response = await request(app)
      .post("/movie")
      .send({ title: "Test Movie" });
    expect(response.statusCode).toBe(400);
  });

  it("should use the movieRouter", async () => {
    const response = await request(app).get("/movie");
    expect(response.statusCode).toBe(200);
  });

  it("should use the authRouter", async () => {
    const response = await request(app).get("/auth");
    expect(response.statusCode).toBe(200);
  });

  it("should start the server on the specified port", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(404);
  });
});
