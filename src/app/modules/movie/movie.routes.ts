import express from "express";
import { MovieControllers } from "./movie.controllers";
const router = express.Router();

router.post("/", MovieControllers.createMovie);

router.get("/", MovieControllers.getAllMovies);

router.get("/:slug", MovieControllers.getSingleMovie);

export const MovieRoutes = router;
