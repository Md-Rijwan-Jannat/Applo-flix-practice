import { Movie } from "./movie.model";
// import { format } from "date-fns";
// import slugify from "slugify";
import { TMovieValidation } from "./movie.interface.zod";

const createMovieIntoDB = async (payload: TMovieValidation) => {
  //date formatting using date-fns
  // const date = format(movie.releaseDate, "dd-MM-yyy");
  // const slug = slugify(`${movie.title}-${date}`, {
  //   lower: true,
  //   trim: true,
  // });

  // instance methods
  // const result = new Movie(payload)
  // const slug = result.createSlug();
  // console.log({ slug });
  // result.slug = slug;
  // await result.save();

  // create a static methods
  const slug = Movie.createSlug(payload.title, payload.releaseDate);
  const result = new Movie({ ...payload, slug });
  return result;
};

const GetAllMoviesFromDB = async () => {
  const result = await Movie.find();
  return result;
};

const getSingleMovieBySlugFromDB = async (slug: string) => {
  const result = await Movie.findOne({ slug });
  return result;
};

export const MovieServices = {
  createMovieIntoDB,
  GetAllMoviesFromDB,
  getSingleMovieBySlugFromDB,
};
