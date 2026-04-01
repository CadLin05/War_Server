import { Router } from "express";
import { generateJWT } from "../utils/jwt.js";
import { authenticate } from "../middleware/auth.js";
import { getHistoryById, getUserByName, registerUser } from "../controllers/user.js";
import { comparePasswords, validatePasswords } from "../utils/passwords.js";

const router = Router();

router.post("/register", async (req, res)=>{
    const username: string | undefined = req.body.username;
    const password: string | undefined = req.body.password;
    const password2: string | undefined = req.body.password2;

    if (username && password && password2) {
    const exists = await getUserByName(username);
    if (!exists) {
      if (comparePasswords(password, password2)) {
        const created = await registerUser(username, password);
        if (created) {
          res.json({ status: "success", data: { username: username } });
        } else {
          res
            .status(500)
            .send(`Something went wrong while creating a new user: ${username}`);
        }
      } else {
        res
          .status(400)
          .send(
            `Your provided password does not match the complexity requirements`,
          );
      }
    } else {
      res.status(400).send(`An account with that name already exists`);
    }
  } else {
    res
      .status(400)
      .send(`Please provide all the required data for registering an account`);
  }
});


//login

router.post("/login", async (req, res) => {
  //Route for logging a user in
  const username: string | undefined = req.body.username;
  const password: string | undefined = req.body.password;

  if (username && password) {
    const exists = await getUserByName(username);
    if (exists) {
      if (await validatePasswords(password, exists.password.toString("utf8"))) {
        //Need to setup the authentication here
        const token = await generateJWT({ id: exists.id, username: exists.username });
        res.json({ status: "success", data: { token, user: { username } } });
      } else {
        res.status(400).send(`Invalid username or password`);
      }
    } else {
      res.status(400).send(`Invalid username or password`);
    }
  } else {
    res.status(400).send(`Please provide all the required data for logging in`);
  }
});


//history get

router.get("/history", authenticate, async(req,res)=>{
    if (req.user){
        const history = await getHistoryById(req.user.id);
        res.json({status: "success", data: { history }});
    }else{
        res.status(500).send("Somehow got past auth without setting the history data");
    }
});
export default router;