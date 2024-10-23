import { Grid, MultiSelectProps, Text } from "@mantine/core";
import React, { useState } from "react";
import AsyncMultiSelect from "./async-multi-select";
import useProjectCode from "@/shared/hooks/use-project-code";
interface AutoCompleteProps {
  fromPriceProp: MultiSelectProps;
  toPriceProp: MultiSelectProps;
  projectCodeProp: MultiSelectProps;
}
export default function PriceAndProjectCodeAutoComplete({
  fromPriceProp,
  toPriceProp,
  projectCodeProp,
}: AutoCompleteProps) {
  const [searchFromPrice, setSearchFromPrice] = useState("");
  const [searchToPrice, setSearchToPrice] = useState("");
  const [searchProjectCode, setSearchProjectCode] = useState("");

  const [selectedFromPrice, setSelectedFromPrice] = useState<string[]>([]);
  const [selectedToPrice, setSelectedToPrice] = useState<string[]>([]);
  const [selectedProjectCode, setSelectedProjectCode] = useState<string[]>([]);

  const { projectCode, isLoadingProjectCode } = useProjectCode({
    searchProjectCode,
  });
  console.log("projectCode", projectCode);

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
          data={projectCode}
          isLoading={isLoadingProjectCode}
          inputProps={projectCodeProp}
          searchItem={searchProjectCode}
          setSearchItem={setSearchProjectCode}
          selectedItem={selectedProjectCode}
          setSelectedItem={setSelectedProjectCode}
        />
      </Grid.Col>
    </>
  );
}
