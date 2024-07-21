import { Control, useController } from "react-hook-form";
import { TextArea as TamaguiTextArea } from "tamagui";

interface Props {
  name: string;
  placeholder: string;
  control: Control<any, any>;
}

const TextArea = (props: Props) => {
  const { name, placeholder, control } = props;
  const { field } = useController({
    control,
    defaultValue: "",
    name,
  });

  return (
    <TamaguiTextArea
      maxHeight={120}
      placeholder={placeholder}
      value={field.value}
      onChangeText={field.onChange}
    />
  );
};

export default TextArea;
