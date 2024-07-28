import { Control, useController } from "react-hook-form";
import { InputProps, Input as TamaguiInput, Text, YStack } from "tamagui";

interface Props extends InputProps {
  name: string;
  placeholder: string;
  control: Control<any, any>;
  errorMessage?: string;
}

const Input = (props: Props) => {
  const { name, placeholder, control, errorMessage, ...rest } = props;
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
        borderColor={errorMessage ? "$red10Light" : "$borderColor"}
        {...rest}
      />
      {errorMessage ? (
        <Text color="$red10Light" fontSize="$2">
          {errorMessage}
        </Text>
      ) : null}
    </YStack>
  );
};

export default Input;
