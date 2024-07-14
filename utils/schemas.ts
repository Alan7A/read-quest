import { z } from "zod";

export const bookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().optional(),
  cover: z.string().optional(),
  description: z.string().optional(),
  pages: z.coerce.number().min(1, "Pages is required"),
  publisher: z.string().optional(),
});
