import { Image, Progress, XStack, YStack, Text } from "tamagui";

const BookInProgress = () => {
  return (
    <XStack bg="$gray10" p="$2" gap="$4" borderRadius="$4">
      <Image
        source={{
          uri: "https://images.booksense.com/images/332/761/9781524761332.jpg",
          width: 73,
          height: 112,
        }}
        borderRadius="$2"
      />
      <YStack f={1}>
        <Text>The Art of War</Text>
        <Text>by Sun Tzu</Text>
        <Progress value={45} mt="auto" mb="$2" size="$1">
          <Progress.Indicator animation="bouncy" />
        </Progress>
      </YStack>
    </XStack>
  );
};

export default BookInProgress;
