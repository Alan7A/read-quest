import { ListFilter } from "@tamagui/lucide-icons";
import { useGetBooks } from "api/books/books.hooks";
import BookItem from "components/BookItem";
import { Link } from "expo-router";
import { FlatList } from "react-native";
import { Button, Text, View, XStack, YStack } from "tamagui";

export default function TabOneScreen() {
  const { data: books } = useGetBooks("reading");

  const emptyNode = (
    <YStack
      ai="center"
      jc="center"
      bg="$backgroundHover"
      px="$6"
      py="$6"
      borderRadius="$4"
      mx="auto"
      gap="$4"
      mt="$10"
    >
      <Text>You are not reading any book yet</Text>
      <Link href="/books/search-book">
        <Text fontWeight="700">Add a book</Text>
      </Link>
    </YStack>
  );

  return (
    <YStack f={1} gap="$4" px="$4" pt="$5">
      <XStack ai="center" jc="space-between">
        <XStack gap="$2" ai="center">
          <Text>Reading</Text>
          <View bg="$accentBackground" py="$1" px="$2" borderRadius={4}>
            <Text>{books?.length ?? 0}</Text>
          </View>
        </XStack>
        <Button icon={<ListFilter />} chromeless />
      </XStack>
      {books?.length ? (
        <FlatList
          data={books}
          renderItem={({ item }) => (
            <BookItem book={item} href={"/books/book-details"} />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={emptyNode}
        />
      ) : (
        emptyNode
      )}
    </YStack>
  );
}
