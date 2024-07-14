import { KeyboardAvoidingView } from "react-native";
import { useState } from "react";
import { Button, Form, Image, Label, ScrollView, YStack } from "tamagui";
import { BookPlus } from "@tamagui/lucide-icons";
import * as ImagePicker from "expo-image-picker";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "./form/Input";
import { bookSchema } from "utils/schemas";

const BookForm = () => {
  const [cover, setCover] = useState<string | null>(null);
  const { control, handleSubmit, formState, setValue } = useForm({
    resolver: zodResolver(bookSchema),
  });
  const { errors } = formState;
  console.log({ errors });

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

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}
    >
      <ScrollView f={1}>
        <Form f={1} px="$4" py="$2" gap="$2" onSubmit={handleSubmit(onSubmit)}>
          <YStack>
            <Label htmlFor="cover">Cover</Label>
            {cover ? (
              <Image
                source={{
                  uri: cover,
                  width: 75,
                  height: 112,
                }}
                borderRadius="$2"
              />
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
            <Input name="title" placeholder="Title" control={control} />
          </YStack>
          <YStack>
            <Label htmlFor="author">Author</Label>
            <Input name="author" placeholder="Author(s)" control={control} />
          </YStack>
          <YStack>
            <Label htmlFor="description">Description</Label>
            <Input
              name="description"
              placeholder="Description"
              control={control}
            />
          </YStack>
          <YStack>
            <Label htmlFor="pages">Pages *</Label>
            <Input name="pages" placeholder="Pages" control={control} />
          </YStack>
          <YStack>
            <Label htmlFor="publisher">Publisher</Label>
            <Input name="publisher" placeholder="Publisher" control={control} />
          </YStack>
          <Form.Trigger asChild mt="$8">
            <Button mt="$8">Add book</Button>
          </Form.Trigger>
        </Form>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default BookForm;
