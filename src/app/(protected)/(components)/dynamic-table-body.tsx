import { Center, Group, Table, Tooltip, UnstyledButton } from "@mantine/core";
import {
  IconCheck,
  IconDownload,
  IconPencilMinus,
  IconXboxX,
} from "@tabler/icons-react";
import React, { useState } from "react";
import ModalForEditInvoice from "./overlays/modal-for-edit-invoice";

type DynamicTableBodyProps = {
  showLastColumn: boolean;
};
export default function DynamicTableBody({
  showLastColumn,
}: DynamicTableBodyProps) {
  const officialInvoice = [
    {
      id: 1,
      code: "1",
      plan: "نوع پلن",
      email: "ایمیل",
      mobile: "شماره موبایل",
      invoiceNum: "شماره فاکتور رسمی",
      company: "سازمان",
      date: "تاریخ صدور",
      invoiceType: "دستی",
      totalPrice: "مبلغ کل ریال",
    },
    {
      id: 2,
      code: "2",
      plan: "نوع پلن",
      email: "ایمیل",
      mobile: "شماره موبایل",
      invoiceNum: "شماره فاکتور رسمی",
      company: "سازمان",
      date: "تاریخ صدور",
      invoiceType: "آنلاین",
      totalPrice: "مبلغ کل ریال",
    },
  ];
  const [isModalForEditOpen, setIsModalForEditOpen] = useState(false);
  return (
    <>
      <Table.Tbody>
        {officialInvoice.map((item) => (
          <Table.Tr key={item.id} style={{ color: "#667085" }}>
            <Table.Td>
              <Center>{item.code}</Center>
            </Table.Td>
            <Table.Td>
              <Center>{item.plan}</Center>
            </Table.Td>
            <Table.Td>
              <Center>{item.email}</Center>
            </Table.Td>
            <Table.Td>
              <Center>{item.mobile}</Center>
            </Table.Td>
            <Table.Td>
              <Center>{item.invoiceNum}</Center>
            </Table.Td>
            <Table.Td>
              <Center>{item.company}</Center>
            </Table.Td>
            <Table.Td>
              <Center>{item.date}</Center>
            </Table.Td>
            <Table.Td>
              <Center>{item.invoiceType}</Center>
            </Table.Td>
            <Table.Td>
              <Center>{item.totalPrice}</Center>
            </Table.Td>
            {showLastColumn && (
              <Table.Td>
                {item.invoiceType === "دستی" ? (
                  <Center>
                    {" "}
                    <Group>
                      <Tooltip label={"وصول فاکتور"}>
                        <UnstyledButton>
                          <IconCheck size={20} color={"#00b341"} />
                        </UnstyledButton>
                      </Tooltip>
                      <Tooltip label={"دانلود فاکتور"}>
                        <UnstyledButton>
                          <IconDownload size={20} />
                        </UnstyledButton>
                      </Tooltip>
                      <Tooltip label={"ویرایش فاکتور"}>
                        <UnstyledButton
                          onClick={() => setIsModalForEditOpen(true)}
                        >
                          <IconPencilMinus size={20} />
                        </UnstyledButton>
                      </Tooltip>
                      <Tooltip label={"ابطال فاکتور"}>
                        <UnstyledButton>
                          <IconXboxX size={20} />
                        </UnstyledButton>
                      </Tooltip>
                    </Group>
                  </Center>
                ) : (
                  <Tooltip label={"دانلود فاکتور"}>
                    <Center>
                      {" "}
                      <UnstyledButton>
                        <IconDownload size={20} />
                      </UnstyledButton>
                    </Center>
                  </Tooltip>
                )}
              </Table.Td>
            )}
          </Table.Tr>
        ))}
        <ModalForEditInvoice
          opened={isModalForEditOpen}
          onClose={() => setIsModalForEditOpen(false)}
          company={""}
        />
      </Table.Tbody>
    </>
  );
}
