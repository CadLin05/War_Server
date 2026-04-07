
import type { Secret } from "jsonwebtoken";

export default interface Config {
  server: Server;
  database: Database;
  passwords: Passwords;
  jwt: JsonWebToken;
}

interface Server {
  host: string;
  port: number;
}

interface Database {
  host: string;
  user: string;
  password: string;
  database: string;
  connectionLimit: number;
}

interface Passwords {
  salt: number;
  strength: {
    size: number;
  };
}

interface JsonWebToken {
  secret: Secret;
  expiresIn: number;
}