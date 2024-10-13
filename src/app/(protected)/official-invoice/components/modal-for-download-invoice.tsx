import {
  Button,
  Group,
  Mark,
  Modal,
  Stack,
  Text,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { IconCopy, IconX } from "@tabler/icons-react";
import React from "react";
type ModalForDownloadInvoiceProps = {
  opened: boolean;
  onClose: () => void;
  companyName: string;
  invoiceNumber: string;
};
export default function ModalForDownloadInvoice({
  opened,
  onClose,
  companyName,
  invoiceNumber,
}: ModalForDownloadInvoiceProps) {
  return (
    <Modal opened={opened} onClose={onClose} size={"30%"}>
      <Stack gap={"xl"}>
        <Group justify="space-between">
          <Text size="md">ایجاد سریال فاکتور</Text>
          <UnstyledButton>
            <IconX size={18} onClick={() => onClose()} />
          </UnstyledButton>
        </Group>
        <Stack bg={"#F7F7F8"} p={"lg"} align="center">
          <Group>
            <Text>شماره فاکتور رسمی</Text>
            <Mark>{companyName}</Mark>
            <Text>:</Text>
          </Group>
          <Button mah={rem(50)} variant="outline" rightSection={<IconCopy />}>
            {invoiceNumber}
          </Button>
        </Stack>
        <Group justify="flex-end">
          <Button>دانلود‌ فاکتور</Button>
        </Group>
      </Stack>
    </Modal>
  );
}
