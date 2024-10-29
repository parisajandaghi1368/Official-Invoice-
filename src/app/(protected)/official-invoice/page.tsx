"use client";
import { ITEMS_PER_PAGE } from "@/shared/constants/overlays-constant";
import { Group, Loader, Stack, Text, rem } from "@mantine/core";
import InvoiceHistory from "../(invoice-history)/components/invoice-history";
import OfficialInvoiceTable from "./components/official-invoice-table";
import Search from "./components/search";
import useTableOfficialInvoices from "./hooks/use-table-official-invoice";
export default function OfficialInvoicePage() {
  const { invoices, isLoading, isValidating, totalPage, mutate } =
    useTableOfficialInvoices();
  const totalPages = Math.floor(totalPage / ITEMS_PER_PAGE);
  return (
    <Stack p={"xl"} gap={rem(50)} justify="center" align="center">
      <Group justify="space-between" maw={rem(1161)} w={"100%"}>
        <Text fw={"bold"} fz={"h3"}>
          فاکتور‌ رسمی
        </Text>
        <InvoiceHistory />
      </Group>
      <Search isInHomePage={true} isValidating={isValidating} />

      <Group maw={rem(1321)} w={"100%"}>
        {isLoading ? (
          <Group
            maw={rem(1321)}
            h={rem(400)}
            w={"100%"}
            justify="center"
            align="center"
          >
            <Loader />
          </Group>
        ) : (
          <OfficialInvoiceTable
            showLastColumn={true}
            invoices={invoices}
            totalPages={totalPages}
            mutate={mutate}
          />
        )}
      </Group>
    </Stack>
  );
}
