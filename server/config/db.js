import dotenv from "dotenv";
import dns from "node:dns";
import { MongoClient } from "mongodb";

dotenv.config();
dns.setServers(["8.8.8.8", "1.1.1.1"]);

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI is missing in server/.env");
}

const client = new MongoClient(
  process.env.MONGO_URI,
  {
    serverSelectionTimeoutMS: 10000,
  }
);

let db;

export const connectDB =
  async () => {

    await client.connect();

    db = client.db(
      process.env.DB_NAME
    );

    console.log(
      "MongoDB Connected"
    );
  };

export const getDB = () => db;
