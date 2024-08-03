import { PlusCircle } from "@tamagui/lucide-icons";
import { Link } from "expo-router";
import type { ExpoRouter } from "expo-router/types/expo-router";
import type { ReactNode } from "react";
import { Pressable } from "react-native";
import { Text, XStack, YStack } from "tamagui";

interface Props {
  name: string;
  seeAllHref?: ExpoRouter.Href;
  onAddNew?: () => void;
  isEmpty: boolean;
  children?: ReactNode;
}

const BookDetailsSection = (props: Props) => {
  const { name, seeAllHref: seeAllRoute, onAddNew, isEmpty, children } = props;

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
    <YStack w="100%">
      <XStack jc="space-between" px="$2">
        <Text>{name}</Text>
        <XStack>
          {seeAllRoute && onAddNew ? (
            <XStack gap="$4" ai="center">
              <Link href={seeAllRoute}>
                <Text>See all</Text>
              </Link>
              <Pressable onPress={onAddNew}>
                <PlusCircle size={18} />
              </Pressable>
            </XStack>
          ) : null}
        </XStack>
      </XStack>
      {isEmpty ? emptyNode : children}
    </YStack>
  );
};

export default BookDetailsSection;
