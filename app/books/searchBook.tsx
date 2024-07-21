import { Search } from "@tamagui/lucide-icons";
import { useGetBooks } from "api/books/books";
import BookItem from "components/BookItem";
import BookItemPlaceholder from "components/BookItem.placeholder";
import { Link } from "expo-router";
import { useState } from "react";
import { FlatList } from "react-native";
import { Button, Input, Text, XStack, YStack } from "tamagui";

const SearchBookModal = () => {
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const { data, status, hasNextPage, fetchNextPage } = useGetBooks(query);
  const books = data?.pages.flatMap((page) => page);

  const onEndReached = () => {
    if (hasNextPage && status !== "loading") {
      fetchNextPage();
    }
  };

  return (
    <YStack gap="$4" p="$4">
      <XStack gap="$2" ai="center">
        <Input
          autoFocus
          value={inputValue}
          onChange={(e) => setInputValue(e.nativeEvent.text)}
          placeholder="Search for a book or author"
          clearButtonMode="always"
          onSubmitEditing={(e) => setQuery(inputValue)}
          keyboardType="web-search"
          f={1}
        />
        <Button
          icon={Search}
          bg="$accentBackground"
          onPress={() => setQuery(inputValue)}
        />
      </XStack>

      {status === "loading" && <BookItemPlaceholder />}

      {books?.length === 0 ? (
        <YStack
          ai="center"
          jc="center"
          gap="$2"
          bg="$backgroundHover"
          borderRadius="$4"
          py="$4"
        >
          <Text color="$placeholderColor">No books found</Text>
          <Link href="/books/add">
            <Text>Add manually</Text>
          </Link>
        </YStack>
      ) : (
        <FlatList
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BookItem book={item} href="/books/add" />}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
        />
      )}
    </YStack>
  );
};

export default SearchBookModal;
