"use client";
import { ActionIcon, Group, Loader, Tooltip } from "@mantine/core";
import { IconFileX, IconHistory } from "@tabler/icons-react";

import { useRouter } from "next/navigation";
import { useState } from "react";
import InvoicesHistoryDrawer from "./invoices-history-drawer";

export default function InvoiceHistory() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <>
      <Group>
        <Tooltip label="فاکتور‌های ابطالی">
          <ActionIcon
            onClick={() => {
              setIsLoading(true);
              router.push("/cancellation-invoices");
            }}
          >
            {isLoading ? <Loader size={18} /> : <IconFileX size={20} />}
          </ActionIcon>
        </Tooltip>
        <Tooltip label="تاریخچه">
          <ActionIcon
            onClick={() => {
              setIsDrawerOpen(true);
            }}
          >
            <IconHistory size={20} />
          </ActionIcon>
        </Tooltip>
      </Group>

      <InvoicesHistoryDrawer
        opened={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}
