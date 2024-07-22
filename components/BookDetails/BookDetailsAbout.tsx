import { Text, XStack, YStack } from "tamagui";
import { Book } from "types/Book";

interface Props {
  book: Book;
}

const BookDetailsAbout = (props: Props) => {
  const { book } = props;
  const { publisher, pages, description } = book;
  return (
    <YStack w="100%" gap="$2">
      <Text pl="$2">About</Text>
      <YStack backgroundColor={"$backgroundHover"} borderRadius="$4" p="$4">
        {publisher ? (
          <XStack
            jc="space-between"
            ai="center"
            borderBottomColor="$background"
            borderBottomWidth={3}
            py="$2"
          >
            <Text color="$color10">Publisher</Text>
            <Text>{publisher}</Text>
          </XStack>
        ) : null}
        {pages ? (
          <XStack
            jc="space-between"
            ai="center"
            borderBottomColor="$background"
            borderBottomWidth={3}
            py="$2"
          >
            <Text color="$color10">Pages</Text>
            <Text>{pages}</Text>
          </XStack>
        ) : null}
        {description ? (
          <YStack pt="$2">
            <Text color="$color10">Description</Text>
            <Text>{description}</Text>
          </YStack>
        ) : null}
        {/* {book.isbn ? (
            <XStack jc="space-between" ai="center">
            <Text color="$color10">ISBN</Text>
            <Text>{book.isbn}</Text>
          </XStack>
          ) : null}
          {book.language ? (
            <XStack jc="space-between" ai="center">
            <Text color="$color10">Language</Text>
            <Text>{book.language}</Text>
          </XStack>
          ) : null} */}
      </YStack>
    </YStack>
  );
};

export default BookDetailsAbout;
