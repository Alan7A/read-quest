import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateNote, useEditNote } from "api/notes/notes.hooks";
import Input from "components/form/Input";
import TextArea from "components/form/TextArea";
import { useForm } from "react-hook-form";
import { Pressable } from "react-native";
import { Button, Form, Text } from "tamagui";
import { CreateNoteConfig, Note } from "types/Note";
import { insertNoteSchema } from "utils/schemas";
import Modal from "./Modal";

interface Props {
  bookId: string;
  isOpen: boolean;
  onClose: () => void;
  note?: Note;
}

const NoteFormModal = (props: Props) => {
  const { bookId, note, isOpen, onClose } = props;
  const { mutate: createNote } = useCreateNote();
  const { mutate: editNote } = useEditNote();
  const { control, handleSubmit, formState, reset } = useForm<CreateNoteConfig>(
    {
      resolver: zodResolver(insertNoteSchema),
      defaultValues: note
        ? { ...note, page: note.page === 0 ? undefined : note.page }
        : { bookId },
    }
  );
  const { errors } = formState;

  const onCancel = () => {
    onClose();
    reset();
  };

  const onSubmit = handleSubmit((data) => {
    if (note) {
      editNote({ ...data, id: note.id, page: data.page ?? null });
    } else {
      createNote({ ...data, bookId });
    }
    onClose();
    reset();
  });

  return (
    <Modal isOpen={isOpen} onClose={() => onClose()}>
      <Form onSubmit={onSubmit} gap="$4">
        <Text textAlign="center" fontWeight="700">
          {note ? "Edit note" : "Add a note"}
        </Text>
        <TextArea
          name="text"
          placeholder="Write your note here"
          control={control}
          errorMessage={errors.text?.message}
        />
        <Input
          name="page"
          placeholder="Page number"
          control={control}
          errorMessage={errors.page?.message}
          keyboardType="numeric"
        />
        <Button onPress={onSubmit}>Add note</Button>
        <Pressable onPress={onCancel}>
          <Text textAlign="center">Cancel</Text>
        </Pressable>
      </Form>
    </Modal>
  );
};

export default NoteFormModal;
