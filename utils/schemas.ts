import { z } from "zod";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { books } from "db/db-schemas";

// export const bookSchema = z.object({
//   title: z.string().min(1, "Title is required"),
//   author: z.string().nullable(),
//   cover: z.string().nullable(),
//   description: z.string().nullable(),
//   pages: z.coerce.number().min(1, "Pages is required"),
//   publisher: z.string().nullable(),
// });

export const insertBookSchema = createInsertSchema(books, {
  title: z.string().min(1, "Title is required"),
  pages: z.coerce.number().min(1, "Pages is required"),
});

export const selectBookSchema = createSelectSchema(books);
