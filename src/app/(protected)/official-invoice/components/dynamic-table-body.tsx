import { Center, Group, Table, Tooltip, UnstyledButton } from "@mantine/core";
import {
  IconBan,
  IconCheck,
  IconDownload,
  IconPencilMinus,
} from "@tabler/icons-react";
import React, { useState } from "react";
import ModalForOperationsOnInvoices from "./modal-for-edit-invoice";
import ModalForDownloadInvoice from "./modal-for-download-invoice";
import { Invoice } from "@/shared/utils/types";

type DynamicTableBodyProps = {
  showLastColumn: boolean;
  invoices: Invoice[];
};
export default function DynamicTableBody({ showLastColumn, invoices }: DynamicTableBodyProps) {
  const [isModalForEditOpen, setIsModalForEditOpen] = useState(false);
  const [isModalForDownloadOpen, setIsModalForDownLoadOpen] = useState(false);
  const [companyName, setCompayName] = useState("");
  const [modalText, setModalText] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  return (
    <>
      <Table.Tbody>
        {invoices?.map((item) => (
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
            {showLastColumn && (
              <Table.Td>
                {item.status === "دستی" ? (
                  <Center>
                    {" "}
                    <Group>
                      <Tooltip label={"وصول فاکتور"}>
                        <UnstyledButton>
                          <IconCheck size={20} color={"#00b341"} />
                        </UnstyledButton>
                      </Tooltip>
                      <Tooltip label={"دانلود فاکتور"}>
                        <UnstyledButton
                          onClick={() => {
                            setIsModalForDownLoadOpen(true);
                            setCompayName(item.client.user.company);
                            setInvoiceNumber(item.invoice_number);
                          }}
                        >
                          <IconDownload size={20} />
                        </UnstyledButton>
                      </Tooltip>
                      <Tooltip label={"ویرایش فاکتور"}>
                        <UnstyledButton
                          onClick={() => {
                            setIsModalForEditOpen(true);
                            setCompayName(item.client.user.company);
                            setModalText("ویرایش");
                          }}
                        >
                          <IconPencilMinus size={20} />
                        </UnstyledButton>
                      </Tooltip>
                      <Tooltip label={"ابطال فاکتور"}>
                        <UnstyledButton
                          onClick={() => {
                            setIsModalForEditOpen(true);
                            setCompayName(item.client.user.company);
                            setModalText("ابطال");
                          }}
                        >
                          <IconBan size={20} />
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
        <ModalForDownloadInvoice
          opened={isModalForDownloadOpen}
          companyName={companyName}
          invoiceNumber={invoiceNumber}
          onClose={() => {
            setIsModalForDownLoadOpen(false);
          }}
        />
        <ModalForOperationsOnInvoices
          opened={isModalForEditOpen}
          onClose={() => setIsModalForEditOpen(false)}
          companyName={companyName}
          modalText={modalText}
        />
      </Table.Tbody>
    </>
  );
}
