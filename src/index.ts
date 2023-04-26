import * as data from "./db.json";
import { FilteredObjAcc, GenerateRandomIntegerProps, Genre, Movie } from "./index.types";

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
  // create an object with keys as number of matches and values as arrays of movies
  const filteredObj = movies.reduce<FilteredObjAcc>((acc, movie) => {
    // return a number of matches for each movie
    const numberOfMatches = genres.reduce(
      (acc2, genre) => (movie.genres.includes(genre) ? acc2 + 1 : acc2),
      0
    );

    // if there are no matches, return the accumulator as is
    // otherwise, return the accumulator with the new movie added to the array of movies with the same number of matches
    return numberOfMatches === 0
      ? acc
      : movie.genres.length !== numberOfMatches // important! see notes below ↓
      ? acc
      : {
          ...acc,
          [numberOfMatches]: acc[numberOfMatches]
            ? [...acc[numberOfMatches], movie]
            : [movie],
        };
  }, {});

  // sort the keys in descending order
  const sortedKeys = Object.keys(filteredObj)
    .map((el) => parseInt(el))
    .sort((a, b) => b - a);
  // return the array of movies with the highest number of matches at the beginning
  return sortedKeys.reduce<Movie[]>((acc, key) => acc.concat(filteredObj[key]), []);
};

// I just wanted to share my view on how this user experience should be implemented.
// The way you want the function to work is ok but it limits possible movies that are within possible user liking.
// For example if the user choose ['Crime', 'Drama'] he would only get movies that are Crime and Drama only, but not Crime and Drama and Thriller or Crime and Drama and Music which I my opinion he should get as the results.
// By removing the condition marked with important you can achieve this functionality.
