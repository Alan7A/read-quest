import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Tabla BOOKS
export const books = sqliteTable("books", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author"),
  cover: text("cover"),
  description: text("description"),
  pages: integer("pages").notNull().default(0),
  publisher: text("publisher"),
  status: text("status", {
    enum: ["pending", "reading", "finished", "wantToRead"]
  }).notNull(),
  statusDate: text("status_date"),
  progress: integer("progress")
});

// Tabla SESSIONS
export const sessions = sqliteTable("sessions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  bookId: text("book_id")
    .references(() => books.id)
    .notNull(),
  startPage: integer("start_page").notNull(),
  endPage: integer("end_page").notNull(),
  duration: integer("duration").notNull(),
  date: text("date").notNull()
});

// Tabla NOTES
export const notes = sqliteTable("notes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  bookId: text("book_id")
    .references(() => books.id)
    .notNull(),
  page: integer("page"),
  text: text("text").notNull(),
  date: text("date").notNull()
});
