import { Loader, MultiSelect, MultiSelectProps } from "@mantine/core";

import React from "react";

interface AsyncMultiSelectProps {
  label: string;
  inputProps: MultiSelectProps;
  data: [];
  isLoading?: boolean;
  leftSection?: React.ReactNode;
  selectedItem: string[];
  setSelectedItem: (selected: string[]) => void;
  searchItem?: string;
  setSearchItem?: (item: string) => void;
  maxValue: number;
}

export default function AsyncMultiSelect({
  label,
  inputProps,
  data,
  isLoading,
  leftSection,
  selectedItem,
  setSelectedItem,
  searchItem,
  setSearchItem,
  maxValue,
}: AsyncMultiSelectProps) {
  return (
    <MultiSelect
      label={label}
      data={data}
      value={selectedItem}
      withScrollArea={false}
      leftSectionWidth={leftSection ? "30%" : undefined}
      rightSection={isLoading && <Loader size={18} />}
      leftSection={leftSection}
      maxValues={maxValue}
      searchValue={searchItem}
      onSearchChange={setSearchItem}
      searchable
      onChange={setSelectedItem}
      // nothingFoundMessage={
      //   (data ?? []).length === 0 && "موردی برای نمایش یافت نشد!"
      // }
      defaultDropdownOpened={data?.length === 0 && false}
      {...inputProps}
      styles={{ dropdown: { maxHeight: 200, overflowY: "auto" } }}
    />
  );
}
