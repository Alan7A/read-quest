import { Search } from "@tamagui/lucide-icons";
import BookItem from "components/BookItem";
import { Link } from "expo-router";
import { Button, Input, Text, XStack, YStack } from "tamagui";

const SearchBookModal = () => {
  return (
    <YStack gap="$8" p="$4">
      <XStack gap="$2" ai="center">
        <Input
          placeholder="Search for a book or author"
          clearButtonMode="always"
          onSubmitEditing={() => console.log("Submit")}
          keyboardType="web-search"
          f={1}
        />
        <Button icon={Search} bg="$accentBackground" />
      </XStack>
      <YStack
        ai="center"
        jc="center"
        gap="$2"
        bg="$backgroundHover"
        borderRadius="$4"
        py="$4"
      >
        <Text color="$placeholderColor">
          Can't find what you're looking for?
        </Text>
        <Link href="/books/add">
          <Text>Add it manually</Text>
        </Link>
      </YStack>
      <BookItem />
    </YStack>
  );
};

export default SearchBookModal;
