"use client";
import {
  Button,
  Flex,
  Grid,
  Group,
  Modal,
  Radio,
  Text,
  MultiSelect,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { useState } from "react";
import { filterInvoiceValidationSchema } from "../tools/schema";
import { z } from "zod";

import newClass from "../style/calender.module.css";
import { zodResolver } from "mantine-form-zod-resolver";
import CustomCalendar from "@/app/(protected)/(invoice-exportation)/components/custom-calender";

import EmailMobileAutoComplete from "./email-mobile-auto-complete";

interface ModalProps {
  opened: boolean;
  onClose: () => void;
}

export default function ModalForFilterInvoice({ opened, onClose }: ModalProps) {
  const filterForm = useForm<z.infer<typeof filterInvoiceValidationSchema>>({
    initialValues: {
      fromDate: "",
      toDate: "",
      fromPrice: [],
      toPrice: [],
      projectCode: [],
      officialInvoiceNumber: [],
      plan: [],
      company: [],
      email: [],
      mobile: [],
    },
    validateInputOnBlur: true,
    validate: zodResolver(filterInvoiceValidationSchema),
  });
  const [radioValue, setRadioValue] = useState("all invoice");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  return (
    <Modal size={"80%"} opened={opened} onClose={onClose}>
      <Grid p={"md"}>
        <Grid.Col span={2}>
          <CustomCalendar
            date={fromDate}
            setDate={setFromDate}
            label="از تاریخ"
            className={newClass["form-date"]}
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <CustomCalendar
            date={toDate}
            setDate={setToDate}
            label="تا تاریخ"
            className={newClass["to-date"]}
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <MultiSelect
            label="از قیمت"
            searchable
            maxValues={1}
            leftSectionWidth={"30%"}
            leftSection={
              <Text fz={"xs"} mr={"5px"}>
                ریال
              </Text>
            }
            withScrollArea={false}
            styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
            data={["1000", "2000", "20000", "40000"]}
            {...filterForm.getInputProps("fromPrice")}
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <MultiSelect
            label="تا قیمت"
            maxValues={1}
            data={[
              "1000",
              "2000",
              "20000",
              "40000",
              "10",
              "20",
              "20900",
              "40800",
              "76000",
              "54000",
              "23000",
              "40230",
            ]}
            leftSectionWidth={"30%"}
            leftSection={
              <Text fz={"xs"} mr={"5px"}>
                ریال
              </Text>
            }
            withScrollArea={false}
            styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
            {...filterForm.getInputProps("toPrice")}
          />
        </Grid.Col>

        <Grid.Col span={4}>
          <MultiSelect
            label={"کد پروژه"}
            maxValues={2}
            {...filterForm.getInputProps("projectCode")}
            data={["React", "Angular", "Vue", "Svelte"]}
            searchable
            withScrollArea={false}
            styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
          />
        </Grid.Col>
      </Grid>
      <Grid p={"md"}>
        <Grid.Col span={4}>
          <MultiSelect
            label="شماره فاکتور رسمی"
            maxValues={2}
            {...filterForm.getInputProps("officialInvoiceNumber")}
            data={["React", "Angular", "Vue", "Svelte"]}
            searchable
            withScrollArea={false}
            styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <MultiSelect
            label="نوع پلن"
            maxValues={2}
            {...filterForm.getInputProps("plan")}
            data={[]}
            searchable
            withScrollArea={false}
            styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
          />
        </Grid.Col>
        <Grid.Col span={4}>
          <MultiSelect
            label="نام سازمان"
            maxValues={2}
            {...filterForm.getInputProps("company")}
            data={["React", "Angular", "Vue", "Svelte"]}
            searchable
            withScrollArea={false}
            styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
          />
        </Grid.Col>
      </Grid>
      <Grid p={"md"}>
        <EmailMobileAutoComplete
          emailProp={filterForm.getInputProps("email")}
          mobileProp={filterForm.getInputProps("mobile")}
        />
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
          style={{ fontSize: 16, fontWeight: 400, color: "black" }}
          onClick={() => {
            filterForm.reset();
          }}
        >
          پاک کردن
        </Button>
        <Button>تایید</Button>
      </Group>
    </Modal>
  );
}
