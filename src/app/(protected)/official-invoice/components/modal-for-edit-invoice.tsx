import { Button, Group, Modal, Text, Stack, Mark } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import React from "react";
type ModalForEditInvoiceProps = {
  opened: boolean;
  onClose: () => void;
  companyName: string;
  modalText: string;
};
export default function ModalForOperationsOnInvoices({
  opened,
  onClose,
  companyName,
  modalText,
}: ModalForEditInvoiceProps) {
  return (
    <Modal opened={opened} onClose={onClose} size={"33%"}>
      <Stack>
        <Group
          justify="center"
          align="center"
          bg={"#F7F7F8"}
          p={"md"}
          style={{ borderRadius: 6 }}
        >
          <Text>آیا از {modalText} فاکتور</Text>
          <Mark>{companyName}</Mark>
          <Text>اطمینان دارید؟</Text>
        </Group>
        <Group w={"100%"} justify="flex-end" p={"sm"}>
          <Button
            variant="white"
            style={{ fontSize: 14, fontWeight: 400, color: "black" }}
            onClick={() => {
              onClose();
            }}
          >
            انصراف
          </Button>
          <Button
            onClick={() => {
              onClose();
              notifications.show({
                message: `فاکتور مورد نظر ${
                  modalText === "صدور" ? "صادر" : modalText
                } شد!`,
                color: "green",
              });
            }}
          >
            بله
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
