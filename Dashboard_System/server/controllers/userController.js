import { ObjectId } from "mongodb";
import { usersCollection } from "../models/User.js";
import { users as sampleUsers } from "../data/users.js";

const validRoles = ["admin", "editor", "viewer"];

const formatUser = (user) => ({
  id: user._id ? user._id.toString() : user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

const getObjectId = (id) => (ObjectId.isValid(id) ? new ObjectId(id) : null);


export const getUsers = async (req, res) => {
  try {
    const users = await usersCollection()
      .find({}, { projection: { password: 0 } })
      .toArray();

    res.json(users.map(formatUser));
  } catch {
    res.json(sampleUsers.map(formatUser));
  }
};


export const deleteUser = async (req, res) => {
  const userId = getObjectId(req.params.id);

  if (!userId) {
    const index = sampleUsers.findIndex(
      (user) => String(user.id) === String(req.params.id)
    );

    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    sampleUsers.splice(index, 1);

    return res.json({ message: "User removed" });
  }

  try {
    const result = await usersCollection().deleteOne({
      _id: userId,
    });

    if (!result.deletedCount) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User removed" });
  } catch {
    res.status(503).json({ message: "Database connection failed" });
  }
};

export const updateRole = async (req, res) => {
  const { role } = req.body;
  const userId = getObjectId(req.params.id);

  if (!userId) {
    const user = sampleUsers.find(
      (sampleUser) => String(sampleUser.id) === String(req.params.id)
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    user.role = role;

    return res.json(formatUser(user));
  }

  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  try {
    const result = await usersCollection().findOneAndUpdate(
      { _id: userId },
      { $set: { role, updatedAt: new Date() } },
      { returnDocument: "after", projection: { password: 0 } }
    );

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(formatUser(result));
  } catch {
    res.status(503).json({ message: "Database connection failed" });
  }
};
