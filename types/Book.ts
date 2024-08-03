import type { selectBookSchema } from "utils/schemas";
import type { z } from "zod";

export type Book = z.infer<typeof selectBookSchema>;
