import {
  Button,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import MenuForInvoiceExportation from "./menu-for-invoice-exportation";
import RegisterDiscountCode from "../RegisterDiscountCode";

import { useForm } from "@mantine/form";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
}
export default function ModalForInvoiceExportation({
  opened,
  onClose,
}: ModalProps) {
  const invoiceExportationForm = useForm({
    initialValues: {
      userName: "",
      projectCode: "",
      exportDate: "",
      goodsDescription: "",
      count: "",
      unitPrice: "",
      discountCode: "",
      tax: "",
    },
    validateInputOnBlur: true,
    validate: {
      count: (value) => (/^\d+$/.test(value) ? null : "لطفا عدد وارد کنید!"),
    },
  });
  const handleResetDiscountCode = () => {
    invoiceExportationForm.setFieldValue("discountCode", "");
  };
  const handleDiscountError = () => {
    invoiceExportationForm.setErrors({
      discountCode: "لطفا کد تخفیف را وارد کنید!",
    });
  };

  return (
    <Modal size={"lg"} opened={opened} onClose={onClose} p={"lg"}>
      <Stack p={"lg"}>
        <Group justify="space-between">
          <Text size="sm">ایجاد فاکتور دستی</Text>
          <IconX
            size={18}
            color="#667085"
            onClick={() => {
              onClose();
              invoiceExportationForm.reset();
            }}
            cursor={"pointer"}
          />
        </Group>

        <SimpleGrid w="100%" cols={2} spacing="xl" verticalSpacing="xl" pt="lg">
          <TextInput
            label="نام کاربر"
            value={invoiceExportationForm.values.userName}
            leftSection={<MenuForInvoiceExportation />}
            leftSectionWidth={"30%"}
            {...invoiceExportationForm.getInputProps("userName")}
          ></TextInput>
          <TextInput
            label="کد پروژه"
            value={invoiceExportationForm.values.projectCode}
            {...invoiceExportationForm.getInputProps("projectCode")}
          ></TextInput>
          <TextInput
            label="تاریخ صدور"
            value={invoiceExportationForm.values.exportDate}
            {...invoiceExportationForm.getInputProps("exportDate")}
          ></TextInput>
          <TextInput
            label="شرح کالا/خدمات"
            value={invoiceExportationForm.values.goodsDescription}
            {...invoiceExportationForm.getInputProps("goodsDescription")}
          ></TextInput>
          <TextInput
            label="تعداد"
            value={invoiceExportationForm.values.count}
            {...invoiceExportationForm.getInputProps("count")}
          ></TextInput>
          <TextInput
            label="مبلغ واحد"
            value={invoiceExportationForm.values.unitPrice}
            rightSection={<Text fz={"xs"}>ریال</Text>}
            {...invoiceExportationForm.getInputProps("unitPrice")}
          ></TextInput>
          <TextInput
            label="کد تخفیف"
            value={invoiceExportationForm.values.discountCode}
            rightSection={
              <RegisterDiscountCode
                resetDiscountCode={handleResetDiscountCode}
                discountValue={invoiceExportationForm.values.discountCode}
                setDiscountError={handleDiscountError}
              />
            }
            {...invoiceExportationForm.getInputProps("discountCode")}
          ></TextInput>
          <TextInput
            value={invoiceExportationForm.values.tax}
            label="نرخ مالیات بر ارزش افزوده"
            {...invoiceExportationForm.getInputProps("tax")}
          ></TextInput>
        </SimpleGrid>

        <Group w={"100%"} justify="center" align="center" pt={"xl"}>
          <Button
            onClick={() => {
              invoiceExportationForm.reset();
              onClose();
            }}
          >
            تایید
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
