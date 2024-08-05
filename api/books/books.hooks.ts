import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient
} from "react-query";
import type { Book } from "types/Book";
import {
  createBook,
  deleteBook,
  editBook,
  getBook,
  getBooks,
  searchBooks
} from "./books";

const BOOKS_PER_PAGE = 10;

export const useSearchBooks = (query: string) => {
  return useInfiniteQuery(
    ["books", query],
    ({ pageParam = 0 }) => searchBooks(query, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length * BOOKS_PER_PAGE;
        return lastPage.length === BOOKS_PER_PAGE ? nextPage : undefined;
      },
      enabled: query.length > 0
    }
  );
};

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (book: Book) => createBook(book),
    onSuccess: () => {
      queryClient.invalidateQueries(["books", "status", "reading"]);
    }
  });
};

export const useGetBook = (id: string) => {
  return useQuery({
    queryKey: ["books", id],
    queryFn: () => getBook(id)
  });
};

export const useGetBooks = (status: Book["status"]) => {
  return useQuery({
    queryKey: ["books", "status", status],
    queryFn: () => getBooks(status)
  });
};

export const useEditBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (book: Book) => editBook(book),
    onSuccess: () => {
      queryClient.invalidateQueries(["books", "status"]);
    }
  });
};

export const useDeleteBook = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (bookId: string) => deleteBook(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries(["books", "status"]);
    }
  });
};
