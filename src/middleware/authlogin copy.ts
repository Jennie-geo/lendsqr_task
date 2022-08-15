import { Request, Response, NextFunction } from "express";
import db from "../database/db";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
  user?: User;
}
interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  account_number: string;
  balance?: number;
  created_at: string;
  updated_at: string;
}
export function authlogin(
  req: CustomRequest,
  res: Response,
  next: NextFunction
): any {
  const token =
    req.headers["authorization"] || (req.query.authorization as string);
  if (!token) {
    return res.status(403).send("You have to login to continue");
  }
  const tokenBody = token.slice(7);
  jwt.verify(tokenBody, process.env.JWT_SECRET!, async (err, decoded) => {
    if (err) {
      console.log("error", err);
      return res.status(403).send({ Error: "Access denied" });
    } else {
      const { userId } = decoded as {
        userId: string;
        iat: number;
        exp: number;
      };

      const user = await db("users").where("id", userId).first();
      if (!user) {
        return res.send({ login: `No User exists with this ${userId}` });
      }
      req.user = user;
      next();
    }
  });
}
