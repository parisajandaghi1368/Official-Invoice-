import { TextInput, TextInputProps, UnstyledButton } from "@mantine/core";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { useState } from "react";
import classes from "../style/style.module.css";

type PasswordInputProps = {
  label: string;
  inputProp?: TextInputProps;
  inputValue?: string;
  width?: string;
  height?: string;
};
export default function PasswordInput({
  inputProp,
  label,
  inputValue,
  width,
  height,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextInput
      label={label}
      value={inputValue}
      type={showPassword ? "text" : "password"}
      autoComplete="current-password"
      withAsterisk
      w={width}
      h={height}
      placeholder="رمز عبور"
      {...inputProp}
      leftSection={
        showPassword ? (
          <UnstyledButton>
            <IconEyeOff size={18} onClick={togglePasswordVisibility} />
          </UnstyledButton>
        ) : (
          <UnstyledButton>
            <IconEye size={18} onClick={togglePasswordVisibility} />
          </UnstyledButton>
        )
      }
      classNames={{
        input: classes.input,
      }}
    ></TextInput>
  );
}
