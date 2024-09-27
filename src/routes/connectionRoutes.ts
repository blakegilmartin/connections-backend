import express from "express";
import connectionsDb from "../dbs/connectionDb";
import connectionService from "../services/connectionService";
import connectionDb from "../dbs/connectionDb";

const connectionRouter = express.Router();

connectionRouter.post("/create", async (req, res, next) => {
  try {
    const connection = await connectionsDb.create(req.body);
    res.status(200).send(connection);
  } catch (error) {
    next(error);
  }
});

connectionRouter.get("/latest", async (req, res, next) => {
  try {
    const connection = await connectionsDb.getLatest();
    res.status(200).send(connection);
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

connectionRouter.delete("/deleteAll", async (req, res, next) => {
  try {
    await connectionDb.deleteAll();
    console.log("deleted all");
    res.status(200).send("deleted all");
  } catch (error) {
    next(error);
  }
});

export default connectionRouter;
