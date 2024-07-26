import { zodResolver } from "@hookform/resolvers/zod";
import Input from "components/form/Input";
import { useForm } from "react-hook-form";
import useModalsStore from "stores/modals.store";
import { Button, Form, Sheet, Text, YStack } from "tamagui";
import { z } from "zod";
import { useStopwatchStore } from "stores/stopwatch.store";
import { useCreateSession } from "api/sessions/sessions.hooks";
import { router } from "expo-router";
import { Book } from "types/Book";
import { useEffect } from "react";

interface Props {
  book: Book;
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
    date: z.string(),
  })
  .refine((data) => data.startPage <= data.endPage, {
    message: "Must be equal or greater than start page",
    path: ["endPage"],
  });

const FinishSessionModal = (props: Props) => {
  const { book } = props;
  const { id: bookId, progress } = book;
  const isModalOpen = useModalsStore((state) => state.isFinishSessionModalOpen);
  const setIsModalOpen = useModalsStore(
    (state) => state.setIsFinishSessionModalOpen
  );
  const { timeInSeconds, restart } = useStopwatchStore();
  const { mutate: createSession } = useCreateSession();
  const { control, handleSubmit, formState, setValue } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      startPage: progress ?? 0,
      endPage: undefined,
      duration: timeInSeconds,
      date: new Date().toISOString(),
    },
  });
  const { errors } = formState;

  const onSubmit = handleSubmit((data) => {
    console.log({ data });
    const { startPage, endPage } = data;
    const pages = endPage! - startPage;
    const payload = { ...data, bookId, pages };

    createSession(payload);

    setIsModalOpen(false);
    restart();
    router.back();
  });

  useEffect(() => {
    setValue("duration", timeInSeconds);
    // TODO: Revisar que eslint diga que están bine las dependencias
  }, [timeInSeconds]);

  return (
    <Sheet
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
      snapPointsMode="fit"
    >
      <Sheet.Overlay
        animation="lazy"
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <Sheet.Handle />
      <Sheet.Frame px="$5" pt="$4" pb="$6" bg="$backgroundHover" w="110%">
        <YStack ai="center" gap="$2">
          <Text>Finish session</Text>
          <Form onSubmit={onSubmit} gap="$2" w="60%">
            <Input
              name="startPage"
              placeholder="Start page"
              control={control}
              errorMessage={errors.startPage?.message}
              keyboardType="numeric"
            />
            <Input
              name="endPage"
              placeholder="End page"
              control={control}
              errorMessage={errors.endPage?.message}
              keyboardType="numeric"
            />
            <Input
              name="duration"
              placeholder="Duration"
              control={control}
              errorMessage={errors.duration?.message}
            />
            <Input
              name="date"
              placeholder="Date"
              control={control}
              errorMessage={errors.date?.message}
            />
            {/* <Pressable onPress={() => {}}>
              <Text>{dayjs().format("YYYY-MM-DD")}</Text>
            </Pressable> */}
            <Form.Trigger asChild>
              <Button>Save</Button>
            </Form.Trigger>
          </Form>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
};

export default FinishSessionModal;
