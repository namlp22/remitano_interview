const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  videoKey: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  createdTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model("Movie", movieSchema);
