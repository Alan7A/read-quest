import { db } from "db/db";
import { books, sessions } from "db/db-schemas";
import { eq, sql } from "drizzle-orm";
import { CreateSessionConfig } from "types/Session";

export const createSession = async (session: CreateSessionConfig) => {
  try {
    const { bookId, pages } = session;
    // Create session
    await db.insert(sessions).values(session);
    // Increase book progress
    await db
      .update(books)
      .set({ progress: sql`${books.progress} + ${pages}` })
      .where(eq(books.id, bookId));
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

export const getSessions = async (bookId: string) => {
  try {
    const _sessions = await db
      .select()
      .from(sessions)
      .where(eq(sessions.bookId, bookId));
    return _sessions;
  } catch (error) {
    console.log({ error });
    throw error;
  }
};
