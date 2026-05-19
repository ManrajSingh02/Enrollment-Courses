import { ObjectId } from "mongodb";

import { getDB } from "../config/db.js";

import sampleCourses from "../seed/sampleCourses.js";




// ==========================
// GET ALL COURSES
// ==========================
export const getCourses =
  async (req, res) => {

    try {

      const db = getDB();

      const search =
        req.query.search || "";

      const query = {};

      if (search) {

        query.title = {
          $regex: search,
          $options: "i",
        };
      }

      let courses =
        await db
          .collection("courses")
          .find(query)
          .toArray();




      // AUTO INSERT SAMPLE COURSES
      if (courses.length === 0) {

        await db
          .collection("courses")
          .insertMany(
            sampleCourses
          );

        courses =
          await db
            .collection("courses")
            .find({})
            .toArray();
      }

      res.json(courses);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch courses",
      });
    }
  };




// ==========================
// GET SINGLE COURSE
// ==========================
export const getCourseById =
  async (req, res) => {

    try {

      const db = getDB();

      const course =
        await db
          .collection("courses")
          .findOne({
            _id: new ObjectId(
              req.params.id
            ),
          });

      if (!course) {

        return res.status(404).json({
          message:
            "Course not found",
        });
      }

      res.json(course);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch course",
      });
    }
  };




// ==========================
// CREATE COURSE
// ==========================
export const createCourse =
  async (req, res) => {

    try {

      const db = getDB();

      const course = {
        ...req.body,
        createdAt: new Date(),
      };

      const result =
        await db
          .collection("courses")
          .insertOne(course);

      res.json(result);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to create course",
      });
    }
  };