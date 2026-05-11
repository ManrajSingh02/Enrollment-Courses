import { MongoClient } from "mongodb";

let client;
let db;

const DEFAULT_URI = "mongodb://127.0.0.1:27017";
const DEFAULT_DB_NAME = "dashboard_system";

const getMongoUri = () => {
  if (
    process.env.MONGO_URI &&
    process.env.MONGO_URI !== "your_mongodb_connection"
  ) {
    if (process.env.MONGO_URI.includes("<db_password>")) {
      throw new Error(
        "Replace <db_password> in server/.env MONGO_URI with your real MongoDB Atlas password"
      );
    }

    return process.env.MONGO_URI;
  }

  return DEFAULT_URI;
};

export const connectDB = async () => {
  if (db) {
    return db;
  }

  client = new MongoClient(getMongoUri(), {
    serverSelectionTimeoutMS: 5000,
  });
  await client.connect();

  db = client.db(process.env.DB_NAME || DEFAULT_DB_NAME);
  console.log(`MongoDB connected: ${db.databaseName}`);

  return db;
};

export const getDB = () => {
  if (!db) {
    throw new Error("Database not connected");
  }

  return db;
};
