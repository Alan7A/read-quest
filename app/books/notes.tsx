import { useRoute } from "@react-navigation/native";
import Notes from "components/Notes/Notes";

const NotesScreen = () => {
  const route = useRoute();
  const { bookId } = route.params as { bookId: string };
  return <Notes bookId={bookId} />;
};

export default NotesScreen;
