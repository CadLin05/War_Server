import type { Payload } from "./jwt.ts";

declare global {
  namespace Express {
    interface Request {
      user?: Payload;
    }
  }
}

export {};