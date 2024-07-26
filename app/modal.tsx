import { Button, Image, Text, XStack, YStack } from "tamagui";
import { Book as BookIcon, Play, Check, Pause } from "@tamagui/lucide-icons";
import { useStopwatchStore } from "stores/stopwatch.store";
import { useEffect } from "react";
import { Book } from "types/Book";
import { useRoute } from "@react-navigation/native";
import useModalsStore from "stores/modals.store";
import FinishSessionModal from "components/modals/FinishSessionModal";

export default function ModalScreen() {
  const route = useRoute();
  const { bookJson } = route.params as { bookJson: string };
  const book = JSON.parse(bookJson) as Book;
  const { cover, title, author } = book;
  const { playPause, isActive, formatTime, timeInSeconds } =
    useStopwatchStore();
  const { hours, minutes, seconds } = formatTime(timeInSeconds);
  const setIsModalOpen = useModalsStore(
    (state) => state.setIsFinishSessionModalOpen
  );

  useEffect(() => {
    if (!isActive && timeInSeconds === 0) {
      playPause();
    }
  }, []);

  const handleFinishSession = () => {
    if (isActive) {
      playPause();
    }
    setIsModalOpen(true);
  };

  return (
    <YStack px="$4" py="$8" jc="space-between" f={1}>
      <XStack gap="$4">
        {cover ? (
          <Image
            source={{
              uri: cover,
              width: 75,
              height: 112,
            }}
            borderRadius="$2"
          />
        ) : (
          <Button icon={BookIcon} w={75} h={112} scaleIcon={1.5} />
        )}
        <YStack gap="$1" w="100%">
          <Text fontSize={16}>{title}</Text>
          <Text fontSize={16} color="$color10">
            by {author}
          </Text>
          <Text fontSize={16} mt="auto">
            From page <Text fontWeight="bold">253</Text>
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
      <FinishSessionModal book={book} />
    </YStack>
  );
}
