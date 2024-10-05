import { Loader, Stack, rem } from "@mantine/core";
import React from "react";
import Logo from "@/assets/logo";
export default function PageLoader() {
  return (
    <Stack h={"100%"} align="center" justify="center">
      <Logo variant="dark" width={rem(160)} hanging={rem(100)} />
      <Loader color="pink" />
    </Stack>
  );
}
