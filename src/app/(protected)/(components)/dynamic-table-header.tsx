"use client"

import { Center, Table } from "@mantine/core";
import React from "react";
import { TableColumns } from "./official-invoice-data";
type DynamicTableProps = {
  Columns: TableColumns[];
};
export default function DynamicTableHeader({ Columns }: DynamicTableProps) {
  return (
    <Table.Thead>
      <Table.Tr >
        {Columns.map((column, index) => {
          return (
            <Table.Th key={index} fz={'xs'} bg={'#D7E1F9'} style={{color:'#4C6EF5'}} >
              <Center >{column.columnsName}</Center>
            </Table.Th>
          );
        })}
      </Table.Tr>
    </Table.Thead>
  );
}
