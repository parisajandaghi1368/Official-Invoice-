import React from "react";
import {
  Button,
  Divider,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { IconChevronDown, IconX } from "@tabler/icons-react";
interface ModalProps {
  opened: boolean;
  onClose: () => void;
}
export default function ModalForInvoiceExportation({
  opened,
  onClose,
}: ModalProps) {
  return (
    <Modal size={"lg"} opened={opened} onClose={onClose} p={"lg"}>
      <Stack w={"100%"} p={"lg"}>
        <Group w={"100%"} justify="space-between">
          <Text size="sm">ایجاد فاکتور دستی</Text>
          <IconX
            size={18}
            color="#667085"
            onClick={onClose}
            cursor={"pointer"}
          />
        </Group>

        <SimpleGrid
          w={"100%"}
          cols={2}
          spacing="xl"
          verticalSpacing="xl"
          pt={"lg"}
        >
          <TextInput
            label="نام کاربر"
            w={"100%"}
            leftSection={
              <>
                <UnstyledButton>ایمیل</UnstyledButton>
                <IconChevronDown color="black" />
                <Divider size="xs" orientation="vertical" />
              </>
            }
          ></TextInput>
          <TextInput label="کد پروژه"></TextInput>
          <TextInput label="تاریخ صدور"></TextInput>
          <TextInput label="شرح کالا/خدمات"></TextInput>
          <TextInput label="تعداد"></TextInput>
          <TextInput
            label="مبلغ واحد"
            rightSection={<UnstyledButton>ریال</UnstyledButton>}
          ></TextInput>
          <TextInput
            label="کد تخفیف"
            rightSection={
              <UnstyledButton style={{ color: "#4C6EF5", fontSize: 11 }}>
                ثبت‌کد
              </UnstyledButton>
            }
          ></TextInput>
          <TextInput label="نرخ مالیات بر ارزش افروده"></TextInput>
        </SimpleGrid>

        <Group w={"100%"} justify="center" align="center" pt={"xl"}>
          <Button
            w={"6.5rem"}
            h={"2rem"}
            style={{ fontSize: 14, fontWeight: 400 }}
          >
            تایید
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
