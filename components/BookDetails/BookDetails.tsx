import { Button, Image, Text, XStack, YStack } from "tamagui";
import { Book as BookIcon, Play } from "@tamagui/lucide-icons";
import { Book } from "types/Book";
import BookDetailsSection from "./BookDetailsSection";
import BookDetailsAbout from "./BookDetailsAbout";

interface Props {
  book: Book;
}

const BookDetails = (props: Props) => {
  const { book } = props;
  const { title, author, cover, pages, progress } = book;
  return (
    <YStack f={1} p="$4" gap="$4">
      <YStack alignItems="center">
        {cover ? (
          <Image
            source={{
              uri: cover,
              width: 112.5,
              height: 168,
            }}
            borderRadius="$2"
          />
        ) : (
          <Button icon={BookIcon} w={75} h={112} scaleIcon={1.5} />
        )}

        <Text fontSize={20} textAlign="center">
          {title}
        </Text>
        <Text color="$color075">{author}</Text>
      </YStack>

      <YStack
        gap="$4"
        backgroundColor="$backgroundHover"
        borderRadius="$4"
        p="$4"
        ai="center"
        w="100%"
      >
        <YStack ai="center" gap="$2">
          <Button icon={Play} size={98} borderRadius={999} />
          <Text>Start session</Text>
        </YStack>
        <XStack jc="space-between" w="80%">
          <YStack ai="center">
            <Text color="$color10" fontSize={12}>
              Current page
            </Text>
            <Text>
              {progress} / {pages}
            </Text>
          </YStack>
          <YStack ai="center">
            <Text color="$color10" fontSize={12}>
              Time elapsed
            </Text>
            <Text>16:05</Text>
          </YStack>
        </XStack>
      </YStack>

      <BookDetailsSection
        name="Sessions"
        seeAllRoute="/books/sessions"
        data={[]}
        addNewRoute="/books/add-session"
        renderItem={() => null}
      />
      <BookDetailsSection
        name="Notes"
        seeAllRoute="/books/notes"
        data={[]}
        addNewRoute="/books/add-note"
        renderItem={() => null}
      />
      <BookDetailsAbout book={book} />
    </YStack>
  );
};

export default BookDetails;
