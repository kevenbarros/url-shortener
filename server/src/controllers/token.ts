import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { Request, Response, NextFunction } from "express";
export interface CustomRequest extends Request {
  sub?: string;
}

const checkerToken = async (req: Request, res: Response) => {
  try {
    let token: string = String(req?.headers?.token || "");

    if (token) {
      jwt.verify(token, "admin", async (error, decoded) => {
        if (error) {
          return res.status(403).json({
            message: error.message,
            error,
          });
        }

        const user = await User.findOne({ _id: decoded?.sub });

        if (!user)
          return res.status(403).json({
            messagem: "forBidden",
          });

        req.headers.user = decoded?.sub as string;

        return res.status(200).json({ sucess: true }); //everything it's working
      });
    } else {
      return res.status(401).json({
        messagem: "Unauthorized",
      });
    }
  } catch (err) {
    return res.status(500).json({ sucess: false });
  }
};
export { checkerToken };
