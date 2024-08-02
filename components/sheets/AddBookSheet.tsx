import { router } from "expo-router";
import Sheet from "./Sheet";
import { ListItem, YStack } from "tamagui";
import { Search, SquarePen } from "@tamagui/lucide-icons";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function AddBookSheet(props: Props) {
  const { isOpen, setIsOpen } = props;

  const handleItemPress = (goTo: string) => {
    setIsOpen(false);
    router.push(goTo);
  };

  return (
    <Sheet title="Add a book" isOpen={isOpen} onOpenChange={setIsOpen}>
      <YStack>
        <ListItem
          pl="$0"
          icon={Search}
          onPress={() => handleItemPress("/books/search-book")}
        >
          Search online
        </ListItem>
        <ListItem
          pl="$0"
          icon={SquarePen}
          onPress={() => handleItemPress("/books/add")}
        >
          Add manually
        </ListItem>
      </YStack>
    </Sheet>
  );
}