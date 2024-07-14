import { Control, useController } from "react-hook-form";
import { Input as TamaguiInput } from "tamagui";

interface Props {
  name: string;
  placeholder: string;
  control: Control;
}

const Input = (props: Props) => {
  const { name, placeholder, control } = props;
  const { field } = useController({
    control,
    defaultValue: "",
    name,
  });

  return (
    <TamaguiInput
      placeholder={placeholder}
      value={field.value}
      onChangeText={field.onChange}
    />
  );
};

export default Input;
