import { Grid, MultiSelectProps, Text } from "@mantine/core";
import React from "react";
import AsyncMultiSelect from "./async-multi-select";
interface PriceProjectCodeAutoComplete {
  fromPriceProp: MultiSelectProps;
  toPriceProp: MultiSelectProps;
  projectCodeProp: MultiSelectProps;
}
export default function PriceProjectCodeAutoComplete({
  fromPriceProp,
  toPriceProp,
  projectCodeProp,
}: PriceProjectCodeAutoComplete) {
  return (
    <>
      <Grid.Col span={2}>
        <AsyncMultiSelect
          label="از قیمت"
          inputProps={fromPriceProp}
          data={[]}
          isLoading={true}
          leftSection={
            <Text fz={"xs"} mr={"5px"}>
              ریال
            </Text>
          }
        />
      </Grid.Col>
      <Grid.Col span={2}>
        <AsyncMultiSelect
          label="تا قیمت"
          inputProps={toPriceProp}
          data={[]}
          isLoading={true}
          leftSection={
            <Text fz={"xs"} mr={"5px"}>
              ریال
            </Text>
          }
        />
      </Grid.Col>

      <Grid.Col span={4}>
        <AsyncMultiSelect
          label={"کد پروژه"}
          data={[]}
          isLoading={true}
          inputProps={projectCodeProp}
        />
      </Grid.Col>
    </>
  );
}
