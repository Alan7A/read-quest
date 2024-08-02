import { ReactNode } from "react";
import ModalComponent, { ModalProps } from "react-native-modal";
import { View, ViewProps } from "tamagui";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  modalProps?: ModalProps;
  containerProps?: ViewProps;
}

const Modal = (props: Props) => {
  const { isOpen, onClose, children, modalProps, containerProps } = props;
  return (
    <ModalComponent
      isVisible={isOpen}
      onBackdropPress={onClose}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      {...modalProps}
    >
      <View
        bg="$background"
        p="$4"
        br="$4"
        minWidth="90%"
        mx="auto"
        {...containerProps}
      >
        {children}
      </View>
    </ModalComponent>
  );
};

export default Modal;
