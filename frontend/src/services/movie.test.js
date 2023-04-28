import { makeRequest } from "./index";
import { getMovieList, shareMovie } from "./movies";

jest.mock("./index");

describe("getMovieList", () => {
  it("should call makeRequest with correct arguments", async () => {
    const data = { limit: 10 };
    const expectedConfig = { url: "movie/get-movie-list", method: "GET", data };
    makeRequest.mockResolvedValueOnce({});

    await getMovieList(data);

    expect(makeRequest).toHaveBeenCalledWith(expectedConfig);
  });

  it("should return the response data from makeRequest", async () => {
    const response = { data: [{ title: "Movie 1" }, { title: "Movie 2" }] };
    makeRequest.mockResolvedValueOnce(response);

    const result = await getMovieList();

    expect(result).toEqual(response.data);
  });

  it("should throw an error if makeRequest throws an error", async () => {
    const error = new Error("Request failed");
    makeRequest.mockRejectedValueOnce(error);

    await expect(getMovieList()).rejects.toThrow(error);
  });
});

describe("shareMovie", () => {
  it("should call makeRequest with correct arguments", async () => {
    const data = { title: "Movie 1", description: "Description", author: "author" };
    const expectedConfig = { url: "movie/share-movie", method: "POST", data };
    makeRequest.mockResolvedValueOnce({});

    await shareMovie(data);

    expect(makeRequest).toHaveBeenCalledWith(expectedConfig);
  });

  it("should return the response data from makeRequest", async () => {
    const response = { data: { title: "Movie 1", description: "Description", year: 2022 } };
    makeRequest.mockResolvedValueOnce(response);

    const result = await shareMovie({});

    expect(result).toEqual(response.data);
  });

  it("should throw an error if makeRequest throws an error", async () => {
    const error = new Error("Request failed");
    makeRequest.mockRejectedValueOnce(error);

    await expect(shareMovie({})).rejects.toThrow(error);
  });
});
