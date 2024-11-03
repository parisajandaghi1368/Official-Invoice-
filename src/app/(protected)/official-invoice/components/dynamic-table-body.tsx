import { Invoice } from "@/shared/utils/types";
import { Table } from "@mantine/core";
import TableRows from "./table-rows";

type DynamicTableBodyProps = {
  withActionsColumn: boolean;
  invoices: Invoice[];
};
export default function DynamicTableBody({
  withActionsColumn,
  invoices,
}: DynamicTableBodyProps) {
  return (
    <>
      <Table.Tbody>
        {invoices?.map((item) => (
          <TableRows
            item={item}
            key={item.id}
            withActionsColumn={withActionsColumn}
          />
        ))}
      </Table.Tbody>
    </>
  );
}
