import { db } from "db/db";
import { books, sessions } from "db/db-schemas";
import { desc, eq } from "drizzle-orm";
import { CreateSessionConfig, Session } from "types/Session";

export const createSession = async (session: CreateSessionConfig) => {
  const { bookId, endPage } = session;
  try {
    // Create session
    await db.insert(sessions).values(session);

    // Increase book progress
    const bookProgress = await db
      .select({ progress: books.progress })
      .from(books)
      .where(eq(books.id, bookId));
    const currentProgress = bookProgress[0].progress ?? 0;
    const newProgress = endPage > currentProgress ? endPage : currentProgress;
    await db
      .update(books)
      .set({ progress: newProgress })
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
      .where(eq(sessions.bookId, bookId))
      .orderBy(desc(sessions.date));
    return _sessions;
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

export const editSession = async (session: Session) => {
  try {
    await db.update(sessions).set(session).where(eq(sessions.id, session.id));
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

export const deleteSession = async (sessionId: number) => {
  try {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
  } catch (error) {
    console.log({ error });
    throw error;
  }
};
