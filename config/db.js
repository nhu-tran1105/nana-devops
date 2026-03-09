import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config';

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let dbConnection;

/**
 * Establish the initial connection to MongoDB Atlas
 */
export const connectDB = async () => {
  try {
    await client.connect();
    dbConnection = client.db('nana'); 
    console.log('✅ Connected to MongoDB via Singleton');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  }
};

/**
 * Retrieve the active database connection
 */
export const getDB = () => {
  if (!dbConnection) {
    throw new Error('Database not initialized. Call connectDB first.');
  }
  return dbConnection;
};