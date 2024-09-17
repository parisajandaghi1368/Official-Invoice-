import { Group, Stack, Text } from "@mantine/core";
import React from "react";
import SearchPart from "../(components)/search-part";
import InvoiceHistory from "../(components)/invoice-history";
import OfficialInvoiceTable from "../(components)/official-invoice-table";
// import ModalForInvoiceExportation from "../(components)/overlays/modal-for-invoice-export";

export default function OfficialInvoicePage() {
  return (
    <Stack p={"xl"} gap={"xl"}>
      <Group mx={"17rem"} justify="space-between">
        <Text fw={700}> فاکتور‌ رسمی</Text>
        <InvoiceHistory />
      </Group>
      <SearchPart />
      <Group mx={"7rem"}>
        <OfficialInvoiceTable />
      </Group>
    </Stack>
  );
}
