import { Button, Image, Text, YStack } from "tamagui";
import { useLocalSearchParams } from "expo-router";
import { defaultBook } from "api/books/books.utils";
import { Book as BookIcon } from "@tamagui/lucide-icons";

const BookDetail = () => {
  const { bookId } = useLocalSearchParams();
  console.log({ bookId });
  const book = defaultBook;
  const { title, author, cover } = book;
  return (
    <YStack f={1} p="$4" gap="$1" alignItems="center">
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

      <Text fontSize={24} fontWeight={"500"}>
        {title}
      </Text>
      <Text color="$color075">{author}</Text>
    </YStack>
  );
};

export default BookDetail;
