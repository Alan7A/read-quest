import { db } from "db/db";
import { transformBooks } from "./books.utils";
import { GoogleBook } from "types/GoogleBook";
import { books } from "db/db-schemas";
import { Book } from "types/Book";
import { eq } from "drizzle-orm";

export const searchBooks = async (query: string, startIndex = 0) => {
  try {
    const q = query.replaceAll(" ", "+");
    const path = `https://www.googleapis.com/books/v1/volumes?q=${q}&startIndex=${startIndex}&printType=books`;
    const response = await fetch(path);
    const data = await response.json();
    const googleBooks = data.items as GoogleBook[];

    return transformBooks(googleBooks);
  } catch (error) {
    console.log({ error });
    return [];
  }
};

export const createBook = async (book: Book) => {
  try {
    await db.insert(books).values({ ...book, status: "reading", progress: 0 });
  } catch (error) {
    console.log({ error });
    return null;
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
