import { bookSchema } from "utils/schemas";
import { z } from "zod";

export type Book = z.infer<typeof bookSchema> & {
  id: string;
  status: "pending" | "reading" | "finished";
  progress: number | null;
};
