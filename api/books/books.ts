import { useInfiniteQuery } from "react-query";
import { transformBooks } from "./books.utils";
import { GoogleBook } from "types/GoogleBook";

const BOOKS_PER_PAGE = 10;

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

export const useGetBooks = (query: string) => {
  return useInfiniteQuery(
    ["books", query],
    ({ pageParam = 0 }) => searchBooks(query, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length * BOOKS_PER_PAGE;
        return lastPage.length === BOOKS_PER_PAGE ? nextPage : undefined;
      },
      enabled: query.length > 0,
    }
  );
};
