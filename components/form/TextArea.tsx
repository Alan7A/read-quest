import { type Control, useController } from "react-hook-form";
import { TextArea as TamaguiTextArea, Text, YStack } from "tamagui";

interface Props {
  name: string;
  placeholder: string;
  control: Control<any, any>;
  errorMessage?: string;
}

const TextArea = (props: Props) => {
  const { name, placeholder, control, errorMessage, ...rest } = props;
  const { field } = useController({
    control,
    defaultValue: "",
    name
  });

  return (
    <YStack>
      <TamaguiTextArea
        maxHeight={120}
        placeholder={placeholder}
        value={field.value}
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

export default TextArea;
