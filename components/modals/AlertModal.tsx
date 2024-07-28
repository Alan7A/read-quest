import { Button, H3, Text, XStack, YStack } from "tamagui";
import Modal from "./Modal";

interface Props {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  isDelete?: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const AlertModal = (props: Props) => {
  const { title, description, confirmText, cancelText, onConfirm } = props;
  const { isDelete, isOpen, onClose } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <YStack backgroundColor="$background" gap="$2">
        <H3>{title}</H3>
        {description ? <Text>{description}</Text> : null}
        <XStack mt="$4" justifyContent="flex-end" gap="$2">
          <Button onPress={onClose}>{cancelText || "Cancel"}</Button>
          {isDelete ? (
            <Button
              onPress={onConfirm}
              backgroundColor="$red10Light"
              color="$red10"
            >
              {confirmText || "Delete"}
            </Button>
          ) : (
            <Button onPress={onConfirm}>{confirmText || "Confirm"}</Button>
          )}
        </XStack>
      </YStack>
    </Modal>
  );
};

export default AlertModal;
