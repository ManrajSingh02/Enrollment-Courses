import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";

const getUserIds = (userId) => {
  const ids = [userId];

  if (ObjectId.isValid(userId)) {
    ids.push(new ObjectId(userId));
  }

  return ids;
};

const getCourseIds = (courseId) => {
  if (!courseId) {
    return [];
  }

  const ids = [courseId];
  const courseIdString = courseId.toString();

  if (ObjectId.isValid(courseIdString)) {
    ids.push(new ObjectId(courseIdString));
  }

  return ids;
};

const findCourseById = async (db, courseId) => {
  const courseIds = getCourseIds(courseId);

  if (courseIds.length === 0) {
    return null;
  }

  return db.collection("courses").findOne({
    _id: {
      $in: courseIds,
    },
  });
};

const enrollCourse = async (req, res) => {
  try {
    const db = getDB();

    const { courseId } = req.body;

    if (!ObjectId.isValid(courseId)) {
      return res.status(400).json({
        message: "Invalid course",
      });
    }

    const courseObjectId = new ObjectId(courseId);

    const userIds = getUserIds(req.user.id);

    const course = await findCourseById(db, courseObjectId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }

    const existingEnrollment = await db
      .collection("enrollments")
      .findOne({
        $or: [
          {
            userId: {
              $in: userIds,
            },
          },
          {
            studentId: {
              $in: userIds,
            },
          },
        ],
        courseId: {
          $in: [courseId, courseObjectId],
        },
      });

    if (existingEnrollment) {
      await db.collection("enrollments").updateOne(
        {
          _id: existingEnrollment._id,
        },
        {
          $set: {
            userId: req.user.id,
            courseId: courseObjectId,
          },
        }
      );

      return res.json({
        message: "Already enrolled",
      });
    }

    const enrollment = {
      userId: req.user.id,
      courseId: courseObjectId,
      createdAt: new Date(),
    };

    await db.collection("enrollments").insertOne(enrollment);

    res.status(201).json({
      message: "Enrollment successful",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getMyEnrollments = async (req, res) => {
  try {
    const db = getDB();

    const userIds = getUserIds(req.user.id);

    const enrollments = await db
      .collection("enrollments")
      .find({
        $or: [
          {
            userId: {
              $in: userIds,
            },
          },
          {
            studentId: {
              $in: userIds,
            },
          },
        ],
      })
      .toArray();

    const enrollmentsWithCourses = (
      await Promise.all(
        enrollments.map(async (enrollment) => ({
          ...enrollment,
          course: await findCourseById(db, enrollment.courseId),
        }))
      )
    ).filter((enrollment) => enrollment.course);

    res.json(enrollmentsWithCourses);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const removeEnrollment = async (req, res) => {
  try {
    const db = getDB();

    await db.collection("enrollments").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    res.json({
      message: "Enrollment removed",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export {
  enrollCourse,
  getMyEnrollments,
  removeEnrollment,
};
