import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";
import sampleCourses from "../seed/sampleCourses.js";

export const getCourses = async (req, res) => {
  try {
    const db = getDB();

    const { search, category, difficulty, minPrice, maxPrice } = req.query;

    let query = {};

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      query.category = category;
    }

    if (difficulty) {
      query.difficulty = difficulty;
    }

    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    const coursesCollection = db.collection("courses");
    const courseCount = await coursesCollection.countDocuments();

    if (courseCount === 0) {
      await coursesCollection.insertMany(
        sampleCourses.map((course) => ({
          ...course,
          createdAt: new Date(),
        })),
      );
    }

    const courses = await coursesCollection.find(query).toArray();

    res.json(courses);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getCourse = async (req, res) => {
  try {
    const db = getDB();

    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid course id",
      });
    }

    const course = await db.collection("courses").findOne({
      _id: new ObjectId(req.params.id),
    });

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const createCourse = async (req, res) => {
  try {
    const db = getDB();

    const result = await db.collection("courses").insertOne({
      ...req.body,
      createdAt: new Date(),
    });

    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateCourse = async (req, res) => {
  try {
    const db = getDB();

    await db.collection("courses").updateOne(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        $set: req.body,
      },
    );

    res.json({
      message: "Course Updated",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const db = getDB();

    await db.collection("courses").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    res.json({
      message: "Course Deleted",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
