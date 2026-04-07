import { Router } from "express";
import { generateJWT } from "../utils/jwt.js";
import { authenticate } from "../middleware/auth.js";
import { saveGame } from "../controllers/game.js";

const router = Router();

router.post("/saveGame", authenticate, async(req, res)=>{
    const result: string | undefined = req.body.result;
    const rounds: number | null = req.body.rounds ? parseInt(req.body.rounds) : null;



    if(req.user && result && rounds){
        
         try {
            await saveGame(
            req.user.id,
            result,
            rounds,
         );
         res.json({ status: "success"   }); //data: { can we print out a game saved? }
         } catch (error) {
            console.error("SAVE GAME ERROR:", error);
            res.status(500).send("Something went wrong while saving a game");
         }
        
        }else{
            res.status(400).send(`Dont have required info to save`);
        }
    }
)

export default router; 