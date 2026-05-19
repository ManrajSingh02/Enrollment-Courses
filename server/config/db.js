import { MongoClient } from "mongodb";

const client = new MongoClient(
  process.env.MONGO_URI
);

let db;

export const connectDB =
  async () => {

    await client.connect();

    db = client.db(
      "courseEnrollmentDB"
    );

    console.log(
      "MongoDB Connected"
    );
  };

export const getDB = () => db;