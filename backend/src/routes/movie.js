const express = require("express");
const movieRouter = express.Router();
const movie_controller = require("../controllers/movieController");

const { authenticateJWT } = require("./auth");

// Get movie list
movieRouter.get("/get-movie-list", async (req, res) => {
  movie_controller.get_movie_list(req, res);
});

// Share a movie
movieRouter.post("/share-movie", authenticateJWT, async (req, res) => {
  movie_controller.share_movie_post(req, res);
});

module.exports = movieRouter;
