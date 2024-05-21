// movie.model.ts
import { Schema, model } from "mongoose";
import {
  IMoviesStaticModel,
  TMovieValidation,
  TReviewValidation,
} from "./movie.interface.zod";
import { format } from "date-fns";
import slugify from "slugify";

// Create the review schema
export const reviewSchema: Schema<TReviewValidation> = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
    required: true,
    trim: true,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
});

// Create the movie schema
export const movieSchema = new Schema<TMovieValidation, IMoviesStaticModel>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  releaseDate: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  viewCount: {
    type: Number,
    default: 0,
    trim: true,
  },
  reviews: {
    type: [reviewSchema],
    default: [],
  },
  slug: {
    type: String,
  },
});

// movieSchema.method("createSlug", function () {
//   // `this` refers to the document instance
//   const date = format(this.releaseDate, "dd-MM-yyyy");
//   const slug = slugify(`${this.title}-${date}`, {
//     lower: true,
//     trim: true,
//   });
//   return slug;
// });

// Create static methods
movieSchema.statics.createSlug = function (
  title: string,
  releaseDate: string,
): string {
  const date = format(releaseDate, "dd-MM-yyyy");
  const slug = slugify(`${title}-${date}`, {
    trim: true,
    lower: true,
  });
  return slug;
};

export const Movie = model<TMovieValidation, IMoviesStaticModel>(
  "Movie",
  movieSchema,
);
