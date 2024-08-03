import type { insertSessionSchema, selectSessionSchema } from "utils/schemas";
import type { z } from "zod";

export type Session = z.infer<typeof selectSessionSchema>;

export type CreateSessionConfig = z.infer<typeof insertSessionSchema>;

export interface DeleteSessionConfig {
  bookId: string;
  sessionId: number;
}
