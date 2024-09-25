"use client";
import { Group, Stack, Text, UnstyledButton, rem } from "@mantine/core";
import React from "react";

import OfficialInvoiceTable from "../(components)/official-invoice-table";

import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import Search from "../(components)/search";

export default function CancellationInvoices() {
  const router = useRouter();
  return (
    <Stack p={"xl"} gap={"xl"} justify="center" align="center">
      <Group justify="space-between" maw={rem(1161)} w={"100%"}>
        <Text fw={"bold"} fz={"h3"}>
          {" "}
          فاکتور‌های ابطالی
        </Text>
        <UnstyledButton
          onClick={() => {
            router.push("/official-invoice");
          }}
        >
          <IconArrowNarrowLeft size={30} stroke={2} color="#4C6EF5" />
        </UnstyledButton>
        <Search isInHomePage={false} />
      </Group>

      <Group maw={rem(1321)} w={"100%"}>
        <OfficialInvoiceTable showLastColumn={false} />
      </Group>
    </Stack>
  );
}
