import { ListFilter } from "@tamagui/lucide-icons";
import { useGetBooks } from "api/books/books.hooks";
import BookItem from "components/BookItem";
import { FlatList } from "react-native";
import { Button, Text, View, XStack, YStack } from "tamagui";

const WantToReadBooks = () => {
  const { data: books } = useGetBooks("wantToRead");

  const emptyNode = (
    <Text textAlign="center" pt="$10">
      You have not added any book yet 😢
    </Text>
  );

  return (
    <YStack f={1} gap="$4" px="$4" pt="$5">
      <XStack ai="center" jc="space-between">
        <XStack gap="$2" ai="center">
          <Text>Books I want to read</Text>
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
            <BookItem book={item} href={`/books/${item.id}/book-details`} />
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
};

export default WantToReadBooks;
