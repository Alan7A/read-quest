import { insertSessionSchema, selectSessionSchema } from "utils/schemas";
import { z } from "zod";

export type Session = z.infer<typeof selectSessionSchema>;

export type CreateSessionConfig = z.infer<typeof insertSessionSchema>;

export interface DeleteSessionConfig {
  bookId: string;
  sessionId: number;
}
