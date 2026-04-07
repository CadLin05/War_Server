import type Config from "./types.js";

const config: Config = {
  server: {
    host: process.env.SERVER_HOST || "localhost",
    port: process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 7000,
  },
  database: {
    host: process.env.DATABASE_HOST || "localhost",
    user: process.env.DATABASE_USER || "root",
    password: process.env.DATABASE_PASSWORD || "password",
    database: process.env.DATABASE || "war",
    connectionLimit: process.env.DATABASE_CONNECTION_LIMIT
      ? parseInt(process.env.DATABASE_CONNECTION_LIMIT)
      : 10,
  },
  passwords: {
    salt: process.env.ENCRYPT_SALT ? parseInt(process.env.ENCRYPT_SALT) : 10,
    strength: {
      size: process.env.PASSWORD_STRENGTH_SIZE
        ? parseInt(process.env.PASSWORD_STRENGTH_SIZE)
        : 8,
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET || "backupsecret",
    expiresIn: process.env.JWT_EXPIRES
      ? parseInt(process.env.JWT_EXPIRES)
      : 5000000000,
  },
}
export default config;