import { ReactNode } from "react";
import ModalComponent, { ModalProps } from "react-native-modal";
import { View } from "tamagui";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  modalProps?: ModalProps;
}

const Modal = (props: Props) => {
  const { isOpen, onClose, children, modalProps } = props;
  return (
    <ModalComponent
      isVisible={isOpen}
      onBackdropPress={onClose}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      {...modalProps}
    >
      <View bg="$background" p="$4" br="$4" minWidth={300} mx="auto">
        {children}
      </View>
    </ModalComponent>
  );
};

export default Modal;
