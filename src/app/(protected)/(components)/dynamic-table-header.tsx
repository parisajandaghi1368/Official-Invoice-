"use client";

import { Center, Table } from "@mantine/core";
import React from "react";
import { TableColumns } from "./official-invoice-data";
type DynamicTableProps = {
  columns: TableColumns[];
  showLastColumn: boolean;
};
export default function DynamicTableHeader({
  columns,
  showLastColumn = true,
}: DynamicTableProps) {
  const filteredColumns = showLastColumn ? columns : columns.slice(0, -1);
  return (
    <Table.Thead>
      <Table.Tr>
        {filteredColumns.map((column, index) => {
          return (
            <Table.Th
              key={index}
              fz={"sm"}
              bg={"#D7E1F9"}
              style={{ color: "#4C6EF5" }}
            >
              <Center>{column.columnsName}</Center>
            </Table.Th>
          );
        })}
      </Table.Tr>
    </Table.Thead>
  );
}
