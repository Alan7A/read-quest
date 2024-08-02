import { Pencil, Trash2 } from "@tamagui/lucide-icons";
import Sheet from "../sheets/Sheet";
import { ListItem, YStack } from "tamagui";
import { useState } from "react";
import AlertModal from "components/modals/AlertModal";
import SessionFormModal from "components/modals/SessionFormModal";
import { useDeleteSession } from "api/sessions/sessions.hooks";
import { Session } from "types/Session";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  session: Session;
}

const SessionItemOptions = (props: Props) => {
  const { session, isOpen, setIsOpen } = props;
  const { id, bookId } = session;
  const [isSessionFormModalOpen, setIsSessionFormModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const { mutate: deleteSession } = useDeleteSession();

  const onEdit = () => {
    setIsOpen(false);
    setIsSessionFormModalOpen(true);
  };

  const onDelete = () => {
    setIsOpen(false);
    setIsAlertModalOpen(true);
  };

  const deleteHandler = () => {
    deleteSession({ bookId, sessionId: id });
    setIsAlertModalOpen(false);
  };

  return (
    <Sheet title="Session options" isOpen={isOpen} onOpenChange={setIsOpen}>
      <YStack>
        <ListItem pl="$0" icon={Pencil} onPress={onEdit} title="Edit" />
        <ListItem
          pl="$0"
          icon={Trash2}
          onPress={onDelete}
          title="Delete"
          color="$red10Light"
        />
      </YStack>
      <SessionFormModal
        bookId={session.bookId}
        session={session}
        isOpen={isSessionFormModalOpen}
        onClose={() => setIsSessionFormModalOpen(false)}
      />
      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        title="Delete note"
        description="Are you sure you want to delete this note?"
        isDelete
        onConfirm={deleteHandler}
      />
    </Sheet>
  );
};

export default SessionItemOptions;
