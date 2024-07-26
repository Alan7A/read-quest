import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { books, sessions } from "db/db-schemas";

export const insertBookSchema = createInsertSchema(books, {
  title: z.string().min(1, "Title is required"),
  pages: z.coerce.number().min(1, "Pages is required"),
});

export const selectBookSchema = createSelectSchema(books);

export const insertSessionSchema = createInsertSchema(sessions);

export const selectSessionSchema = createSelectSchema(sessions);
