//just for save game to bring results post back to db

import { type ResultSetHeader, type RowDataPacket } from "mysql2";
import pool from "../utils/database.js";
import type { Request, Response } from "express";
import type { game } from '../types/game.js';
import { authenticate } from "../middleware/auth.js";
import { timeStamp } from "node:console";

export const saveGame = async(game_Id: number, user_Id: number, result: string, rounds: number, time: Date) =>{
   const timevar = new Date();
    const data = await pool.execute<ResultSetHeader>(
        "INSERT INTO game(game_Id,result,rounds,timedate) VALUES(?,?,?)",
        [game_Id, user_Id, result, rounds, timevar],
      );

}