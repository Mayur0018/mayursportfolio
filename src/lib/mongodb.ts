import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || process.env.NEXT_PUBLIC_MONGO_URI;

if (!MONGO_URI) {
  throw new Error('Please define the MONGO_URI environment variable inside .env');
}

/**
 * Mongoose connection helper for serverless environments.
 * Reuses global cached connection to avoid creating new connections
 * on every invocation (Vercel / serverless friendly).
 */
let cached: { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } = (global as any)._mongo || { conn: null, promise: null };

if (!cached.promise) {
  const opts = {
    // Recommended options
    bufferCommands: false,
    // other options can go here
  } as mongoose.ConnectOptions;

  cached.promise = mongoose.connect(MONGO_URI, opts).then((m) => m);
  (global as any)._mongo = cached;
}

export default async function connectMongo() {
  if (cached.conn) return cached.conn;
  cached.conn = await cached.promise;
  return cached.conn;
}
