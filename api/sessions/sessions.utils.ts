import type { Book } from "types/Book";
import type { GoogleBook } from "types/GoogleBook";

export const transformBooks = (books: GoogleBook[]): Book[] => {
  return books.map((book) => {
    return {
      id: book.id,
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors.join(", "),
      cover: book.volumeInfo.imageLinks?.smallThumbnail ?? null,
      description: book.volumeInfo.description,
      pages: book.volumeInfo.pageCount,
      publisher: book.volumeInfo.publisher,
      progress: 0,
      status: "pending"
    };
  });
};

export const defaultBook: Book = {
  id: "default",
  title: "Default Book",
  author: "Default Author",
  cover: null,
  description: "Default Description",
  pages: 100,
  publisher: "Default Publisher",
  progress: 0,
  status: "pending"
};
