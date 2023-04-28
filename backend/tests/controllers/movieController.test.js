const Movie = require("../../models/movie");
const { share_movie_post, get_movie_list } = require("../../controllers/movieController");

describe("Movie Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("share_movie_post", () => {
    it("should create a new movie and return status 201", async () => {
      req.body = {
        title: "The Godfather",
        author: "Francis Ford Coppola",
        videoKey: "godfather",
      };

      const expectedMovie = new Movie({
        title: "The Godfather",
        author: "Francis Ford Coppola",
        videoKey: "godfather",
      });

      Movie.findOne = jest.fn().mockResolvedValue(null);
      Movie.prototype.save = jest.fn().mockResolvedValue(expectedMovie);

      await share_movie_post(req, res);

      expect(Movie.findOne).toHaveBeenCalledWith({ videoKey: "godfather" });
      expect(Movie.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(expectedMovie);
    });

    it("should return 201 and message 'Video already exists' if video already exists", async () => {
      req.body = {
        title: "The Godfather",
        author: "Francis Ford Coppola",
        videoKey: "godfather",
      };

      Movie.findOne = jest.fn().mockResolvedValue({ videoKey: "godfather" });

      await share_movie_post(req, res);

      expect(Movie.findOne).toHaveBeenCalledWith({ videoKey: "godfather" });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Video already exists' });
    });

    it("should return 400 and error message on error", async () => {
      req.body = {
        title: "The Godfather",
        author: "Francis Ford Coppola",
        videoKey: "godfather",
      };

      Movie.findOne = jest.fn().mockRejectedValue(new Error("Error saving movie"));

      await share_movie_post(req, res);

      expect(Movie.findOne).toHaveBeenCalledWith({ videoKey: "godfather" });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Error saving movie" });
    });
  });

  describe("get_movie_list", () => {
    it("should return all movies", async () => {
      const expectedMovies = [
        { title: "The Godfather", author: "Francis Ford Coppola", videoKey: "godfather" },
        { title: "Star Wars", author: "George Lucas", videoKey: "starwars" },
      ];

      Movie.find = jest.fn().mockResolvedValue(expectedMovies);

      await get_movie_list(req, res);

      expect(Movie.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(expectedMovies);
    });

    it("should return error message on error", async () => {
      Movie.find = jest.fn().mockRejectedValue(new Error("Error getting movies"));

      await get_movie_list(req, res);

      expect(Movie.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Error getting movies" });
    });
  });
});
