import { KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Button, Form, Image, Label, ScrollView, YStack } from "tamagui";
import { BookPlus } from "@tamagui/lucide-icons";
import * as ImagePicker from "expo-image-picker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./form/Input";
import TextArea from "./form/TextArea";
import { useRoute } from "@react-navigation/native";
import { Book } from "types/Book";
import { useCreateBook } from "api/books/books.hooks";
import { router } from "expo-router";
import { nanoid } from "nanoid";
import { insertBookSchema } from "utils/schemas";

const BookForm = () => {
  const route = useRoute();
  const { bookJson } = route.params as { bookJson?: string };
  const book = bookJson ? (JSON.parse(bookJson) as Book) : null;
  const [cover, setCover] = useState<string | null>(book?.cover ?? null);
  const { control, handleSubmit, formState, setValue } = useForm({
    resolver: zodResolver(insertBookSchema),
    defaultValues: book ?? {},
  });
  const { errors } = formState;
  console.log({ errors });
  const { mutate: createBook } = useCreateBook();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [2, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setCover(result.assets[0].uri);
      setValue("cover", result.assets[0].uri);
    }
  };

  const onSubmit = handleSubmit((data) => {
    createBook({ ...data, cover: cover ?? null, id: book?.id ?? nanoid(12) });
    router.replace("/");
  });

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}
    >
      <ScrollView f={1}>
        <Form f={1} px="$4" py="$2" gap="$1" onSubmit={onSubmit}>
          <YStack>
            <Label htmlFor="cover">Cover</Label>
            {cover ? (
              <TouchableOpacity onPress={pickImage} style={{ maxWidth: 75 }}>
                <Image
                  source={{
                    uri: cover,
                    width: 75,
                    height: 112,
                  }}
                  borderRadius="$2"
                />
              </TouchableOpacity>
            ) : (
              <Button
                icon={BookPlus}
                w={75}
                h={112}
                scaleIcon={1.5}
                onPress={pickImage}
              />
            )}
          </YStack>
          <YStack>
            <Label htmlFor="title">Title *</Label>
            <Input
              name="title"
              placeholder="Title"
              control={control}
              errorMessage={errors.title?.message}
            />
          </YStack>
          <YStack>
            <Label htmlFor="author">Author</Label>
            <Input name="author" placeholder="Author(s)" control={control} />
          </YStack>
          <YStack>
            <Label htmlFor="description">Description</Label>
            <TextArea
              name="description"
              placeholder="Description"
              control={control}
            />
          </YStack>
          <YStack>
            <Label htmlFor="pages">Pages *</Label>
            <Input
              name="pages"
              placeholder="Pages"
              control={control}
              errorMessage={errors.pages?.message}
            />
          </YStack>
          <YStack>
            <Label htmlFor="publisher">Publisher</Label>
            <Input name="publisher" placeholder="Publisher" control={control} />
          </YStack>
          <Form.Trigger asChild mt="$6">
            <Button bg="$accentBackground" mt="$8" onPress={onSubmit}>
              Add book
            </Button>
          </Form.Trigger>
        </Form>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default BookForm;
