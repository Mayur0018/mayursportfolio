import mongoose from 'mongoose';

// Support several common environment variable names used locally and on hosts
const MONGO_URI = process.env.MONGODB_URI || process.env.MONGO_URI || process.env.NEXT_PUBLIC_MONGO_URI;

/**
 * Mongoose connection helper for serverless environments.
 * Reuses global cached connection to avoid creating new connections
 * on every invocation (Vercel / serverless friendly).
 */
let cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } = (global as any)._mongo || { conn: null, promise: null };

export default async function connectMongo() {
  if (!MONGO_URI) {
    throw new Error('Please define MONGODB_URI (or MONGO_URI / NEXT_PUBLIC_MONGO_URI) in your environment');
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    } as mongoose.ConnectOptions;
    cached.promise = mongoose.connect(MONGO_URI as string, opts).then((m) => m);
    (global as any)._mongo = cached;
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
