import { Group, Stack, Text, rem } from "@mantine/core";
import React from "react";
import Search from "../(components)/search";
import InvoiceHistory from "../(components)/invoice-history";
import OfficialInvoiceTable from "../(components)/official-invoice-table";

export default function OfficialInvoicePage() {
  return (
    <Stack p={"xl"} gap={"xl"} justify="center" align="center">
      <Group justify="space-between" maw={rem(1161)} w={"100%"}>
        <Text fw={"bold"} fz={"h3"}>
          {" "}
          فاکتور‌ رسمی
        </Text>
        <InvoiceHistory />
      </Group>
      <Search isInHomePage={true} />

      <Group maw={rem(1321)} w={"100%"}>
        <OfficialInvoiceTable showLastColumn={true} />
      </Group>
    </Stack>
  );
}
