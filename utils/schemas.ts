import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().nullable(),
  cover: z.string().nullable(),
  description: z.string().nullable(),
  pages: z.coerce.number().min(1, "Pages is required"),
  publisher: z.string().nullable(),
});
