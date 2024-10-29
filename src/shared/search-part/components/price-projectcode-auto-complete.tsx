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
  const [searchProjectCode, setSearchProjectCode] = useState("");

  const [selectedToPrice, setSelectedToPrice] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<string[]>([]);
  const [selectedProjectCode, setSelectedProjectCode] = useState<string[]>([]);

  const { projectCode, loadingProjectCode } = useProjectCode({
    searchProjectCode,
  });

  return (
    <>
      <Grid.Col span={2}>
        <AsyncMultiSelect
          label="از قیمت"
          inputProps={fromPriceProp}
          data={[]}
          leftSection={
            <Text fz={"xs"} mr={"5px"}>
              ریال
            </Text>
          }
          maxValue={1}
          selectedItem={selectedPrice}
          setSelectedItem={setSelectedPrice}
        />
      </Grid.Col>
      <Grid.Col span={2}>
        <AsyncMultiSelect
          label="تا قیمت"
          inputProps={toPriceProp}
          data={[]}
          leftSection={
            <Text fz={"xs"} mr={"5px"}>
              ریال
            </Text>
          }
          maxValue={1}
          selectedItem={selectedToPrice}
          setSelectedItem={setSelectedToPrice}
        />
      </Grid.Col>

      <Grid.Col span={4}>
        <AsyncMultiSelect
          label={"کد پروژه"}
          data={projectCode}
          isLoading={loadingProjectCode}
          maxValue={2}
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
