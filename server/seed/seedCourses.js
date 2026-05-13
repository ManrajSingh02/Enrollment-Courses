import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import sampleCourses from "./sampleCourses.js";

dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

try {
  await client.connect();
  const db = client.db(process.env.DB_NAME);
  const courses = db.collection("courses");

  const operations = sampleCourses.map((course) => ({
    updateOne: {
      filter: { title: course.title },
      update: {
        $setOnInsert: {
          ...course,
          createdAt: new Date(),
        },
      },
      upsert: true,
    },
  }));

  const result = await courses.bulkWrite(operations);

  console.log(
    `Courses ready. Inserted: ${result.upsertedCount}, already existed: ${
      sampleCourses.length - result.upsertedCount
    }`
  );
} catch (error) {
  console.error("Failed to seed courses:", error);
  process.exitCode = 1;
} finally {
  await client.close();
}
