import request from "supertest";
import app from "../app";

describe("Post user endpoint", () => {
  test("given user details", async () => {
    const response = await request(app).post("/user/account/create-acct").send({
      id: 1,
      first_name: "Johnson",
      last_name: "Doe",
      email: "johnson@gmail.com",
      password: "12345",
      account_number: "234234765234",
    });
    expect(response.statusCode).toBe(200);
  });
  describe("when user details is missing", () => {});
});
