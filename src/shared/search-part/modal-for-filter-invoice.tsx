"use client";
import {
  Button,
  Flex,
  Grid,
  Group,
  Modal,
  Radio,
  TextInput,
  Text,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";
interface ModalProps {
  opened: boolean;
  onClose: () => void;
}
export default function ModalForFilterInvoice({ opened, onClose }: ModalProps) {
  const filterForm = useForm({
    initialValues: {
      fromDate: "",
      toDate: "",
      fromPrice: "",
      toPrice: "",
      projectCode: "",
      officialInvoiceNumber: "",
      plane: "",
      company: "",
      email: "",
      mobile: "",
    },
    validateInputOnBlur: true,
    validate: {},
  });
  const [radioValue, setRadioValue] = useState("all invoice");

  return (
    <Modal size={"80%"} opened={opened} onClose={onClose}>
      <Grid p={"md"}>
        <Grid.Col span={2}>
          <TextInput
            label="از تاریخ"
            leftSection={
              <IconX
                size={16}
                onClick={() => {
                  console.log("filterForm.key", filterForm);
                }}
              />
            }
            {...filterForm.getInputProps("fromDate")}
          ></TextInput>
        </Grid.Col>
        <Grid.Col span={2}>
          <TextInput
            label="تا تاریخ"
            {...filterForm.getInputProps("toDate")}
          ></TextInput>
        </Grid.Col>
        <Grid.Col span={2}>
          <TextInput
            label="از قیمت"
            leftSection={<Text fz={"xs"}>ریال</Text>}
            {...filterForm.getInputProps("fromPrice")}
          ></TextInput>
        </Grid.Col>
        <Grid.Col span={2}>
          <TextInput
            label="تا قیمت"
            leftSection={<Text fz={"xs"}>ریال</Text>}
            {...filterForm.getInputProps("toPrice")}
          ></TextInput>
        </Grid.Col>

        <Grid.Col span={4}>
          <TextInput
            label={"کد پروژه"}
            {...filterForm.getInputProps("projectCode")}
          ></TextInput>
        </Grid.Col>
      </Grid>
      <Grid p={"md"}>
        <Grid.Col span={4}>
          <TextInput
            label="شماره فاکتور رسمی"
            {...filterForm.getInputProps("officialInvoiceNumber")}
          ></TextInput>
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            label="نوع پلن"
            {...filterForm.getInputProps("plane")}
          ></TextInput>
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            label="نام سازمان"
            {...filterForm.getInputProps("company")}
          ></TextInput>
        </Grid.Col>
      </Grid>
      <Grid p={"md"}>
        <Grid.Col span={4}>
          <TextInput
            label="ایمیل"
            {...filterForm.getInputProps("email")}
          ></TextInput>
        </Grid.Col>
        <Grid.Col span={4}>
          <TextInput
            label="شماره موبایل"
            {...filterForm.getInputProps("mobile")}
          ></TextInput>
        </Grid.Col>
        <Grid.Col span={4}>
          <Radio.Group value={radioValue} onChange={setRadioValue}>
            <Flex justify="flex-start" align="center" gap={"xl"} mt={"xl"}>
              <Radio label="همه فاکتورها" value={"all invoice"} />
              <Radio label="فاکتورهای دستی" value={"manual invoice"} />
              <Radio label="فاکتورهای آنلاین" value={"online invoice"} />
            </Flex>
          </Radio.Group>
        </Grid.Col>
      </Grid>
      <Group w={"100%"} justify="flex-end" mt={"xl"} p={"md"}>
        <Button
          variant="white"
          style={{ fontSize: 14, fontWeight: 400, color: "black" }}
          onClick={() => {
            filterForm.reset();
          }}
        >
          پاک کردن
        </Button>
        <Button
          onClick={() => {
            filterForm.reset();
            onClose();
          }}
        >
          تایید
        </Button>
      </Group>
    </Modal>
  );
}
