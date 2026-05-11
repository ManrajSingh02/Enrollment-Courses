import { ObjectId } from "mongodb";
import { notesCollection } from "../models/Note.js";
import { notes as sampleNotes } from "../data/notes.js";

const formatNote = (note) => ({
  id: note._id ? note._id.toString() : note.id,
  title: note.title,
  content: note.content,
  createdBy: note.createdBy,
  createdAt: note.createdAt,
  updatedAt: note.updatedAt,
});

const getObjectId = (id) => (ObjectId.isValid(id) ? new ObjectId(id) : null);

const getSampleNote = (id) =>
  sampleNotes.find((note) => String(note.id) === String(id));

export const getNotes = async (req, res) => {
  try {
    const notes = await notesCollection().find().sort({ createdAt: -1 }).toArray();

    res.json(notes.map(formatNote));
  } catch {
    res.json(sampleNotes.map(formatNote));
  }
};

export const getNote = async (req, res) => {
  try {
    const noteId = getObjectId(req.params.id);

    if (!noteId) {
      const note = getSampleNote(req.params.id);

      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }

      return res.json(formatNote(note));
    }

    const note = await notesCollection().findOne({
      _id: noteId,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(formatNote(note));
  } catch {
    const note = getSampleNote(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(formatNote(note));
  }
};


export const createNote = async (req, res) => {
  try {
    const now = new Date();
    const note = {
      title: req.body.title,
      content: req.body.content,
      createdBy: req.user.id,
      createdAt: now,
      updatedAt: now,
    };

    const result = await notesCollection().insertOne(note);

    res.status(201).json(formatNote({ ...note, _id: result.insertedId }));
  } catch {
    const now = new Date();
    const note = {
      id: Date.now(),
      title: req.body.title,
      content: req.body.content,
      createdBy: req.user.id,
      createdAt: now,
      updatedAt: now,
    };

    sampleNotes.push(note);

    res.status(201).json(formatNote(note));
  }
};

export const updateNote = async (req, res) => {
  try {
    const noteId = getObjectId(req.params.id);

    if (!noteId) {
      const note = getSampleNote(req.params.id);

      if (!note) {
        return res.status(404).json({ message: "Note not found" });
      }

      Object.assign(note, {
        title: req.body.title,
        content: req.body.content,
        updatedAt: new Date(),
      });

      return res.json(formatNote(note));
    }

    const result = await notesCollection().findOneAndUpdate(
      { _id: noteId },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    if (!result) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(formatNote(result));
  } catch {
    const note = getSampleNote(req.params.id);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    Object.assign(note, {
      title: req.body.title,
      content: req.body.content,
      updatedAt: new Date(),
    });

    res.json(formatNote(note));
  }
};

export const deleteNote = async (req, res) => {
  try {
    const noteId = getObjectId(req.params.id);

    if (!noteId) {
      const index = sampleNotes.findIndex(
        (note) => String(note.id) === String(req.params.id)
      );

      if (index === -1) {
        return res.status(404).json({ message: "Note not found" });
      }

      sampleNotes.splice(index, 1);

      return res.json({ message: "Note deleted" });
    }

    const result = await notesCollection().deleteOne({
      _id: noteId,
    });

    if (!result.deletedCount) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted" });
  } catch {
    const index = sampleNotes.findIndex(
      (note) => String(note.id) === String(req.params.id)
    );

    if (index === -1) {
      return res.status(404).json({ message: "Note not found" });
    }

    sampleNotes.splice(index, 1);

    res.json({ message: "Note deleted" });
  }
};
