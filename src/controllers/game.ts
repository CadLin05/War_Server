//just for save game to bring results post back to db

import { type ResultSetHeader, type RowDataPacket } from "mysql2";
import pool from "../utils/database.js";

/*
import type { Request, Response } from "express";
import type { game } from '../types/game.js';
import { authenticate } from "../middleware/auth.js";
import { timeStamp } from "node:console";*/

export const saveGame = async(user_id: number, result: string, rounds: number) =>{
   const timevar = new Date();
    await pool.execute<ResultSetHeader>(
        "INSERT INTO game(user_Id,result,rounds,time) VALUES(?,?,?,?)",
        [user_id, result, rounds, timevar],
      );

}