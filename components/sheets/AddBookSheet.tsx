import useModalsStore from "stores/modals.store";
import { router } from "expo-router";
import Sheet from "./Sheet";
import { ListItem, YStack } from "tamagui";
import { Search, SquarePen } from "@tamagui/lucide-icons";

export default function AddBookSheet() {
  const isAddBookSheetOpen = useModalsStore(
    (state) => state.isAddBookSheetOpen
  );
  const setIsAddBookSheetOpen = useModalsStore(
    (state) => state.setIsAddBookSheetOpen
  );

  const handleItemPress = (goTo: string) => {
    setIsAddBookSheetOpen(false);
    router.push(goTo);
  };

  return (
    <Sheet
      title="Add a book"
      isOpen={isAddBookSheetOpen}
      onOpenChange={setIsAddBookSheetOpen}
    >
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
