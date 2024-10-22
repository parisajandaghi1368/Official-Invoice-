"use client";
import { Button, Flex, Grid, Group, Modal, Radio } from "@mantine/core";
import { useForm } from "@mantine/form";

import { useState } from "react";
import { filterInvoiceValidationSchema } from "../tools/schema";
import { z } from "zod";

import newClass from "../style/calender.module.css";
import { zodResolver } from "mantine-form-zod-resolver";
import CustomCalendar from "@/app/(protected)/(invoice-exportation)/components/custom-calender";

import EmailAndMobileAutoComplete from "./email-mobile-auto-complete";
import InvoiceNumAndCompanyAutoComplete from "./invoicenum-company-plan-auto-complete";
import PriceAndProjectCodeAutoComplete from "./price-projectcode-auto-complete";

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
        <PriceAndProjectCodeAutoComplete
          fromPriceProp={filterForm.getInputProps("fromPrice")}
          toPriceProp={filterForm.getInputProps("toPrice")}
          projectCodeProp={filterForm.getInputProps("projectCode")}
        />
      </Grid>
      <Grid p={"md"}>
        <InvoiceNumAndCompanyAutoComplete
          invoiceNumProp={filterForm.getInputProps("officialInvoiceNumber")}
          companyNameProp={filterForm.getInputProps("company")}
          planNameProp={filterForm.getInputProps("plan")}
        />
      </Grid>
      <Grid p={"md"}>
        <EmailAndMobileAutoComplete
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
