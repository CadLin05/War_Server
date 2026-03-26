import type { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../utils/jwt.js";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1]?.trim();

    if (token) {
      try {
        const decoded = await verifyJWT(token);
        req.user = decoded;
        next();
      } catch {
        res.status(403).send("Invalid or expired token");
      }
    } else {
      res.status(401).send("Unauthoirzed access attempt");
    }
  } else {
    res.status(401).send("Unauthorized access attempt");
  }
};
