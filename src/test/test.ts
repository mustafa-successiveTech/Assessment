import request from "supertest";
import app from "../../src/app";
import { sum } from "../assignments/sum";

describe("Basic route tests", () => {
  it("Sum of two numbers ", () => {
    expect(sum(2, 3)).toBe(5);
  });

  it("GET /get → should return hello message", async () => {
    const res = await request(app).get("/get");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: "Hello from server" });
  });
});
