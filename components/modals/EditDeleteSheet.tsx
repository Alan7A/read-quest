import { Pencil, Trash2, X } from "@tamagui/lucide-icons";
import useModalsStore from "stores/modals.store";
import { Button, ListItem, Sheet, Text, XStack, YGroup } from "tamagui";

interface Props {
  title: string;
  onEdit: () => void;
  onDelete: () => void;
}

const EditDeleteSheet = (props: Props) => {
  const { title, onEdit, onDelete } = props;
  const isEditDeleteSheetOpen = useModalsStore(
    (state) => state.isEditDeleteSheetOpen
  );
  const setIsEditDeleteSheetOpen = useModalsStore(
    (state) => state.setIsEditDeleteSheetOpen
  );

  return (
    <Sheet
      open={isEditDeleteSheetOpen}
      onOpenChange={setIsEditDeleteSheetOpen}
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
          <Text>{title}</Text>
          <Button
            icon={<X />}
            chromeless
            onPress={() => setIsEditDeleteSheetOpen(false)}
            pr="$1"
          />
        </XStack>
        <YGroup>
          <YGroup.Item>
            <ListItem pl="$0" icon={Pencil} onPress={onEdit}>
              Edit
            </ListItem>
          </YGroup.Item>
          <YGroup.Item>
            <ListItem pl="$0" icon={Trash2} onPress={onDelete}>
              Delete
            </ListItem>
          </YGroup.Item>
        </YGroup>
      </Sheet.Frame>
    </Sheet>
  );
};

export default EditDeleteSheet;
