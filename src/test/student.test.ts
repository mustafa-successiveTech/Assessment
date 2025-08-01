import request from "supertest";
import app from "../app";

describe("Student Management Api", () => {

    it("Description of get student" , () => {
        const test = request(app).get('/students');
        expect(test.status()).toBe(200);
    })

    it("Description of post student", () => {

    })
})