import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { IconFileX, IconHistory } from "@tabler/icons-react";
import React from "react";

export default function InvoiceHistory() {
  return (
    <Group>
      <Tooltip label="فاکتور‌های ابطالی">
        <ActionIcon >
          <IconFileX size={20} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="تاریخچه">
        <ActionIcon >
          <IconHistory size={20} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}
