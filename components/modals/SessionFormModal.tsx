import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateSession, useEditSession } from "api/sessions/sessions.hooks";
import Input from "components/form/Input";
import { router, usePathname } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Pressable } from "react-native";
import { useStopwatchStore } from "stores/stopwatch.store";
import { Button, Form, H3, Label, Text, YStack } from "tamagui";
import type { Book } from "types/Book";
import type { CreateSessionConfig, Session } from "types/Session";
import { z } from "zod";
import Modal from "./Modal";

interface Props {
  bookId: string;
  book?: Book;
  session?: Session;
  isOpen: boolean;
  onClose: () => void;
}

const FormSchema = z
  .object({
    startPage: z.coerce
      .number({ message: "Enter a start page" })
      .min(0, { message: "Start page must be greater than 0" }),
    endPage: z.coerce
      .number({ message: "Enter an end page" })
      .min(0, { message: "End page must be greater than 0" }),
    duration: z.coerce
      .number({ message: "Enter a duration" })
      .min(1, { message: "Duration must be greater than 0" }),
    date: z.string()
  })
  .refine((data) => data.startPage <= data.endPage, {
    message: "Must be equal or greater than start page",
    path: ["endPage"]
  });

const SessionFormModal = (props: Props) => {
  const { book, session, bookId, isOpen, onClose } = props;
  const pathname = usePathname();
  const isManualSession = pathname !== "/reading-session-modal";
  const { progress } = book ?? {};
  const { mutate: createSession } = useCreateSession();
  const { mutate: editSession } = useEditSession();
  const { timeInSeconds, restart } = useStopwatchStore();
  const { control, handleSubmit, formState, setValue, reset } =
    useForm<CreateSessionConfig>({
      resolver: zodResolver(FormSchema),
      defaultValues: session ?? {
        startPage: progress ?? 0,
        endPage: undefined,
        duration: timeInSeconds,
        date: new Date().toISOString()
      }
    });
  const { errors } = formState;

  const onCancel = () => {
    onClose();
    reset();
  };

  const onSubmit = handleSubmit((data) => {
    console.log({ data });

    if (session) {
      editSession({ ...data, bookId, id: session.id });
    } else {
      createSession({ ...data, bookId });
    }

    onClose();
    restart();
    reset();
    if (!isManualSession) {
      router.back();
    }
  });

  useEffect(() => {
    setValue("duration", timeInSeconds);
    // TODO: Revisar que eslint diga que están bine las dependencias
  }, [timeInSeconds, setValue]);

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <Form onSubmit={onSubmit} gap="$0">
        <H3 textAlign="center" fontWeight="700">
          {session ? "Edit session" : "Add session"}
        </H3>
        <YStack>
          <Label>Start page</Label>
          <Input
            name="startPage"
            placeholder="Start page"
            control={control}
            errorMessage={errors.startPage?.message}
            keyboardType="numeric"
          />
        </YStack>
        <YStack>
          <Label>End page</Label>
          <Input
            name="endPage"
            placeholder="End page"
            control={control}
            errorMessage={errors.endPage?.message}
            keyboardType="numeric"
          />
        </YStack>
        <YStack>
          <Label>Duration</Label>
          <Input
            name="duration"
            placeholder="Duration"
            control={control}
            errorMessage={errors.duration?.message}
          />
        </YStack>
        <YStack>
          <Label m={0} p={0}>
            Date
          </Label>
          <Input
            name="date"
            placeholder="Date"
            control={control}
            errorMessage={errors.date?.message}
          />
        </YStack>
        {/* <Pressable onPress={() => {}}>
              <Text>{dayjs().format("YYYY-MM-DD")}</Text>
            </Pressable> */}
        <Form.Trigger asChild>
          <Button mt="$4">Save</Button>
        </Form.Trigger>
        <Pressable onPress={onCancel}>
          <Text textAlign="center" mt="$4">
            Cancel
          </Text>
        </Pressable>
      </Form>
    </Modal>
  );
};

export default SessionFormModal;
