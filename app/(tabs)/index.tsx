import { ListFilter } from "@tamagui/lucide-icons";
import { defaultBook } from "api/books/books.utils";
import BookItem from "components/BookItem";
import { Button, Text, View, XStack, YStack } from "tamagui";

export default function TabOneScreen() {
  return (
    <YStack f={1} gap="$4" px="$4" pt="$5">
      <XStack ai="center" jc="space-between">
        <XStack gap="$2" ai="center">
          <Text>Reading</Text>
          <View bg="$accentBackground" py="$1" px="$2" borderRadius={4}>
            <Text>5</Text>
          </View>
        </XStack>
        <Button icon={<ListFilter />} chromeless />
      </XStack>
      <BookItem progress={45} book={defaultBook} href="/books/123" />
    </YStack>
  );
}
