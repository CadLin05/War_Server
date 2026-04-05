import { type ResultSetHeader, type RowDataPacket } from "mysql2";
import pool from "../utils/database.js";
import type { User } from "../types/user.js";
import { hashPassword } from "../utils/passwords.js";

export const registerUser = async (username: string, password: string) => {
  const hashedPassword = await hashPassword(password);

  const data = await pool.execute<ResultSetHeader>(
    "INSERT INTO user(username,password) VALUES(?,?)",
    [username, hashedPassword],
  );

  if (data[0].affectedRows > 0) {
    return data[0].insertId;
  } else {
    return null;
  }
};

//links to logging in 


export const getUserByName = async (username: string) => {
  const [rows] = await pool.execute<(User & RowDataPacket)[]>(
    "SELECT * from user WHERE username=?",
    [username],
  );

  const data = rows[0];
  if (!data) return null;
  //return data[0][0];
    return {
    id: data.user_id,
    username: data.username,
    password: data.password
  };
};


//copied from past assignment, might work might not
export const getHistoryById = async(user_id: number) => {
    const [rows] = await pool.execute<(User & RowDataPacket)[]>(
        "SELECT id,result,rounds,time from game WHERE user_id = ?",
        [user_id],
    );
    console.log("history result: ", rows);
    return rows;
}