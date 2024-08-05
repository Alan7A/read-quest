import { db } from "db/db";
import { books } from "db/db-schemas";
import { eq } from "drizzle-orm";
import type { Book } from "types/Book";
import type { GoogleBook } from "types/GoogleBook";
import { transformBooks } from "./books.utils";

export const searchBooks = async (query: string, startIndex = 0) => {
  try {
    const q = query.replaceAll(" ", "+");
    const path = `https://www.googleapis.com/books/v1/volumes?q=${q}&startIndex=${startIndex}&printType=books`;
    const response = await fetch(path);
    const data = await response.json();
    console.log({ data });
    const googleBooks = data.items as GoogleBook[];
    console.log("googleBooks", googleBooks.length);

    return transformBooks(googleBooks);
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

export const createBook = async (book: Book) => {
  try {
    await db.insert(books).values({ ...book, status: "reading", progress: 0 });
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

export const getBook = async (id: string) => {
  try {
    const book = await db.select().from(books).where(eq(books.id, id));
    return book[0];
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

export const getBooks = async (status: Book["status"]) => {
  try {
    const result = await db
      .select()
      .from(books)
      .where(eq(books.status, status));
    return result;
  } catch (error) {
    console.log({ error });
    throw new Error("Error getting books");
  }
};

export const editBook = async (book: Book) => {
  try {
    await db.update(books).set(book).where(eq(books.id, book.id));
  } catch (error) {
    console.log({ error });
    throw error;
  }
};

export const deleteBook = async (bookId: string) => {
  try {
    await db.delete(books).where(eq(books.id, bookId));
  } catch (error) {
    console.log({ error });
    throw error;
  }
};
