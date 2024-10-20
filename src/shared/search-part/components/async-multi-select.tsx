import { MultiSelect, MultiSelectProps } from "@mantine/core";
import React from "react";

interface AsyncMultiSelectProps {
  label: string;
  inputProps: MultiSelectProps;
  data: [];
}
export default function AsyncMultiSelect({
  label,
  inputProps,
  data,
}: AsyncMultiSelectProps) {
  return (
    <MultiSelect
      label={label}
      data={data}
      searchable
      withScrollArea={false}
      maxValues={2}
      {...inputProps}
      styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
    />
  );
}
