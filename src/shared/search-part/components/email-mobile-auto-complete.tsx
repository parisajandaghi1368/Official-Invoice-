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
  const [searchEmail, setSearchEmail] = useState("");
  const [searchMobile, setSearchMobile] = useState("");
  const [selectedMobile, setSelectedMobile] = useState<string[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<string[]>([]);

  const { emails, isLoading } = useEmails({ searchEmail });
  const { mobiles } = useMobiles({ searchMobile });

  return (
    <>
      <Grid.Col span={4}>
        <AsyncMultiSelect
          label={"ایمیل"}
          inputProps={emailProp}
          data={emails}
          isLoading={isLoading}
          selectedItem={selectedEmail}
          setSelectedItem={setSelectedEmail}
          searchItem={searchEmail}
          setSearchItem={setSearchEmail}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <AsyncMultiSelect
          label={"شماره موبایل"}
          inputProps={mobileProp}
          data={mobiles}
          isLoading={isLoading}
          selectedItem={selectedMobile}
          setSelectedItem={setSelectedMobile}
          searchItem={searchMobile}
          setSearchItem={setSearchMobile}
        />
      </Grid.Col>
    </>
  );
}
