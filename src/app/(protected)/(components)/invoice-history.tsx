"use client";
import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { IconFileX, IconHistory } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import InvoicesHistoryDrawer from "./overlays/invoices-history-drawer";
import React, { useState } from "react";

export default function InvoiceHistory() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const router = useRouter();
  return (
    <>
      <Group>
        <Tooltip label="فاکتور‌های ابطالی">
          <ActionIcon
            onClick={() => {
              router.push("/cancellation-invoices");
            }}
          >
            <IconFileX size={20} />
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
