import bodyParser from "body-parser";
import compression from "compression";
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import { ApplicationError } from "./errors";
import routes from "./routes";

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("port", process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }));
app.use("/api", routes);

app.use((err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }

  return res.status(err.status || 500).json({
    error: process.env.NODE_ENV === "development" ? err : undefined,
    message: err.message
  });
});

export default app;
