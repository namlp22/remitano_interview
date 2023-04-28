const request = require('supertest');
const express = require('express');
const jwt = require('jsonwebtoken');

const { authRouter, authenticateJWT } = require('../../routes/auth');
const auth_controller = require('../../controllers/authController');

// Create a mock Express app
const app = express();

// Use the authRouter middleware
app.use('/auth', authRouter);

describe('authentication routes', () => {
  describe('POST /auth/login-register', () => {
    test('should respond with 200 and a token on successful login', async () => {
      const user = { username: 'testuser', password: 'password123' };
      const response = await request(app)
        .post('/auth/login-register')
        .send(user);
      
      expect(response.statusCode).toBe(200);
      expect(response.body.token).toBeDefined();
    });
  });

  describe('authenticateJWT middleware', () => {
    test('should call next if a valid token is provided', async () => {
      // Create a mock request with a valid JWT token
      const token = jwt.sign({ username: 'testuser' }, process.env.SECRET_KEY);
      const req = { headers: { authorization: `Bearer ${token}` } };
      const res = {};
      const next = jest.fn();

      await authenticateJWT(req, res, next);

      expect(next).toHaveBeenCalled();
      expect(req.user.username).toBe('testuser');
    });

    test('should respond with 401 if an invalid token is provided', async () => {
      // Create a mock request with an invalid JWT token
      const req = { headers: { authorization: 'Bearer invalidtoken' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await authenticateJWT(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Invalid token' });
    });

    test('should respond with 401 if no token is provided', async () => {
      // Create a mock request with no JWT token
      const req = { headers: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();

      await authenticateJWT(req, res, next);

      expect(next).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });
  });
});
