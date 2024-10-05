"use client";
import {
  Button,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import React from "react";

export default function Login() {
  return (
    <form>
      <Stack w={rem(400)}>
        <Text fw={700} size="lg">
          ورود
        </Text>
        <TextInput></TextInput>
        <PasswordInput></PasswordInput>
        <Button size="md" variant="filled">
          ورود
        </Button>
      </Stack>
    </form>
  );
}
