import { Book as BookIcon } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Button, Image, Progress, Text, XStack, YStack } from "tamagui";
import type { Book } from "types/Book";

interface Props {
  book: Book;
  href: string;
  progress?: number;
}

const BookItem = (props: Props) => {
  const { book, progress, href } = props;
  const { title, author, cover } = book;

  const bookJson = JSON.stringify(book);

  return (
    <Link href={{ pathname: href, params: { bookJson } }} asChild>
      <TouchableOpacity>
        <XStack bg="$backgroundHover" p="$2" gap="$4" borderRadius="$4" my="$2">
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
          <YStack f={1}>
            <Text>{title}</Text>
            <Text>by {author}</Text>
            {progress ? (
              <Progress value={progress} mt="auto" mb="$2" size="$1">
                <Progress.Indicator animation="bouncy" />
              </Progress>
            ) : null}
          </YStack>
        </XStack>
      </TouchableOpacity>
    </Link>
  );
};

export default BookItem;
