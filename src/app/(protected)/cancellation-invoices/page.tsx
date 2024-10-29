"use client";
import { ActionIcon, Group, Loader, Stack, Text, rem } from "@mantine/core";
import { useState } from "react";

import OfficialInvoiceTable from "../official-invoice/components/official-invoice-table";

import { IconArrowNarrowLeft } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import Search from "../official-invoice/components/search";
import useTableOfficialInvoices from "../official-invoice/hooks/use-table-official-invoice";

export default function CancellationInvoices() {
  const router = useRouter();
  const { data, isValidating, mutate, totalPage, isLoading } =
    useTableOfficialInvoices();
  const [loading, setLoading] = useState(false);
  return (
    <Stack p={"xl"} gap={"xl"} justify="center" align="center">
      <Group justify="space-between" maw={rem(1161)} w={"100%"}>
        <Text fw={"bold"} fz={"h3"}>
          فاکتور‌های ابطالی
        </Text>
        <ActionIcon>
          {loading ? (
            <Loader size={18} />
          ) : (
            <IconArrowNarrowLeft
              size={20}
              stroke={2}
              color="#4C6EF5"
              onClick={() => {
                setLoading(true);
                router.push("/official-invoice");
              }}
            />
          )}
        </ActionIcon>
        <Search isInHomePage={false} isValidating={isValidating} />
      </Group>

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
            invoices={data}
            totalPages={totalPage}
            mutate={mutate}
          />
        )}
      </Group>
    </Stack>
  );
}
