import { X } from "@tamagui/lucide-icons";
import { Button, ListItem, Sheet, Text, XStack, YGroup } from "tamagui";
import { SquarePen, Search } from "@tamagui/lucide-icons";
import useModalsStore from "stores/modals.store";
import { router } from "expo-router";

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
      open={isAddBookSheetOpen}
      onOpenChange={setIsAddBookSheetOpen}
      snapPointsMode="fit"
    >
      <Sheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <Sheet.Handle />
      <Sheet.Frame px="$5" pt="$4" pb="$6" bg="$backgroundHover">
        <XStack jc="space-between" ai="center">
          <Text>Add a book</Text>
          <Button
            icon={<X />}
            chromeless
            onPress={() => setIsAddBookSheetOpen(false)}
            pr="$1"
          />
        </XStack>
        <YGroup>
          <YGroup.Item>
            <ListItem
              pl="$0"
              icon={Search}
              onPress={() => handleItemPress("/books/search-book")}
            >
              Search online
            </ListItem>
          </YGroup.Item>
          <YGroup.Item>
            <ListItem
              pl="$0"
              icon={SquarePen}
              onPress={() => handleItemPress("/books/add")}
            >
              Add manually
            </ListItem>
          </YGroup.Item>
        </YGroup>
      </Sheet.Frame>
    </Sheet>
  );
}
