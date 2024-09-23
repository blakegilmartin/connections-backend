import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import userRouter from "./src/routes/user";
import bodyParser from "body-parser";
import methodOverride from "method-override";

export const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  console.error(err);
  res
    .status(500)
    .send({ errors: [{ message: err.message }] })
    .end();
};

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());
app.use(methodOverride());

app.use("/user", userRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
