import { Grid, MultiSelectProps } from "@mantine/core";
import React, { useMemo } from "react";
import AsyncMultiSelect from "./async-multi-select";
import { Invoice } from "@/shared/utils/types";

import useInvoices from "@/app/(protected)/official-invoice/hooks/use-invoices";
interface EmailMobileAutoCompleteProps {
  emailProp: MultiSelectProps;
  mobileProp: MultiSelectProps;
}
export default function EmailMobileAutoComplete({
  emailProp,
  mobileProp,
}: EmailMobileAutoCompleteProps) {
  const { invoices, isLoading } = useInvoices();
  const emails = useMemo(() => {
    const filteredEmails = invoices
      ?.map((item: Invoice) => item.client?.user?.email)
      .filter((email: string) => email !== undefined);
    console.log("filteredEmails", filteredEmails);

    return filteredEmails?.filter(
      (email: string, index: number) => filteredEmails.indexOf(email) === index
    );
  }, [invoices]);

  const mobiles = useMemo(() => {
    const filteredEmails = invoices
      ?.map((item: Invoice) => item.client?.user?.mobile)
      .filter((mobile: string) => mobile !== undefined);
    return filteredEmails?.filter(
      (mobile: string, index: number) =>
        filteredEmails.indexOf(mobile) === index
    );
  }, [invoices]);

  return (
    <>
      <Grid.Col span={4}>
        <AsyncMultiSelect
          label={"ایمیل"}
          inputProps={emailProp}
          data={emails}
          isLoading={isLoading}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <AsyncMultiSelect
          label={"شماره موبایل"}
          inputProps={mobileProp}
          data={mobiles}
          isLoading={isLoading}
        />
      </Grid.Col>
    </>
  );
}
