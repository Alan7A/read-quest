import { Book } from "types/Book";
import { GoogleBook } from "types/GoogleBook";

export const transformBooks = (books: GoogleBook[]): Book[] => {
  return books.map((book) => {
    return {
      id: book.id,
      title: book.volumeInfo.title,
      author: book.volumeInfo.authors.join(", "),
      cover: book.volumeInfo.imageLinks?.smallThumbnail,
      description: book.volumeInfo.description,
      pages: book.volumeInfo.pageCount,
      publisher: book.volumeInfo.publisher,
    };
  });
};

export const defaultBook = {
  id: "default",
  title: "Default Book",
  author: "Default Author",
  description: "Default Description",
  pages: 100,
  publisher: "Default Publisher",
};
