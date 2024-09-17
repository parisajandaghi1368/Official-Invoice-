import React from "react";
import Header from "./(components)/header";
import { Stack } from "@mantine/core";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Stack w={"100%"} h={"100%"} >
      <Header />
      {children}
    </Stack>
  );
}
