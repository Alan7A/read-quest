import { ReactNode } from "react";
import ModalComponent, { ModalProps } from "react-native-modal";

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
      {children}
    </ModalComponent>
  );
};

export default Modal;
