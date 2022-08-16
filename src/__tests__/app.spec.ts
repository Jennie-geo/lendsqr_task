import request, { SuperTest, Test } from "supertest";
import db from "../database/db";
import configs from "../database/knexfile";
import app from "../app";

let superTestServer: SuperTest<Test>;
beforeAll(async () => {
  superTestServer = request(app);
  await db.from("accounts").del();
  await db.from("users").del();
});

const httpStatusCode = {
  CREATED: 201,
  SUCCESS: 200,
  FORBIDDEN: 403,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  INTERAL_SERVER_ERROR: 500,
  NOT_FOUND: 404,
};
afterAll(async () => {
  await db.from("accounts").del();
  await db.from("users").del();
});

const newUserDetails = {
  firstName: "Janes",
  lastName: "Does",
  email: "janedoes@mail.com",
  password: "testPassword",
};

const secondUserDetails = {
  firstName: "jone",
  lastName: "mike",
  email: "jonemike@mail.com",
  password: "testPassword",
};

let store = { token: "", account_number: "" };
const signUpUrl = "/user/account/create-acct";

describe("SignUp", () => {
  test("should allow user to create account", async () => {
    await superTestServer
      .post(signUpUrl)
      .send(newUserDetails)
      .expect((res) => {
        const { first_name, last_name, email, account_number } = res.body.data;
        const status = res.statusCode;
        expect(first_name).toBe(newUserDetails.firstName);
        expect(last_name).toBe(newUserDetails.lastName);
        expect(email).toBe(newUserDetails.email);
        expect(status).toBe(httpStatusCode.CREATED);
        // save account number for new signed up user for later test;
        store.account_number = account_number;
      });
  });

  test("should not allow user to create account with existing email", async () => {
    await superTestServer
      .post(signUpUrl)
      .send(newUserDetails)
      .expect(httpStatusCode.BAD_REQUEST)
      .expect((res) => expect(res.body.success).toBe(false));
  });
});

describe("LOGIN", () => {
  const loginUrl = "/user/account/login";
  test("should allow signed up users to login", async () => {
    const { email, password } = newUserDetails;
    const loginDetails = { email, password };
    await superTestServer
      .post(loginUrl)
      .send(loginDetails)
      .expect(httpStatusCode.SUCCESS)
      .expect((res) => {
        const { success, token } = res.body;
        expect(success).toBe(true);
        expect(token).toBeDefined();
        store.token = token;
      });
  });

  test("should not allow user to login with invalid password ", async () => {
    const { email } = newUserDetails;
    const loginDetails = { email, password: "funkyPassword" };
    await superTestServer
      .post(loginUrl)
      .send(loginDetails)
      .expect(httpStatusCode.BAD_REQUEST);
  });
});

describe("ADD MONEY", () => {
  const addMoneyPath = "/user/account/credit-user-account";
  test("should allow user with valid token to add money", async () => {
    const { token, account_number } = store;
    await superTestServer
      .post(addMoneyPath)
      .set("Authorization", `bearer ${token}`)
      .send({ amountToSend: 1000, accountNumber: account_number })
      .expect(httpStatusCode.SUCCESS);
  });

  test("check if account number doesn't match with logged in user acct number", async () => {
    const { token, account_number } = store;
    await superTestServer
      .post(addMoneyPath)
      .set("Authorization", `bearer ${token}`)
      .send({ amountToSend: 100, account_number: 234123 })
      .expect(httpStatusCode.BAD_REQUEST);
  });

  test("check if account number is empty", async () => {
    const { token, account_number } = store;
    await superTestServer
      .post(addMoneyPath)
      .set("Authorization", `bearer ${token}`)
      .send({ amountToSend: 100, account_number: "" })
      .expect(httpStatusCode.BAD_REQUEST);
  });
});

describe("Withdraw money", () => {
  const withdrawMoneyPath = "/user/account/cash-withdraw";
  test("should allow user with valid token to withraw money", async () => {
    const { token, account_number } = store;
    await superTestServer
      .post(withdrawMoneyPath)
      .set("Authorization", `bearer ${token}`)
      .send({ amount: 100, accountNumber: account_number })
      .expect(httpStatusCode.SUCCESS);
  });

  test("balance cannot be less than the amount to withdraw", async () => {
    const { token, account_number } = store;
    await superTestServer
      .post(withdrawMoneyPath)
      .set("Authorization", `bearer ${token}`)
      .send({ amount: 2000, accountNumber: account_number })
      .expect(httpStatusCode.BAD_REQUEST);
  });
});

describe("Transfer money to another user", () => {
  const sendMoney = `/user/account/cash-transfer`;
  let receiverAccountNum: string;
  let receiverId: string;
  beforeAll(async () => {
    // create secondaccount
    await superTestServer
      .post(signUpUrl)
      .send(secondUserDetails)
      .expect(httpStatusCode.CREATED)
      .expect((res) => {
        const { account_number, id } = res.body.data;
        receiverAccountNum = account_number;
        receiverId = id;
      });
  });

  test("should the user balance be lesser than the amount to send", async () => {
    const { token } = store;

    await superTestServer
      .post(`${sendMoney}/${receiverId}`)
      .set("Authorization", `bearer ${token}`)
      .send({ amountToSend: 1000, accountNumber: receiverAccountNum })
      .expect(httpStatusCode.BAD_REQUEST);
  });

  test("should test if there is no receiver accountNumber", async () => {
    const { token } = store;
    await superTestServer
      .post(`${sendMoney}/${receiverId}`)
      .set("Authorization", `bearer ${token}`)
      .send({ amountToSend: 300 })
      .expect(httpStatusCode.BAD_REQUEST);
  });
  test("should test if there is a receiver accountNumber", async () => {
    const { token } = store;
    console.log("receiverAccountNo::", receiverAccountNum);
    await superTestServer
      .post(`${sendMoney}/${receiverId}`)
      .set("Authorization", `bearer ${token}`)
      .send({ amountToSend: 300, accountNumber: receiverAccountNum })
      .expect(httpStatusCode.SUCCESS);
  });
});
