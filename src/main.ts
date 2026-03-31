import express from "express";
import cors from "cors"; //npm install cors should fix, still weird for me though
//import userRouter from "./routes/game.js";
//import gameRouter from "./routes/game.js";
//uncomment when you create the full router

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

//commenting out until full router created
//app.use("/user", userRouter);
//app.use("/game", gameRouter);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});