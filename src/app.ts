import express, { Application, Request, Response } from "express";
import cors from "cors";
import { MovieRoutes } from "./app/modules/movie/movie.routes";
const app: Application = express();

// parser middleware
app.use(express.json());
app.use(express.text());
app.use(cors());

// Application routes
app.use("/api/movies", MovieRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// global error handler
// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((err: any, req: Request, res: Response) => {
  console.error(err);
  if (err.statusCode) {
    res.status(err.statusCode).json({ message: err.message });
  } else {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default app;
