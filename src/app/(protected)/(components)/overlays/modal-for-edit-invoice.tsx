import { Button, Group, Modal, Text, Stack } from "@mantine/core";
import React from "react";
type ModalForEditInvoiceProps = {
  opened: boolean;
  onClose: () => void;
};
export default function ModalForEditInvoice({
  opened,
  onClose,
}: ModalForEditInvoiceProps) {
  return (
    <Modal opened={opened} onClose={onClose} size={"md"}>
      <Stack>
        <Group justify="center" align="center">
          <Text>آیا از ویرایش فاکتور</Text>
          <Text></Text>
          <Text>اطمینان دارید؟</Text>
        </Group>
        <Group w={"100%"} justify="flex-end" mt={"xl"} p={"md"}>
          <Button
            variant="white"
            style={{ fontSize: 14, fontWeight: 400, color: "black" }}
          >
            انصراف
          </Button>
          <Button>بله</Button>
        </Group>
      </Stack>
    </Modal>
  );
}
