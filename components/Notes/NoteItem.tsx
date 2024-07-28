import dayjs from "dayjs";
import { Pressable } from "react-native";
import { Text, XStack, YStack } from "tamagui";
import { Note } from "types/Note";

interface Props {
  note: Note;
}

const NoteItem = (props: Props) => {
  const { note } = props;
  const { date, text, page } = note;
  return (
    <YStack my="$2" padding="$2" bg="$backgroundHover" br="$4" gap="$2">
      <XStack jc="space-between" ai="center">
        <Text fontSize={12} color="$color10">
          {dayjs(date).format("LL")}
        </Text>
        <Pressable>
          <Text fontSize={10} color="$color10">
            ⦁ ⦁ ⦁
          </Text>
        </Pressable>
      </XStack>
      <Text>{text}</Text>
      {page ? <Text textAlign="right">Page {page}</Text> : null}
    </YStack>
  );
};

export default NoteItem;
