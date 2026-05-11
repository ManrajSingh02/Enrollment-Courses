import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

export const enrollCourse = async (req, res) => {
  try {
    const db = getDB();

    const existing = await db
      .collection("enrollments")
      .findOne({
        studentId: req.user.id,
        courseId: req.body.courseId,
      });

    if (existing) {
      return res.status(400).json({
        message: "Already enrolled",
      });
    }

    const enrollment = {
      studentId: req.user.id,
      courseId: req.body.courseId,
      status: "active",
      enrolledAt: new Date(),
    };

    const result = await db
      .collection("enrollments")
      .insertOne(enrollment);

    res.json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const myEnrollments = async (req, res) => {
  try {
    const db = getDB();

    const enrollments = await db
      .collection("enrollments")
      .aggregate([
        {
          $match: {
            studentId: req.user.id,
          },
        },
        {
          $addFields: {
            courseObjectId: {
              $convert: {
                input: "$courseId",
                to: "objectId",
                onError: null,
                onNull: null,
              },
            },
          },
        },
        {
          $lookup: {
            from: "courses",
            localField: "courseObjectId",
            foreignField: "_id",
            as: "course",
          },
        },
        {
          $unwind: {
            path: "$course",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            courseObjectId: 0,
          },
        },
      ])
      .toArray();

    res.json(enrollments);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const removeEnrollment = async (req, res) => {
  try {
    const db = getDB();

    await db
      .collection("enrollments")
      .deleteOne({
        _id: new ObjectId(req.params.id),
      });

    res.json({
      message: "Enrollment removed",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
