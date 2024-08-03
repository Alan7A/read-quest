import { Pencil, Trash2 } from "@tamagui/lucide-icons";
import { useDeleteNote } from "api/notes/notes.hooks";
import AlertModal from "components/modals/AlertModal";
import NoteFormModal from "components/modals/NoteFormModal";
import { useState } from "react";
import { ListItem, YStack } from "tamagui";
import type { Note } from "types/Note";
import Sheet from "../sheets/Sheet";

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  note: Note;
}

const NoteItemOptions = (props: Props) => {
  const { note, isOpen, setIsOpen } = props;
  const { id, bookId } = note;
  const [isNoteFormModalOpen, setIsNoteFormModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const { mutate: deleteNote } = useDeleteNote();

  const onEdit = () => {
    setIsOpen(false);
    setIsNoteFormModalOpen(true);
  };

  const onDelete = () => {
    setIsOpen(false);
    setIsAlertModalOpen(true);
  };

  const deleteHandler = () => {
    deleteNote({ bookId, noteId: id });
    setIsAlertModalOpen(false);
  };

  return (
    <Sheet title="Note options" isOpen={isOpen} onOpenChange={setIsOpen}>
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
      <NoteFormModal
        bookId={note.bookId}
        note={note}
        isOpen={isNoteFormModalOpen}
        onClose={() => setIsNoteFormModalOpen(false)}
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

export default NoteItemOptions;
