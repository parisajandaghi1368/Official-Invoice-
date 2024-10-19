"use client";

import { Pagination, Stack, Table } from "@mantine/core";
import React from "react";
import { OfficialInvoiceColumns } from "./official-invoice-data";
import DynamicTableHeader from "./dynamic-table-header";

import DynamicTableBody from "./dynamic-table-body";
import { useAtom } from "jotai";
import { pageIndexAtom } from "../atom/atom";
import { Invoice } from "@/shared/utils/types";
type OfficialInvoiceTable = {
  showLastColumn: boolean;
  invoices: Invoice[];
  totalPages: number;
};
export default function OfficialInvoiceTable({
  showLastColumn = true,
  invoices,
  totalPages,
}: OfficialInvoiceTable) {
  const [pageIndex, setPageIndex] = useAtom(pageIndexAtom);
  const handlePage = (event: any) => {
    setPageIndex(event);
  };
  return (
    <Stack w={"100%"} align="center">
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
        <DynamicTableBody showLastColumn={showLastColumn} invoices={invoices} />
      </Table>
      <Pagination
        total={totalPages}
        value={pageIndex}
        onChange={handlePage}
      ></Pagination>
    </Stack>
  );
}
