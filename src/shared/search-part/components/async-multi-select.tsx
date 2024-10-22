import { Loader, MultiSelect, MultiSelectProps } from "@mantine/core";

import React from "react";

interface AsyncMultiSelectProps {
  label: string;
  inputProps: MultiSelectProps;
  data: [];
  isLoading: boolean;
  leftSection?: React.ReactNode;
  searchTerm: string[];
  setSearchTerm: (term: string[]) => void;
}
export default function AsyncMultiSelect({
  label,
  inputProps,
  data,
  isLoading,
  leftSection,
  searchTerm,
  setSearchTerm,
}: AsyncMultiSelectProps) {
  return (
    <MultiSelect
      label={label}
      data={data}
      value={searchTerm}
      searchable
      withScrollArea={false}
      leftSectionWidth={leftSection ? "30%" : undefined}
      rightSection={isLoading && <Loader size={18} />}
      leftSection={leftSection}
      maxValues={2}
      {...inputProps}
      styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
      onChange={(event: string[]) => {
        setSearchTerm(event);
      }}
    />
  );
}
