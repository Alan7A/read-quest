import { FlatList } from "react-native";
import { Text, View } from "tamagui";
import { useGetNotes } from "api/notes/notes.hooks";
import NoteItem from "./NoteItem";

interface Props {
  bookId: string;
}

const Notes = (props: Props) => {
  const { bookId } = props;
  const { data: notes } = useGetNotes(bookId);

  const emptyNode = <Text>You have not added any notes yet</Text>;

  return (
    <View padding="$4" pb={0}>
      <FlatList
        data={notes}
        renderItem={({ item }) => <NoteItem note={item} />}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={emptyNode}
      />
    </View>
  );
};

export default Notes;
