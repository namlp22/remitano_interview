const mongoose = require('mongoose');
const User = require('../../models/user');

describe('User model', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  });

  afterEach(async () => {
    await User.deleteMany();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should correctly create and save a user', async () => {
    const userData = { email: 'test@example.com', password: 'password123' };
    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).toBe(userData.password);
    expect(savedUser.createdTime).toBeDefined();
  });

  it('should fail to create a user with invalid input', async () => {
    const user = new User({ email: 'test@example.com' }); // missing password
    let error;

    try {
      await user.save();
    } catch (err) {
      error = err;
    }

    expect(error).toBeDefined();
  });
});
