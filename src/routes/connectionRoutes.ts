import express from "express";
import connectionsDb from "../dbs/connectionDb";
import connectionService from "../services/connectionService";

const connectionRouter = express.Router();

connectionRouter.post("/create", async (req, res, next) => {
  try {
    const user = await connectionsDb.create(req.body);
    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

connectionRouter.post("/checkAttempt", async (req, res, next) => {
  try {
    const attemptString: string = req.body.attemptString;
    const connectionId = Number(req.query.id);
    const answer = await connectionService.checkAttempt(
      connectionId,
      attemptString
    );
    res.status(200).send(answer);
  } catch (error) {
    next(error);
  }
});

export default connectionRouter;
