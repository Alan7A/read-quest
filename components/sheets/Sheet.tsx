import { X } from "@tamagui/lucide-icons";
import type { ReactNode } from "react";
import { Button, Sheet as SheetComponent, Text, XStack } from "tamagui";

interface Props {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  title?: string;
  snapPoints?: number[];
  children: ReactNode;
}

export default function Sheet(props: Props) {
  const { isOpen, onOpenChange, title, children, snapPoints = [25] } = props;

  return (
    <SheetComponent
      open={isOpen}
      onOpenChange={onOpenChange}
      snapPointsMode="percent"
      snapPoints={snapPoints}
      modal
    >
      <SheetComponent.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <SheetComponent.Handle />
      <SheetComponent.Frame
        px="$5"
        pt="$4"
        pb="$6"
        bg="$backgroundHover"
        borderTopEndRadius="$6"
        borderTopStartRadius="$6"
        disableHideBottomOverflow
      >
        <XStack jc="space-between" ai="center">
          <Text>{title ?? ""}</Text>
          <Button
            icon={<X />}
            chromeless
            onPress={() => onOpenChange(false)}
            pr="$1"
          />
        </XStack>
        {children}
      </SheetComponent.Frame>
    </SheetComponent>
  );
}
