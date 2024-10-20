import { Grid, MultiSelectProps } from "@mantine/core";
import React, { useMemo } from "react";
import AsyncMultiSelect from "./async-multi-select";
import useOfficialInvoices from "@/app/(protected)/official-invoice/hooks/use-official-invoice";
import { Invoice } from "@/shared/utils/types";
interface EmailMobileAutoCompleteProps {
  emailProp: MultiSelectProps;
  mobileProp: MultiSelectProps;
}
export default function EmailMobileAutoComplete({
  emailProp,
  mobileProp,
}: EmailMobileAutoCompleteProps) {
  const { invoices } = useOfficialInvoices();

  const filteredEmails = invoices
    .map((item: Invoice) => item.client?.user?.email)
    .filter((email: string) => email !== undefined);

  const emails = filteredEmails.filter(
    (email: string, index: number) => filteredEmails.indexOf(email) === index
  );

  console.log("emails", emails);

  // const emails=invoices.filter((item:string)=>{item.email})
  return (
    <>
      <Grid.Col span={4}>
        <AsyncMultiSelect
          label={"ایمیل"}
          inputProps={emailProp}
          data={emails}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        {/* <AsyncMultiSelect label={"شماره موبایل"} inputProps={mobileProp} /> */}
        {/* <MultiSelect
            label="شماره موبایل"
            maxValues={2}
            {...filterForm.getInputProps("mobile")}
            data={[]}
            searchable
            withScrollArea={false}
            styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
          /> */}
      </Grid.Col>
    </>
  );
}
