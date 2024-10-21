import { Loader, MultiSelect, MultiSelectProps } from "@mantine/core";

import React from "react";

interface AsyncMultiSelectProps {
  label: string;
  inputProps: MultiSelectProps;
  data: [];
  isLoading: boolean;
  leftSection?: React.ReactNode;
}
export default function AsyncMultiSelect({
  label,
  inputProps,
  data,
  isLoading,
  leftSection,
}: AsyncMultiSelectProps) {
  return (
    <MultiSelect
      label={label}
      data={data}
      searchable
      withScrollArea={false}
      leftSectionWidth={leftSection ? "30%" : undefined}
      rightSection={isLoading && <Loader size={18} />}
      leftSection={leftSection}
      maxValues={2}
      {...inputProps}
      styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
    />
  );
}
