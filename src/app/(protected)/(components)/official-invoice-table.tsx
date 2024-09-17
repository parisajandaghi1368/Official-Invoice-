"use client";

import { Table } from "@mantine/core";
import React from "react";
import { OfficialInvoiceColumns } from "./official-invoice-data";
import DynamicTableHeader from "./dynamic-table-header";
export default function OfficialInvoiceTable() {
  return (
    <Table
      borderColor="#D0D5DD"
      withTableBorder
      withColumnBorders
      withRowBorders
      highlightOnHover
      
    >
      <DynamicTableHeader Columns={OfficialInvoiceColumns} />
      <Table.Tbody></Table.Tbody>
    </Table>
  );
}
