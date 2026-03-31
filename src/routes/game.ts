import { Router } from "express";
import { generateJWT } from "../utils/jwt.js";
import { authenticate } from "../middleware/auth.js";
import { saveGame } from "../controllers/game.js";

const router = Router();

router.post("/saveGame", async(req, res)=>{
    const game_Id: number | null = req.body.game_Id ? parseInt(req.body.game_Id) : null;
    const result: string | undefined = req.body.result;
    const rounds: number | null = req.body.rounds ? parseInt(req.body.rounds) : null;
    const time: Date | null = req.body.time;


    if(game_Id && req.user && result && rounds && time){
        const inserted = await saveGame(
            game_Id,
            req.user.id,
            result,
            rounds,
            time,
         );
         if (inserted !== null){
            res.json({ status: "success"  }); //data: { can we print out a game saved? }
         }else{
            res.status(500).send("Something went wrong while adding a new message");
         }

        }else{
            res.status(400).send(`Dont have required info to save`);
        }
    }
)

export default router; 