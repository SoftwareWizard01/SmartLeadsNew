import mongoose from 'mongoose';
import { env } from './env';

const MAX_RETRIES = 5;
const RETRY_INTERVAL_MS = 5000;

export const connectDB = async (): Promise<void> => {
  let attempts = 0;

  while (attempts < MAX_RETRIES) {
    try {
      await mongoose.connect(env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
      });
    console.log(`✅ MongoDB connected: ${mongoose.connection.host}`);
    return;
  } catch (error) {
    attempts++;
    console.error(
      `❌ MongoDB connection attempt ${attempts}/${MAX_RETRIES} failed.`,
      error instanceof Error ? error.message : error
    );

    if (attempts < MAX_RETRIES) {
      console.log(`⏳ Retrying in ${RETRY_INTERVAL_MS / 1000}s...`);
      await new Promise((res) => setTimeout(res, RETRY_INTERVAL_MS));
    } else {
      console.error('💥 All MongoDB connection attempts exhausted. Exiting.');
      process.exit(1);
    }
  }
}
};

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️  MongoDB disconnected.');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err);
});
