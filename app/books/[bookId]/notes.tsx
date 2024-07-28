import Notes from "components/Notes/Notes";
import { useLocalSearchParams } from "expo-router";

const NotesScreen = () => {
  const { bookId } = useLocalSearchParams<{ bookId: string }>();

  return <Notes bookId={bookId!} />;
};

export default NotesScreen;
