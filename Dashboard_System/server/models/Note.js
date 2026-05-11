import { getDB } from "../config/db.js";

export const notesCollection = () => getDB().collection("notes");
