"use client";
import { Group, Stack, Text, rem } from "@mantine/core";
import React from "react";
import Search from "./components/search";
import InvoiceHistory from "../(invoice-history)/components/invoice-history";
import OfficialInvoiceTable from "./components/official-invoice-table";
import useOfficialInvoices from "./hooks/use-official-invoice";

export default function OfficialInvoicePage() {
  const { invoices, isLoading, isValidating, totalPage, mutate } =
    useOfficialInvoices();
  const totalPages = Math.floor(totalPage / 10);
  return (
    <Stack p={"xl"} gap={"xl"} justify="center" align="center">
      <Group justify="space-between" maw={rem(1161)} w={"100%"}>
        <Text fw={"bold"} fz={"h3"}>
          فاکتور‌ رسمی
        </Text>
        <InvoiceHistory />
      </Group>
      <Search isInHomePage={true} />

      <Group maw={rem(1321)} w={"100%"}>
        <OfficialInvoiceTable
          showLastColumn={true}
          invoices={invoices}
          totalPages={totalPages}
        />
      </Group>
    </Stack>
  );
}
