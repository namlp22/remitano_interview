const request = require('supertest');
const express = require('express');
const movieRouter = require('../../routes/movie');
const movie_controller = require('../../controllers/movieController');

// mock authenticateJWT function
jest.mock('../../routes/auth', () => {
  return {
    authenticateJWT: jest.fn((req, res, next) => {
      next();
    }),
  };
});

describe('movie routes', () => {
  const app = express();
  app.use(express.json());
  app.use('/movie', movieRouter);

  test('GET /movie/get-movie-list', async () => {
    movie_controller.get_movie_list = jest.fn().mockResolvedValue([]);
    const response = await request(app).get('/movie/get-movie-list');
    expect(response.statusCode).toBe(200);
    expect(movie_controller.get_movie_list).toHaveBeenCalled();
  });

  test('POST /movie/share-movie', async () => {
    movie_controller.share_movie_post = jest.fn().mockResolvedValue({});
    const response = await request(app)
      .post('/movie/share-movie')
      .send({ title: 'Test Movie', author: 'Test Author', videoKey: 'test123' });
    expect(response.statusCode).toBe(200);
    expect(movie_controller.share_movie_post).toHaveBeenCalled();
  });
});
