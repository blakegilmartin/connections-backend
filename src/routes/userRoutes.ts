import express from "express";
import userDb from "../dbs/userDb";

const userRouter = express.Router();

userRouter.post("/create", async (req, res, next) => {
  try {
    const user = await userDb.create(req.body);
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

userRouter.get("/all", async (req, res, next) => {
  try {
    const allUsers = await userDb.readAll();
    res.status(200).send(allUsers);
  } catch (error) {
    next(error);
  }
});

export default userRouter;
