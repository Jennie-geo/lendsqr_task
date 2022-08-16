import { Request, Response, NextFunction } from "express";
import db from "../database/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { CustomRequest } from "../middleware/authlogin copy";
import { SQL_ERRORS } from "../utils";
require("dotenv").config();

const userDetail = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  account_number: "",
  balance: 0,
  created_at: "",
  updated_at: "",
};

export async function createUser(req: Request, res: Response) {
  try {
    const accountNum = Math.floor(100000 + Math.random() * 90000000000);
    const hashPasswd = await bcrypt.hash(req.body.password, 8);
    const userId = uuidv4();
    await db("users").insert({
      id: userId,
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      password: hashPasswd,
      account_number: accountNum,
    });
    const user = (
      await db
        .from("users")
        .select(["id", "first_name", "last_name", "email", "account_number"])
        .where({ id: userId })
    )[0];

    return res
      .status(201)
      .json({ success: true, message: "User signup successfully", data: user });
  } catch (error: any) {
    console.log(JSON.stringify(error, null, 2));
    if (error.errno === SQL_ERRORS.ER_DUP_ENTRY) {
      return res.status(400).json({
        success: false,
        message: "Cannot create account with existing email",
      });
    }
    return res
      .status(500)
      .json({ success: false, errorMessage: error.message });
  }
}

export async function loginUser(req: Request, res: Response) {
  try {
    const user = await db.from("users").where({ email: req.body.email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, errorMessage: "No email found", data: [] });
    }
    user.forEach((data) => {
      userDetail.id = data.id;
      userDetail.firstName = data.first_name;
      userDetail.lastName = data.last_name;
      userDetail.email = data.email;
      userDetail.password = data.password;
      userDetail.account_number = data.account_number;
      userDetail.balance = data.balance;
      userDetail.created_at = data.created_at;
      userDetail.updated_at = data.updated_at;
    });
    const matchPasswd = await bcrypt.compare(
      req.body.password,
      userDetail.password
    );
    if (!matchPasswd) {
      return res
        .status(400)
        .json({ success: false, errorMessage: "Password does not match" });
    } else {
      const token = jwt.sign(
        { userId: userDetail.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "2h",
        }
      );

      return res.status(200).json({
        success: true,
        message: "Auth successful",
        token: token,
      });
    }
  } catch (error: any) {
    console.log("ERROR", error);
    return res
      .status(500)
      .json({ success: false, errorMessage: error.message });
  }
}

export async function addMoneyToAcct(req: CustomRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorize." });
    }
    const user = req.user;
    const { amountToSend, accountNumber } = req.body;
    const userInfo = await db.from("users").where("id", user.id).first();
    if (!userInfo) {
      return res
        .status(400)
        .json({ success: false, errorMessage: "User account doesn't exist" });
    }

    if (
      userInfo.account_number !== accountNumber ||
      userInfo.account_number === ""
    ) {
      return res.status(400).json({
        success: false,
        errorMessage: "The account number does not match",
      });
    } else {
      const sendMoney = await db("accounts").insert({
        id: uuidv4(),
        amount: amountToSend,
        senderId: userInfo.id,
        userId: userInfo.id,
      });
      const incrementAmt = userInfo.balance + amountToSend;
      await db("users").where("id", userInfo.id).update({
        balance: incrementAmt,
      });

      return res.status(200).json({
        success: true,
        message: `An amount of ${amountToSend} has been sent successfully`,
        data: sendMoney,
      });
    }
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, errorMessage: error.message });
  }
}

export async function sendMoneyToAnotherAccount(
  req: CustomRequest,
  res: Response
) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorize." });
    }
    const accountId = uuidv4();
    const { amountToSend, accountNumber } = req.body;
    if (!amountToSend || !accountNumber) {
      return res.status(400).json({
        success: false,
        errorMessage: "amountTosend and accountNumber must be provided",
      });
    }
    const sender = await db.from("users").where("id", req.user.id).first();
    if (sender.balance < amountToSend) {
      return res
        .status(400)
        .json({ success: false, errorMessage: "Insufficient fund!" });
    }
    const receiver = await db("users").where("id", req.params.id).first();

    console.log("Receiver", receiver);
    console.log("receiver.account_number", receiver.account_number);
    console.log("account_number", accountNumber);

    if (!receiver || receiver.account_number !== accountNumber) {
      return res.status(400).json({
        success: false,
        errorMessage: "Recipient does not exist.",
      });
    }
    await db("accounts").insert({
      id: accountId,
      userId: receiver.id,
      amount: amountToSend,
      senderId: sender.id,
    });
    const sendMoney = (
      await db("accounts")
        .select(["id", "userId", "amount", "senderId"])
        .where({ id: accountId })
    )[0];

    await db("users")
      .where("id", sender.id)
      .update({
        balance: sender.balance - amountToSend,
      });
    await db("users")
      .where("id", receiver.id)
      .update({
        balance: receiver.balance + amountToSend,
      });
    return res.status(200).json({
      success: true,
      message: `A transfer of ${amountToSend} was successful`,
      data: sendMoney,
    });
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, errorMessage: error.message });
  }
}

export async function withdrawAmount(req: CustomRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorize." });
    }

    const { amount, accountNumber } = req.body;
    const acctInfo = await db("users")
      .select()
      .where("id", req.user.id)
      .first();
    if (!acctInfo) {
      return res.status(400).json({
        success: false,
        errorMessage:
          "Either the account number doesn't exist/it doesn't belong to you.",
      });
    }

    if (acctInfo.balance < amount) {
      return res
        .status(400)
        .json({ success: false, errorMessage: "Insufficient fund!" });
    }
    const accountBal = acctInfo.balance - amount;

    await db("users").where("id", req.user.id).update("balance", accountBal);
    return res.status(200).json({
      success: true,
      successMessage: `An amount of ${amount} has been withdrew from account
           number ${acctInfo.account_number}`,
      AccountStatement: {
        Fullname: `${acctInfo.first_name} ${acctInfo.last_name}`,
        AcctNumber: acctInfo.account_number,
        Amountwithdrawn: amount,
        AcctBalance: accountBal,
      },
    });
  } catch (error: any) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, errorMessage: error.message });
  }
}
export async function allusers(req: Request, res: Response) {
  try {
    await db("users")
      .select(
        "id",
        "first_name",
        "last_name",
        "email",
        "account_number",
        "balance",
        "created_at"
      )
      .then((users) => {
        res.status(200).json({ success: true, data: users });
      });
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: false, errorMessage: error.message });
  }
}

export async function singleUserAcct(req: CustomRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorize." });
    }
    const { id } = req.params;
    await db("users").where({ id: id });

    const userDetail = (
      await db
        .from("users")
        .select(
          "id",
          "first_name",
          "last_name",
          "balance",
          "account_number",
          "created_at"
        )
    )[0];
    return res.status(200).json({ success: true, message: userDetail });
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: false, errorMessage: error.message });
  }
}

export async function seePersonalProfile(req: CustomRequest, res: Response) {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorize." });
    }
    const user = req.user;

    db("users")
      .where("id", user.id)
      .first()
      .then(function (user) {
        return res.status(200).json({ success: true, message: user });
      })
      .catch((error) => {
        return res
          .status(400)
          .json({ success: false, errorMessage: "No user with id exist" });
      });
  } catch (error: any) {
    return res
      .status(500)
      .json({ success: false, errorMessage: error.message });
  }
}
