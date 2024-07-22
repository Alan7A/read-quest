import { Link } from "expo-router";
import { Text, XStack, YStack } from "tamagui";
import { PlusCircle } from "@tamagui/lucide-icons";
import { FlatList, ListRenderItem } from "react-native";

interface Props {
  name: string;
  seeAllRoute?: string;
  addNewRoute?: string;
  data: any[];
  renderItem: ListRenderItem<any>;
}

const BookDetailsSection = (props: Props) => {
  const { name, seeAllRoute, addNewRoute, data, renderItem } = props;

  const emptyNode = (
    <XStack
      jc="center"
      bg="$backgroundHover"
      py="$4"
      borderRadius="$4"
      w="100%"
    >
      <Text color="$color10">No {name}</Text>
    </XStack>
  );

  return (
    <YStack w="100%" gap="$2">
      <XStack jc="space-between" px="$2">
        <Text>{name}</Text>
        <XStack>
          {seeAllRoute && addNewRoute ? (
            <XStack gap="$4" ai="center">
              <Link href={seeAllRoute}>
                <Text>See all</Text>
              </Link>
              <Link href={addNewRoute}>
                <PlusCircle size={18} />
              </Link>
            </XStack>
          ) : null}
        </XStack>
      </XStack>
      {!data.length ? (
        emptyNode
      ) : (
        <FlatList data={data} renderItem={renderItem} maxToRenderPerBatch={3} />
      )}
    </YStack>
  );
};

export default BookDetailsSection;
