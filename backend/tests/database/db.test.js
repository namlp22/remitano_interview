const mongoose = require('mongoose');
const connectToMongoDB = require('../src/database/db');

describe('database/db.js', () => {
  it('connects to MongoDB successfully', async () => {
    // Set the database URL to a test database
    process.env.DATABASE_URL = 'mongodb://127.0.0.1:27017';
    
    // Call the function to connect to MongoDB
    const db = await connectToMongoDB();
    
    // Check if the connection is successful
    expect(db).toBeDefined();
    expect(mongoose.connection.readyState).toBe(1);
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
  });
});
