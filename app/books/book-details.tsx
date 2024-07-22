import { useRoute } from "@react-navigation/native";
import BookDetails from "components/BookDetails/BookDetails";
import { ScrollView } from "tamagui";
import { Book } from "types/Book";

const BookDetail = () => {
  const route = useRoute();
  const { bookJson } = route.params as { bookJson: string };
  const book = JSON.parse(bookJson) as Book;

  return (
    <ScrollView>
      <BookDetails book={book} />
    </ScrollView>
  );
};

export default BookDetail;
