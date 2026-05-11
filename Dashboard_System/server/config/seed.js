import bcrypt from "bcrypt";
import { users as sampleUsers } from "../data/users.js";
import { notes as sampleNotes } from "../data/notes.js";
import { usersCollection } from "../models/User.js";
import { notesCollection } from "../models/Note.js";

export const seedDatabase = async () => {
  const users = usersCollection();
  const notes = notesCollection();

  await users.createIndex({ email: 1 }, { unique: true });

  const userCount = await users.countDocuments();
  if (userCount === 0) {
    const now = new Date();
    const seededUsers = await Promise.all(
      sampleUsers.map(async (user) => ({
        email: user.email,
        password: await bcrypt.hash(user.password, 10),
        role: user.role,
        createdAt: now,
        updatedAt: now,
      }))
    );

    await users.insertMany(seededUsers);
  }

  const noteCount = await notes.countDocuments();
  if (noteCount === 0) {
    const now = new Date();
    await notes.insertMany(
      sampleNotes.map((note) => ({
        title: note.title,
        content: note.content,
        createdAt: now,
        updatedAt: now,
      }))
    );
  }
};
