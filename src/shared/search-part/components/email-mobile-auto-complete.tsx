import { Grid, MultiSelectProps } from "@mantine/core";
import React, { useState } from "react";
import AsyncMultiSelect from "./async-multi-select";
import { useEmails } from "@/shared/hooks/use-emails";
import { useMobiles } from "@/shared/hooks/use-mobiles";

interface AutoCompleteprops {
  emailProp: MultiSelectProps;
  mobileProp: MultiSelectProps;
}
export default function EmailAndMobileAutoComplete({
  emailProp,
  mobileProp,
}: AutoCompleteprops) {
  const [searchEmail, setSearchEmail] = useState<string[]>([]);
  const [searchMobile, setSearchMobile] = useState<string[]>([]);
  const { emails, isLoading } = useEmails({ searchEmail });
  const { mobiles } = useMobiles({ searchMobile });
  console.log("emails", emails);

  return (
    <>
      <Grid.Col span={4}>
        <AsyncMultiSelect
          label={"ایمیل"}
          inputProps={emailProp}
          data={emails}
          isLoading={isLoading}
          searchTerm={searchEmail}
          setSearchTerm={setSearchEmail}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <AsyncMultiSelect
          label={"شماره موبایل"}
          inputProps={mobileProp}
          data={mobiles}
          isLoading={isLoading}
          searchTerm={searchMobile}
          setSearchTerm={setSearchMobile}
        />
      </Grid.Col>
    </>
  );
}
