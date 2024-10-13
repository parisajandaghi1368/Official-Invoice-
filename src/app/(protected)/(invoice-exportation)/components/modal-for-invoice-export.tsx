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
import RegisterDiscountCode from "./register-discount-code";
import { zodResolver } from "mantine-form-zod-resolver";
import { useForm } from "@mantine/form";
import newClass from "../style/calender.module.css";
import z from "zod";
import { exportationFormValidationSchema } from "../tools/schema";
import CustomCalendar, { DateFormatter } from "./custom-calender";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";

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
  const [date, setDate] = useState(new Date());

  const today = new Date();
  useEffect(() => {
    const validDate = date.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0);

    if (validDate) {
      notifications.show({
        id: "validdate",
        message: "امکان انتخاب تاریخ در گذشته وجود ندارد!",
        color: "yellow",
      });
      setDate(today);
    }
  }, [date]);
  // const formattedDate = DateFormatter(date);

  const invoiceExportationForm = useForm<
    z.infer<typeof exportationFormValidationSchema>
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
    validate: zodResolver(exportationFormValidationSchema),
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
    setConfirm(true);
  };
  useEffect(() => {
    if (!opened) invoiceExportationForm.reset();
  }, [invoiceExportationForm, opened]);
  return (
    <>
      <Modal
        size={"lg"}
        opened={opened}
        onClose={() => {
          onClose();
        }}
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
              leftSection={<MenuForInvoiceExportation />}
              leftSectionWidth={"30%"}
              {...invoiceExportationForm.getInputProps("userName")}
            ></TextInput>
            <TextInput
              label="کد پروژه"
              {...invoiceExportationForm.getInputProps("projectCode")}
            ></TextInput>

            <CustomCalendar
              date={date}
              setDate={setDate}
              className={newClass["limitation-date"]}
              label=" محدودیت تاریخ"
            />
            <TextInput
              label="شرح کالا/خدمات"
              {...invoiceExportationForm.getInputProps("goodsDescription")}
            ></TextInput>
            <TextInput
              label="تعداد"
              {...invoiceExportationForm.getInputProps("count")}
            ></TextInput>
            <TextInput
              label="مبلغ واحد"
              rightSection={<Text fz={"xs"}>ریال</Text>}
              {...invoiceExportationForm.getInputProps("unitPrice")}
            ></TextInput>
            <TextInput
              label="کد تخفیف"
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
              label="نرخ مالیات بر ارزش افزوده"
              {...invoiceExportationForm.getInputProps("tax")}
            ></TextInput>
          </SimpleGrid>
          {confirm && (
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
          )}
          <Group w="100%" justify="center" align="center" pt="xl">
            {confirm ? (
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
                  // setConfirm(true);
                  // setIsInputDisabled(true);
                  handleSubmit();
                }}
              >
                تایید
              </Button>
            )}
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
