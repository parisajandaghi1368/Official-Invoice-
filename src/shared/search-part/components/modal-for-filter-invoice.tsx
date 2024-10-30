"use client";
import { Button, Flex, Grid, Group, Modal, Radio } from "@mantine/core";
import { useForm } from "@mantine/form";

import { useEffect, useState } from "react";
import { z } from "zod";
import { filterInvoiceValidationSchema } from "../tools/schema";

import CustomCalendar from "@/app/(protected)/(invoice-exportation)/components/custom-calender";
import { zodResolver } from "mantine-form-zod-resolver";
import newClass from "../style/calender.module.css";

import { DateConvertor } from "@/app/(protected)/(invoice-exportation)/tools/converter-functions";
import { notifications } from "@mantine/notifications";
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

  useEffect(() => {
    const today = new Date();
    const validToDate =
      toDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0);

    if (validToDate) {
      notifications.show({
        id: "validDateInEdit",
        message: "امکان انتخاب تاریخ در گذشته وجود ندارد!",
        color: "yellow",
      });
      setToDate(today);
    }
    const validFromDate =
      fromDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0);
    if (validFromDate) {
      notifications.show({
        id: "validDateInEdit",
        message: "امکان انتخاب تاریخ در گذشته وجود ندارد!",
        color: "yellow",
      });
      setFromDate(today);
    }
  }, [fromDate, toDate]);

  const filterModalInfo = {
    fromDate: DateConvertor(fromDate),
    toDate: DateConvertor(toDate),
    company: filterForm.values.company,
    email: filterForm.values.email,
    fromPrice: filterForm.values.fromPrice,
    mobile: filterForm.values.mobile,
    officialInvoiceNumber: filterForm.values.officialInvoiceNumber,
    plan: filterForm.values.plan,
    projectCode: filterForm.values.projectCode,
    toPrice: filterForm.values.toPrice,
    valueOfRadio: radioValue,
  };

  return (
    <Modal
      size={"80%"}
      opened={opened}
      onClose={() => {
        filterForm.reset(), onClose();
      }}
    >
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
        <Button
          onClick={() => {
            console.log("filterModalInfo", filterModalInfo);
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
