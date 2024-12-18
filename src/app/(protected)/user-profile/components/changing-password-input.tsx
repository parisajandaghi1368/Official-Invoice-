"use client";
import { TextInput, TextInputProps, UnstyledButton, rem } from "@mantine/core";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { ChangeEvent, useState } from "react";
import classes from "../style/style.module.css";

type PasswordInputProps = {
  label: string;
  inputProp?: TextInputProps;
  inputValue?: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
};
export default function ChangingPasswordInput({
  inputProp,
  label,
  inputValue,
  onChange,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextInput
      label={label}
      value={inputValue}
      w={rem(320)}
      type={showPassword ? "text" : "password"}
      autoComplete="current-password"
      withAsterisk
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
      onChange={onChange}
    ></TextInput>
  );
}
