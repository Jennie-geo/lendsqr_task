// import { request } from 'http';
// import supertest from 'supertest';
// import app from '../src/app.ts';

// describe('POST /user', () => {
//     describe("give user details", () => {
//         test("should response with 200 status code", async () => {
//             const response = await request(app).post("/user/account/create-acct").send({
//                 id: "id",
//                 first_name: "",
//                 last_name: "",
//                 email: "",
//                 password: "",
//                 account_number: ""
//             })
//             expect(response.statusCode).toBe(200)
//         })
//     })
// })
// describe("number operations", () => {
//     test('1 plus 1 to be 2', () => {
//         let a = 1;
//         let b = 1
//         expect(a + b).toBe(2)
//     })

//     test('5 plus is not equal to 10', () => {
//         let a = 5
//         let b = 6
//         expect(a + b).not.toBe(10)
//     })

// })