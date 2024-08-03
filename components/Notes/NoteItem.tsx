import dayjs from "dayjs";
import { useState } from "react";
import { Pressable } from "react-native";
import { Text, XStack, YStack } from "tamagui";
import type { Note } from "types/Note";
import NoteItemOptions from "./NoteItemOptions";

interface Props {
  note: Note;
}

const NoteItem = (props: Props) => {
  const { note } = props;
  const { date, text, page } = note;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <YStack my="$2" padding="$2" bg="$backgroundHover" br="$4" gap="$2">
      <XStack jc="space-between" ai="center">
        <Text fontSize={12} color="$color10">
          {dayjs(date).format("LL")}
        </Text>
        <Pressable onPress={() => setIsModalOpen(true)}>
          <Text fontSize={10} color="$color10">
            ⦁ ⦁ ⦁
          </Text>
        </Pressable>
      </XStack>
      <Text>{text}</Text>
      {page ? <Text textAlign="right">Page {page}</Text> : null}
      <NoteItemOptions
        note={note}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
      />
    </YStack>
  );
};

export default NoteItem;
