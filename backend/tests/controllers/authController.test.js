const request = require("supertest");
const app = require("../../app");
const bcrypt = require("bcrypt");
const User = require("../../models/user");

describe("POST /auth/login-register", () => {
  let server;

  beforeAll(async () => {
    server = app.listen(4000);
    await User.deleteMany({});
  });

  afterAll(async () => {
    await server.close();
  });

  it("should register a new user", async () => {
    const response = await request(app).post("/auth/login-register").send({
      email: "testuser@test.com",
      password: "testpassword",
    });

    expect(response.status).toBe(200);

    const user = await User.findOne({ email: "testuser@test.com" });

    expect(user.email).toBe("testuser@test.com");
    expect(await bcrypt.compare("testpassword", user.password)).toBe(true);
  });

  it("should log in an existing user", async () => {
    const existingUser = new User({
      email: "existinguser@test.com",
      password: await bcrypt.hash("existingpassword", 10),
    });
    await existingUser.save();

    const response = await request(app).post("/auth/login-register").send({
      email: "existinguser@test.com",
      password: "existingpassword",
    });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeTruthy();
  });

  it("should return 401 for missing credentials", async () => {
    const response = await request(app).post("/auth/login-register").send({});

    expect(response.status).toBe(401);
  });

  it("should return 401 for incorrect password", async () => {
    const existingUser = new User({
      email: "existinguser@test.com",
      password: await bcrypt.hash("existingpassword", 10),
    });
    await existingUser.save();

    const response = await request(app).post("/auth/login-register").send({
      email: "existinguser@test.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
  });
});
