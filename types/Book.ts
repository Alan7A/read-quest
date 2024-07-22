import { selectBookSchema } from "utils/schemas";
import { z } from "zod";

export type Book = z.infer<typeof selectBookSchema>;
