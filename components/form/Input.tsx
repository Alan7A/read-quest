import { Control, useController } from "react-hook-form";
import { Input as TamaguiInput, Text, YStack } from "tamagui";

interface Props {
  name: string;
  placeholder: string;
  control: Control<any, any>;
  errorMessage?: string;
}

const Input = (props: Props) => {
  const { name, placeholder, control, errorMessage } = props;
  const { field } = useController({
    control,
    defaultValue: "",
    name,
  });

  return (
    <YStack my="$0">
      <TamaguiInput
        placeholder={placeholder}
        value={String(field.value)}
        onChangeText={field.onChange}
      />
      {errorMessage ? (
        <Text color="$red5" fontSize="$2">
          {errorMessage}
        </Text>
      ) : null}
    </YStack>
  );
};

export default Input;
