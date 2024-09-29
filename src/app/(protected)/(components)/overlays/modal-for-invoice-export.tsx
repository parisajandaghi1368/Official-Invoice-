"use client";
import {
  Button,
  Checkbox,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
} from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import MenuForInvoiceExportation from "./menu-for-invoice-exportation";
import RegisterDiscountCode from "../register-discount-code";
import { zodResolver } from "mantine-form-zod-resolver";
import { useForm } from "@mantine/form";
import { useState } from "react";
import z from "zod";
import { ExportationFormValidation } from "../(utils)/schemas";
interface ModalProps {
  opened: boolean;
  onClose: () => void;
}
export default function ModalForInvoiceExportation({
  opened,
  onClose,
}: ModalProps) {
  const [confirm, setConfirm] = useState(false);
  const [checked, setChecked] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);
  const invoiceExportationForm = useForm<
    z.infer<typeof ExportationFormValidation>
  >({
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
    validate: zodResolver(ExportationFormValidation),
  });
  const handleResetDiscountCode = () => {
    invoiceExportationForm.setFieldValue("discountCode", "");
  };
  const handleDiscountError = () => {
    invoiceExportationForm.setErrors({
      discountCode: "لطفا کد تخفیف را وارد کنید!",
    });
  };
  const handleSubmit = () => {
    const { hasErrors } = invoiceExportationForm.validate();
    if (hasErrors) return;
  };
  return (
    <>
      <Modal
        size={"lg"}
        opened={opened}
        onClose={() => {
          onClose();
        }}
        // classNames={{
        //   header: classes.header
        // }}
      >
        <Stack p={"lg"}>
          <Group justify="space-between">
            <Text size="md">ایجاد فاکتور دستی</Text>
            <UnstyledButton>
              <IconX
                size={18}
                color="#667085"
                onClick={() => {
                  onClose();
                  invoiceExportationForm.reset();
                }}
              />
            </UnstyledButton>
          </Group>

          <SimpleGrid
            w="100%"
            cols={2}
            spacing="xl"
            verticalSpacing="xl"
            pt="lg"
          >
            <TextInput
              label="نام کاربر"
              // value={invoiceExportationForm.values.userName}
              disabled={isInputDisabled}
              leftSection={<MenuForInvoiceExportation />}
              leftSectionWidth={"30%"}
              {...invoiceExportationForm.getInputProps("userName")}
            ></TextInput>
            <TextInput
              label="کد پروژه"
              disabled={isInputDisabled}
              // value={invoiceExportationForm.values.projectCode}
              {...invoiceExportationForm.getInputProps("projectCode")}
            ></TextInput>
            <TextInput
              label="تاریخ صدور"
              disabled={isInputDisabled}
              // value={invoiceExportationForm.values.exportDate}
              {...invoiceExportationForm.getInputProps("exportDate")}
            ></TextInput>
            <TextInput
              label="شرح کالا/خدمات"
              disabled={isInputDisabled}
              // value={invoiceExportationForm.values.goodsDescription}
              {...invoiceExportationForm.getInputProps("goodsDescription")}
            ></TextInput>
            <TextInput
              label="تعداد"
              disabled={isInputDisabled}
              // value={invoiceExportationForm.values.count}
              {...invoiceExportationForm.getInputProps("count")}
            ></TextInput>
            <TextInput
              label="مبلغ واحد"
              disabled={isInputDisabled}
              // value={invoiceExportationForm.values.unitPrice}
              rightSection={<Text fz={"xs"}>ریال</Text>}
              {...invoiceExportationForm.getInputProps("unitPrice")}
            ></TextInput>
            <TextInput
              label="کد تخفیف"
              disabled={isInputDisabled}
              // value={invoiceExportationForm.values.discountCode}
              rightSection={
                isInputDisabled ? (
                  <Text fz="xs" c="dimmed">
                    ثبت‌کد
                  </Text>
                ) : (
                  <RegisterDiscountCode
                    resetDiscountCode={handleResetDiscountCode}
                    discountValue={"invoiceExportationForm.values.discountCode"}
                    setDiscountError={handleDiscountError}
                  />
                )
              }
              {...invoiceExportationForm.getInputProps("discountCode")}
            ></TextInput>
            <TextInput
              // value={invoiceExportationForm.values.tax}
              disabled={isInputDisabled}
              label="نرخ مالیات بر ارزش افزوده"
              {...invoiceExportationForm.getInputProps("tax")}
            ></TextInput>
          </SimpleGrid>
          {/* {confirm && (
            <Checkbox
              label="از صدور فاکتور اطمینان دارم!"
              size="xs"
              radius={"sm"}
              mt={"md"}
              onChange={(event) => {
                setChecked(event.currentTarget.checked);
                setIsInputDisabled(!event.currentTarget.checked);
                console.log("isInputDisabled", isInputDisabled);
              }}
            />
          )} */}
          <Group w="100%" justify="center" align="center" pt="xl">
            {/* {confirm ? (
              <Group w="100%" justify="center">
                <Button
                  variant="white"
                  style={{ fontSize: 16, fontWeight: 400, color: "black" }}
                  onClick={() => {
                    setConfirm(!confirm);
                  }}
                >
                  انصراف
                </Button>
                <Button
                  disabled={!checked}
                  onClick={() => {
                    onClose();
                    invoiceExportationForm.reset();
                  }}
                >
                  صدور فاکتور
                </Button>
              </Group>
            ) : (
              <Button
                onClick={() => {
                  setConfirm(true);
                  setIsInputDisabled(true);
                }}
              >
                تایید
              </Button>
            )} */}
            <Button
              onClick={() => {
                // setConfirm(true);
                handleSubmit();
              }}
            >
              تایید
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
