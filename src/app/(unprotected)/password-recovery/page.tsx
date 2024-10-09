import Logo from "@/assets/logo";
import { Stack, rem } from "@mantine/core";
import React from "react";

export default function PasswordRecovery() {
  return (
    <Stack h={"100%"} align="center" justify="center">
      <Logo variant="dark" width={rem(160)} hanging={rem(100)} />
    </Stack>
  );
}
