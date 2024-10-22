import { Grid, MultiSelectProps } from "@mantine/core";
import React from "react";
import AsyncMultiSelect from "./async-multi-select";
interface AutoCompleteProps {
  invoiceNumProp: MultiSelectProps;
  companyNameProp: MultiSelectProps;
  planNameProp: MultiSelectProps;
}
export default function InvoiceNumAndCompanyAutoComplete({
  invoiceNumProp,
  companyNameProp,
  planNameProp,
}: AutoCompleteProps) {
  return (
    <>
      <Grid.Col span={4}>
        <AsyncMultiSelect
          label="شماره فاکتور رسمی"
          inputProps={invoiceNumProp}
          data={[]}
          isLoading={true}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <AsyncMultiSelect
          label="نوع پلن"
          inputProps={companyNameProp}
          data={[]}
          isLoading={true}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <AsyncMultiSelect
          label="نام سازمان"
          inputProps={planNameProp}
          data={[]}
          isLoading={true}
        />
      </Grid.Col>
    </>
  );
}
