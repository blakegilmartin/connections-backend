import express from "express";
import userDb from "../db/userDb";

const userRouter = express.Router();

userRouter.post("/create", async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await userDb.create(req.body);
    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
});

export default userRouter;
