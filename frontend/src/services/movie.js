import { makeRequest } from "./index";

export function getMovieList(data = {}) {
  const url = "movie/get-movie-list";
  return makeRequest({ url, method: "GET", data });
}
export function shareMovie(data = {}) {
  const url = "movie/share-movie";
  return makeRequest({ url, method: "POST", data });
}
