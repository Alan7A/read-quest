import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { books, notes, sessions } from "db/db-schemas";

// BOOKS
export const insertBookSchema = createInsertSchema(books, {
  title: z.string().min(1, "Title is required"),
  pages: z.coerce.number().min(1, "Pages is required"),
});
export const selectBookSchema = createSelectSchema(books);

// SESSIONS
export const insertSessionSchema = createInsertSchema(sessions);
export const selectSessionSchema = createSelectSchema(sessions, {
  date: z.string().default(new Date().toISOString()),
});

// NOTES
export const insertNoteSchema = createInsertSchema(notes, {
  text: z.string().min(1, "Write your note"),
  page: z.coerce.number({ message: "Page must be a number" }),
  date: z.string().default(new Date().toISOString()),
});
export const selectNoteSchema = createSelectSchema(notes);
