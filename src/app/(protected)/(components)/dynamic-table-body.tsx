import { Center, Group, Table, Tooltip, UnstyledButton } from "@mantine/core";
import {
  IconBan,
  IconCheck,
  IconDownload,
  IconPencilMinus,
} from "@tabler/icons-react";
import React, { useState } from "react";
import ModalForOperationsOnInvoices from "./overlays/modal-for-edit-invoice";
import ModalForDownloadInvoice from "./overlays/modal-for-download-invoice";

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
      invoiceNum: "۰۱۱۴",
      company: "نقش اول کیفیت ",
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
      invoiceNum: "۰۱۱۵",
      company: "اپل",
      date: "تاریخ صدور",
      invoiceType: "آنلاین",
      totalPrice: "مبلغ کل ریال",
    },
  ];
  const [isModalForEditOpen, setIsModalForEditOpen] = useState(false);
  const [isModalForDownloadOpen, setIsModalForDownLoadOpen] = useState(false);
  const [companyName, setCompayName] = useState("");
  const [modalText, setModalText] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
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
                        <UnstyledButton
                          onClick={() => {
                            setIsModalForDownLoadOpen(true);
                            setCompayName(item.company)
                            setInvoiceNumber(item.invoiceNum);
                          }}
                        >
                          <IconDownload size={20} />
                        </UnstyledButton>
                      </Tooltip>
                      <Tooltip label={"ویرایش فاکتور"}>
                        <UnstyledButton
                          onClick={() => {
                            setIsModalForEditOpen(true);
                            setCompayName(item.company);
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
                            setCompayName(item.company);
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
