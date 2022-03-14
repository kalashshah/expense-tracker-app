import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose, { ConnectOptions } from "mongoose";
import { PORT, MONGO_URI } from "../util/secret";
import {
  userRoutes,
  transactionRoutes,
  categoryRoutes,
  dashboardRoutes,
} from "../routes";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (_: Request, res: Response) => {
  res.send(
    "Welcome to expense tracker backend, please  have a look at the github repo for the link to the app"
  );
});

app.use("/account", userRoutes);
app.use("/transaction", transactionRoutes);
app.use("/category", categoryRoutes);
app.use("/dashboard", dashboardRoutes);

interface Options extends ConnectOptions {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

const options: Options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(MONGO_URI, options)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB: ", error);
  });
