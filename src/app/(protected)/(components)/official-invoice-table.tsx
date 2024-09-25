"use client";

import { Pagination, Stack, Table } from "@mantine/core";
import React from "react";
import { OfficialInvoiceColumns } from "./official-invoice-data";
import DynamicTableHeader from "./dynamic-table-header";

import DynamicTableBody from "./dynamic-table-body";
type OfficialInvoiceTable = {
  showLastColumn: boolean;
};
export default function OfficialInvoiceTable({
  showLastColumn = true,
}: OfficialInvoiceTable) {
  return (
    <Stack w={"100%"} gap={550} align="center">
      <Table
        borderColor="#D0D5DD"
        withTableBorder
        withColumnBorders
        withRowBorders
        highlightOnHover
      >
        <DynamicTableHeader
          columns={OfficialInvoiceColumns}
          showLastColumn={showLastColumn}
        />
        <DynamicTableBody showLastColumn={showLastColumn} />
      </Table>
      <Pagination total={8}> </Pagination>
    </Stack>
  );
}
