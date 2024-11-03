import { Center, Table } from "@mantine/core";
import React from "react";
import ActionsComponents from "./actions-components";
import { Invoice } from "@/shared/utils/types";
type TableRowsProps = {
  item: Invoice;
  withActionsColumn: boolean;
};
export default function TableRows({
  item,
  withActionsColumn: withActionsColumn,
}: TableRowsProps) {
  return (
    <Table.Tr key={item.id} style={{ color: "#667085" }}>
      <Table.Td>
        <Center>{item.id}</Center>
      </Table.Td>
      <Table.Td>
        <Center>{item.plan?.name}</Center>
      </Table.Td>
      <Table.Td>
        <Center>{item.client?.user?.email}</Center>
      </Table.Td>
      <Table.Td>
        <Center>{item.client?.user?.mobile}</Center>
      </Table.Td>
      <Table.Td>
        <Center>{item.invoice_number}</Center>
      </Table.Td>
      <Table.Td>
        <Center>{item.client?.user?.company}</Center>
      </Table.Td>
      <Table.Td>
        <Center>{item.from_date}</Center>
      </Table.Td>
      <Table.Td>
        <Center>{item.status}</Center>
      </Table.Td>
      <Table.Td>
        <Center>{item.final_price}</Center>
      </Table.Td>
      {withActionsColumn && <ActionsComponents invoiceItem={item} />}
    </Table.Tr>
  );
}
