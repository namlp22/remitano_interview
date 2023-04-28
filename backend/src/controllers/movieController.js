const Movie = require("../models/movie");

// Handle get list movie on GET
exports.get_movie_list = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Handle share movie on POST
exports.share_movie_post = async (req, res) => {
  const { title, author, videoKey } = req.body;

  try {
    const existingMovie = await Movie.findOne({ videoKey: videoKey });
    if (existingMovie) {
      return res.status(201).json({ message: 'Video already exists' });
    }
    const newMovie = new Movie({
      title: title,
      author: author,
      videoKey: videoKey,
    });
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
