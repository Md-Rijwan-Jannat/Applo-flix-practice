import { Request, Response } from "express";
import { MovieServices } from "./movie.services";
import { movieValidationSchema } from "./movie.interface.zod";

const createMovie = async (req: Request, res: Response) => {
  try {
    const { movie: movieData } = req.body;
    const zodValidateMovie = movieValidationSchema.parse(movieData);
    const result = await MovieServices.createMovieIntoDB(zodValidateMovie);
    res.status(202).json({
      success: true,
      message: "Movie is created successfully",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || "Something went wrong, movie is't created",
      error,
    });
  }
};

const getAllMovies = async (req: Request, res: Response) => {
  try {
    const result = await MovieServices.GetAllMoviesFromDB();
    res.status(202).json({
      success: true,
      message: "Movies are retrieved successfully",
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(404).json({
      success: false,
      message: error.message || "Something  went wrong, movie can't get",
    });
  }
};

const getSingleMovie = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const result = await MovieServices.getSingleMovieBySlugFromDB(slug as string);
  res.status(202).json({
    success: false,
    message: "Movie is retrieved successfully",
    data: result,
  });
};

export const MovieControllers = {
  createMovie,
  getAllMovies,
  getSingleMovie,
};
