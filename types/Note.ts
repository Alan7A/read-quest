import type { insertNoteSchema, selectNoteSchema } from "utils/schemas";
import type { z } from "zod";

export type Note = z.infer<typeof selectNoteSchema>;

export type CreateNoteConfig = z.infer<typeof insertNoteSchema>;

export interface DeleteNoteConfig {
  bookId: string;
  noteId: number;
}
