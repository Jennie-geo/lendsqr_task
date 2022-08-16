"use strict";
// import { Request, Response } from "express";
// import { createUser } from "./user";
// beforeAll(() => {
//   process.env.NODE_ENV = "test";
// });
// describe("create user account", () => {
//   let mockRequest: Partial<Request>;
//   let mockResponse: Partial<Response>;
//   let responseObject = {};
//   beforeEach(() => {
//     mockRequest = {};
//     mockResponse = {
//       statusCode: 200,
//       send: jest.fn().mockImplementation((result) => {
//         responseObject = result;
//       }),
//     };
//   });
//   test("create account", () => {
//     const expectedStatusCode = 200;
//     const expectedResponse = {
//       users: [
//         {
//           id: 1,
//           first_name: "Jacky",
//           last_name: "Done",
//           email: "jackydon@gmail.com",
//           password: "jackyd",
//           account_number: "012367856376",
//         },
//       ],
//     };
//     createUser(mockRequest as Request, mockResponse as Response);
//     expect(mockResponse.statusCode).toBe(expectedStatusCode);
//     expect(responseObject).toEqual(expectedResponse);
//   });
// });
//# sourceMappingURL=users.spec.js.map