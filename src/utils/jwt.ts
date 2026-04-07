import jwt from "jsonwebtoken";
import config from "../core/config.js";
import type { Payload } from "../types/jwt.js";

export const generateJWT = async (payload: Payload) => {
  return new Promise((resolve) => {
    const token = jwt.sign(payload, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn,
    });
    resolve(token);
  });
};

export const verifyJWT = async (token: string) => {
  const data = jwt.verify(token, config.jwt.secret) as Payload;
  return data;
};
