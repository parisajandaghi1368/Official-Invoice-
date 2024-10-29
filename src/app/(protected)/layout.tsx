import { Stack } from "@mantine/core";
import React from "react";
import Header from "./(components)/header";
import ProtectedPageWrapper from "./(components)/protected-page-wrapper";
export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedPageWrapper>
      <Stack w={"100%"} h={"100%"}>
        <Header />
        {children}
      </Stack>
    </ProtectedPageWrapper>
  );
}
