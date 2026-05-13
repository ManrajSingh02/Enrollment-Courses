import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

let db;

export const connectDB = async () => {
  try {
    await client.connect();

    db = client.db(process.env.DB_NAME);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};

export const getDB = () => db;