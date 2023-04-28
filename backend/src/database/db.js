const mongoose = require("mongoose");

const connectToMongoDB = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on("error", (error) => {
      console.error("MongoDB connection error: ", error);
      reject(error);
    });
    db.once("open", () => {
      console.log("Connected to MongoDB");
      resolve(db);
    });
  });
};

module.exports = connectToMongoDB;
