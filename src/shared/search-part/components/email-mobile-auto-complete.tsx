import { useEmails } from "@/shared/hooks/use-emails";
import { useMobiles } from "@/shared/hooks/use-mobiles";
import { Grid, MultiSelectProps } from "@mantine/core";
import { useState } from "react";
import AsyncMultiSelect from "./async-multi-select";

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

  const { emails, emailLoading } = useEmails({ searchEmail });
  const { mobiles, mobileLoading } = useMobiles({ searchMobile });

  return (
    <>
      <Grid.Col span={4}>
        <AsyncMultiSelect
          label={"ایمیل"}
          inputProps={emailProp}
          data={emails}
          isLoading={emailLoading}
          selectedItem={selectedEmail}
          setSelectedItem={setSelectedEmail}
          searchItem={searchEmail}
          setSearchItem={setSearchEmail}
          maxValue={2}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <AsyncMultiSelect
          label={"شماره موبایل"}
          inputProps={mobileProp}
          data={mobiles}
          isLoading={mobileLoading}
          selectedItem={selectedMobile}
          setSelectedItem={setSelectedMobile}
          searchItem={searchMobile}
          setSearchItem={setSearchMobile}
          maxValue={2}
        />
      </Grid.Col>
    </>
  );
}
