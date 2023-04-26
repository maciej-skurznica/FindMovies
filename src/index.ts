import * as data from "./db.json";
import { GenerateRandomIntegerProps, Genre, Movie } from "./index.types";

const generateRandomInteger = ({ start, end }: GenerateRandomIntegerProps): number => {
  return Math.floor(Math.random() * (end - start + 1)) + start;
};

export const getFilteredMovies = ({ genres }: { genres: Genre[] }): Movie[] => {
  const movies = data.movies;

  // cover first edge case
  if (!genres.length) {
    const randomIndex = generateRandomInteger({ start: 0, end: movies.length - 1 });
    return [movies[randomIndex]];
  }

  // cover the actual task
  return [];
};

console.log(getFilteredMovies({ genres: ["Comedy", "Fantasy"] }));
