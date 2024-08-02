import { useGetBook } from "api/books/books.hooks";
import BookDetails from "components/BookDetails/BookDetails";
import { useLocalSearchParams } from "expo-router";
import { ScrollView, Text } from "tamagui";

const BookDetail = () => {
  const { bookId } = useLocalSearchParams<{ bookId: string }>();
  const { data: book, isLoading, isError } = useGetBook(bookId!);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>An error occurred</Text>;
  }

  if (!book) {
    return <Text>Book not found</Text>;
  }

  return (
    <ScrollView>
      <BookDetails book={book} />
    </ScrollView>
  );
};

export default BookDetail;
