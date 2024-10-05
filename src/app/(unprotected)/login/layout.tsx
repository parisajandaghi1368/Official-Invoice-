import { Stack, rem } from "@mantine/core";
import { PropsWithChildren } from "react";

import Logo from "@/assets/logo";
export default function LoginLayout({ children }: PropsWithChildren) {
  return (
    <Stack h={"100%"} w={"100%"} align="center" justify="center">
      <Logo variant="dark" width={rem(160)} hanging={rem(100)} />
      {children}
    </Stack>
  );
}
