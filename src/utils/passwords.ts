import config from "../core/config.js";
import bcrypt from "bcrypt";

export const comparePasswords = (password1: string, password2: string) => {
  if (password1.length >= config.passwords.strength.size) {
    return password1 === password2;
  } else {
    return false;
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, config.passwords.salt, (err, hash) => {
      if (err) {
        reject(err);
      }

      resolve(hash);
    });
  });
};

export const validatePasswords = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, same) => {
      if (err) {
        reject(err);
      }

      resolve(same);
    });
  });
};
