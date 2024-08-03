import { db } from "db/db";
import { notes } from "db/db-schemas";
import { desc, eq } from "drizzle-orm";
import type { CreateNoteConfig, Note } from "types/Note";

export const createNote = async (note: CreateNoteConfig) => {
  try {
    await db.insert(notes).values(note);
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

export const getNotes = async (bookId: string) => {
  try {
    const _notes = await db
      .select()
      .from(notes)
      .where(eq(notes.bookId, bookId))
      .orderBy(desc(notes.date));
    return _notes;
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

export const editNote = async (note: Note) => {
  try {
    await db.update(notes).set(note).where(eq(notes.id, note.id));
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

export const deleteNote = async (noteId: number) => {
  try {
    await db.delete(notes).where(eq(notes.id, noteId));
  } catch (error) {
    console.log({ error });
    throw error;
  }
};
