import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateNote } from "api/notes/notes.hooks";
import Input from "components/form/Input";
import TextArea from "components/form/TextArea";
import { useForm } from "react-hook-form";
import { Pressable } from "react-native";
import useModalsStore from "stores/modals.store";
import { Button, Form, Text } from "tamagui";
import { CreateNoteConfig } from "types/Note";
import { insertNoteSchema } from "utils/schemas";
import Modal from "./Modal";

interface Props {
  bookId: string;
}

const AddNoteModal = (props: Props) => {
  const { bookId } = props;
  const isAddNoteModalOpen = useModalsStore(
    (state) => state.isAddNoteModalOpen
  );
  const setIsAddNoteModalOpen = useModalsStore(
    (state) => state.setIsAddNoteModalOpen
  );
  const { mutate: createNote } = useCreateNote();
  const { control, handleSubmit, formState, reset } = useForm<CreateNoteConfig>(
    {
      resolver: zodResolver(insertNoteSchema),
      defaultValues: { bookId },
    }
  );
  const { errors } = formState;

  const onCancel = () => {
    setIsAddNoteModalOpen(false);
    reset();
  };

  const onSubmit = handleSubmit((data) => {
    createNote({ ...data, bookId });
    setIsAddNoteModalOpen(false);
    reset();
  });
  console.log({ errors });

  return (
    <Modal
      isOpen={isAddNoteModalOpen}
      onClose={() => setIsAddNoteModalOpen(false)}
    >
      <Form
        onSubmit={onSubmit}
        gap="$4"
        bg="$background"
        p="$4"
        br="$4"
        minWidth={300}
        mx="auto"
      >
        <Text textAlign="center" fontWeight="700">
          Add a note
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

export default AddNoteModal;
