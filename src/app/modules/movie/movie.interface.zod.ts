// movie.validation.ts
import { Model } from "mongoose";
import { z } from "zod";

// Define the review schema
const reviewValidationSchema = z.object({
  email: z.string().email("Invalid email format"),
  rating: z
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating cannot be more than 5"),
  comment: z.string().min(1, "Comment cannot be empty"),
});

// Define the movie schema
const movieValidationSchema = z.object({
  title: z.string().min(1, "Title cannot be empty"),
  description: z.string().min(1, "Description cannot be empty"),
  releaseDate: z.string({ required_error: "Movie date is required" }),
  genre: z.string().min(1, "Genre cannot be empty"),
  isDeleted: z.boolean().default(false),
  viewCount: z.number().nonnegative("View count cannot be negative").default(0),
  reviews: z.array(reviewValidationSchema).default([]),
  slug: z.string().optional(),
});

type TReviewValidation = z.infer<typeof reviewValidationSchema>;
type TMovieValidation = z.infer<typeof movieValidationSchema>;
// ----< create a instance methods>

// export interface IMovieMethods {
//   createSlug(): string;
// }

// export type TMovieModel = Model<
//   TMovieValidation,
//   Record<string, never>,
//   IMovieMethods
// >;

// ---<Create a static methods>

export interface IMoviesStaticModel extends Model<TMovieValidation> {
  createSlug(title: string, releaseDate: string): string;
}

export { movieValidationSchema, TMovieValidation, TReviewValidation };
