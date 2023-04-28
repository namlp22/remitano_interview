const mongoose = require('mongoose');
const Movie = require('../../models/movie');

describe('Movie model', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterEach(async () => {
    await Movie.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should be able to save a movie', async () => {
    const movie = new Movie({
      videoKey: 'abc123',
      title: 'Test Movie',
      author: 'John Doe',
    });
    await movie.save();

    const foundMovie = await Movie.findOne({ videoKey: 'abc123' });
    expect(foundMovie.title).toEqual('Test Movie');
  });

  it('should not be able to save a movie with a duplicate video key', async () => {
    const movie1 = new Movie({
      videoKey: 'abc123',
      title: 'Test Movie 1',
      author: 'John Doe',
    });
    const movie2 = new Movie({
      videoKey: 'abc123',
      title: 'Test Movie 2',
      author: 'Jane Smith',
    });

    await movie1.save();
    try {
      await movie2.save();
    } catch (error) {
      expect(error.code).toEqual(11000); // MongoDB duplicate key error code
    }
  });
});
