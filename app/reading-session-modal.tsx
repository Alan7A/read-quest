import { useRoute } from "@react-navigation/native";
import {
  Book as BookIcon,
  Check,
  Pause,
  Play,
  SquarePen
} from "@tamagui/lucide-icons";
import NoteFormModal from "components/modals/NoteFormModal";
import SessionFormModal from "components/modals/SessionFormModal";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useStopwatchStore } from "stores/stopwatch.store";
import { Button, Image, Text, XStack, YStack } from "tamagui";
import type { Book } from "types/Book";

export default function ReadingSessionModal() {
  const route = useRoute();
  const { bookJson } = route.params as { bookJson: string };
  const book = JSON.parse(bookJson) as Book;
  const { cover, title, author, progress } = book;
  const { playPause, isActive, formatTime, timeInSeconds } =
    useStopwatchStore();
  const { hours, minutes, seconds } = formatTime(timeInSeconds);
  const [isNoteFormModalOpen, setisNoteFormModalOpen] = useState(false);
  const [isSessionFormModalOpen, setIsSessionFormModalOpen] = useState(false);

  useEffect(() => {
    if (!isActive && timeInSeconds === 0) {
      playPause();
    }
  }, [isActive, timeInSeconds, playPause]);

  const handleFinishSession = () => {
    if (isActive) {
      playPause();
    }
    setIsSessionFormModalOpen(true);
  };

  return (
    <YStack px="$4" py="$8" jc="space-between" f={1}>
      <Stack.Screen
        options={{
          title: "Reading",
          presentation: "fullScreenModal",
          animation: "slide_from_bottom",
          headerRight(props) {
            return (
              <Button
                onPress={() => setisNoteFormModalOpen(true)}
                icon={<SquarePen size={16} />}
                backgroundColor="transparent"
                p="0"
              >
                Add note
              </Button>
            );
          }
        }}
      />
      <XStack gap="$4">
        {cover ? (
          <Image
            source={{
              uri: cover,
              width: 75,
              height: 112
            }}
            borderRadius="$2"
          />
        ) : (
          <Button icon={BookIcon} w={75} h={112} scaleIcon={1.5} />
        )}
        <YStack gap="$1" w="80%">
          <Text fontSize={16}>{title}</Text>
          <Text fontSize={16} color="$color10">
            by {author}
          </Text>
          <Text fontSize={16} mt="auto">
            From page <Text fontWeight="bold">{progress}</Text>
          </Text>
        </YStack>
      </XStack>

      <YStack alignItems="center">
        <Text>Time elapsed</Text>
        <Text fontSize={64}>
          {hours}:{minutes}:{seconds}
        </Text>

        <Button
          onPress={playPause}
          icon={isActive ? Pause : Play}
          size={98}
          borderRadius={999}
        />
      </YStack>

      <Button
        onPress={handleFinishSession}
        icon={<Check size={24} />}
        backgroundColor="$accentColor"
        size="$6"
        // pressStyle={{ backgroundColor: "$backgroundFocus" }}
      >
        Finish
      </Button>
      <SessionFormModal
        bookId={book.id}
        book={book}
        isOpen={isSessionFormModalOpen}
        onClose={() => setIsSessionFormModalOpen(false)}
      />
      <NoteFormModal
        bookId={book.id}
        isOpen={isNoteFormModalOpen}
        onClose={() => setisNoteFormModalOpen(false)}
      />
    </YStack>
  );
}
