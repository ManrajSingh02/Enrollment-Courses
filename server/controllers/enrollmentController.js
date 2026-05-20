import { ObjectId } from "mongodb";

import { getDB } from "../config/db.js";



export const enrollCourse = async (
  req,
  res
) => {
  try {

    const db = getDB();

    const courseId =
      new ObjectId(req.body.courseId);

    const existing =
      await db
        .collection("enrollments")
        .findOne({
          studentId: req.user.id,
          courseId,
        });

    if (existing) {

      return res.status(400).json({
        message:
          "You already enrolled in this course",
      });
    }

    await db
      .collection("enrollments")
      .insertOne({
        studentId: req.user.id,
        courseId,
        status: "active",
        enrolledAt: new Date(),
      });

    res.json({
      message:
        "Course enrolled successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Enrollment failed",
    });
  }
};




export const myEnrollments =
  async (req, res) => {

    try {

      const db = getDB();

      const enrollments =
        await db
          .collection("enrollments")
          .aggregate([
            {
              $match: {
                studentId:
                  req.user.id,
              },
            },

            {
              $lookup: {
                from: "courses",
                localField:
                  "courseId",
                foreignField:
                  "_id",
                as: "course",
              },
            },

            {
              $unwind: "$course",
            },
          ])
          .toArray();

      res.json(enrollments);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch enrollments",
      });
    }
  };




export const removeEnrollment =
  async (req, res) => {

    try {

      const db = getDB();

      await db
        .collection("enrollments")
        .deleteOne({
          _id: new ObjectId(
            req.params.id
          ),
        });

      res.json({
        message:
          "Enrollment removed",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to remove enrollment",
      });
    }
  };