import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

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
    enum: ["pending", "reading", "finished"],
  }).notNull(),
  progress: integer("progress"),
});

// Tabla SESSIONS
export const sessions = sqliteTable("sessions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  bookId: text("book_id")
    .references(() => books.id)
    .notNull(),
  date: text("date").notNull(),
  duration: integer("duration").notNull(),
  pages: integer("pages").notNull(),
});

// Tabla NOTES
export const notes = sqliteTable("notes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  bookId: text("book_id").references(() => books.id),
  date: text("date").notNull(),
  page: integer("page"),
  text: text("text").notNull(),
});
