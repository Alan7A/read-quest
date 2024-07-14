import { X } from "@tamagui/lucide-icons";
import { Button, ListItem, Sheet, Text, XStack, YGroup } from "tamagui";
import { SquarePen, Search } from "@tamagui/lucide-icons";
import useModalsStore from "stores/modals.store";
import { router } from "expo-router";

export default function AddBookModal() {
  const isModalOpen = useModalsStore((state) => state.isAddBookModalOpen);
  const setIsModalOpen = useModalsStore((state) => state.setIsAddBookModalOpen);

  const handleItemPress = (goTo: string) => {
    setIsModalOpen(false);
    router.push(goTo);
  };

  return (
    <Sheet
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
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
            onPress={() => setIsModalOpen(false)}
            pr="$1"
          />
        </XStack>
        <YGroup>
          <YGroup.Item>
            <ListItem
              pl="$0"
              icon={Search}
              onPress={() => handleItemPress("/books/searchBook")}
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
