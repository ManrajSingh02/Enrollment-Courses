import { ObjectId } from "mongodb";
import { getDB } from "../config/db.js";



export const getDashboardStats = async (req, res) => {
  try {
    const db = getDB();

    const totalStudents = await db
      .collection("users")
      .countDocuments({
        role: "student",
      });

    const totalCourses = await db
      .collection("courses")
      .countDocuments();

    const totalEnrollments = await db
      .collection("enrollments")
      .countDocuments();

    const recentStudents = await db
      .collection("users")
      .find({
        role: "student",
      })
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    const recentCourses = await db
      .collection("courses")
      .find()
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();

    res.json({
      totalStudents,
      totalCourses,
      totalEnrollments,
      recentStudents,
      recentCourses,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};


export const getStudents = async (req, res) => {
  try {
    const db = getDB();

    const {
      search,
      minAge,
      maxAge,
    } = req.query;

    let query = {
      role: "student",
    };

    if (search) {
      query.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (minAge || maxAge) {
      query.age = {};

      if (minAge) {
        query.age.$gte = Number(minAge);
      }

      if (maxAge) {
        query.age.$lte = Number(maxAge);
      }
    }

    const students = await db
      .collection("users")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    res.json(students);
  } catch (error) {
    res.status(500).json(error);
  }
};


export const updateStudent = async (req, res) => {
  try {
    const db = getDB();

    const { name, age } = req.body;

    await db.collection("users").updateOne(
      {
        _id: new ObjectId(req.params.id),
      },
      {
        $set: {
          name,
          age,
        },
      }
    );

    res.json({
      message: "Student updated",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};


export const deleteStudent = async (req, res) => {
  try {
    const db = getDB();

    await db.collection("users").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    // remove enrollments too
    await db
      .collection("enrollments")
      .deleteMany({
        studentId: req.params.id,
      });

    res.json({
      message: "Student deleted",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};


export const getEnrollments = async (req, res) => {
  try {
    const db = getDB();

    const { student, course } = req.query;

    let matchStage = {};

    if (student) {
      matchStage.studentId = student;
    }

    if (course) {
      matchStage.courseId = course;
    }

    const enrollments = await db
      .collection("enrollments")
      .aggregate([
        {
          $match: matchStage,
        },

        {
          $lookup: {
            from: "users",
            localField: "studentId",
            foreignField: "_id",
            as: "student",
          },
        },

        {
          $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "course",
          },
        },

        {
          $sort: {
            enrolledAt: -1,
          },
        },
      ])
      .toArray();

    res.json(enrollments);
  } catch (error) {
    res.status(500).json(error);
  }
};


export const deleteEnrollment = async (
  req,
  res
) => {
  try {
    const db = getDB();

    await db
      .collection("enrollments")
      .deleteOne({
        _id: new ObjectId(req.params.id),
      });

    res.json({
      message: "Enrollment deleted",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};


export const addSampleCourses = async (
  req,
  res
) => {
  try {
    const db = getDB();

    const sampleCourses = [
      {
        title: "React Mastery",
        description:
          "Learn React from beginner to advanced.",
        category: "Web Development",
        difficulty: "Intermediate",
        price: 99,
        duration: "8 Weeks",
        instructor: "John Doe",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
        createdAt: new Date(),
      },

      {
        title: "Node.js API Bootcamp",
        description:
          "Build scalable APIs using Node.js.",
        category: "Backend",
        difficulty: "Advanced",
        price: 120,
        duration: "10 Weeks",
        instructor: "Sarah Smith",
        image:
          "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
        createdAt: new Date(),
      },

      {
        title: "UI UX Design Basics",
        description:
          "Design beautiful interfaces and user experiences.",
        category: "Design",
        difficulty: "Beginner",
        price: 75,
        duration: "6 Weeks",
        instructor: "Emma Wilson",
        image:
          "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
        createdAt: new Date(),
      },
    ];

    const result = await db
      .collection("courses")
      .insertMany(sampleCourses);

    res.json({
      message: "Sample courses added",
      result,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};