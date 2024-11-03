import { Center, Group, Table, Tooltip, UnstyledButton } from "@mantine/core";
import {
  IconBan,
  IconCheck,
  IconDownload,
  IconPencilMinus,
} from "@tabler/icons-react";
import React, { useState } from "react";
import ModalForDownloadInvoice from "./modal-for-download-invoice";
import ModalForOperationsOnInvoices from "./modal-for-edit-invoice";
import { Invoice } from "@/shared/utils/types";

type ActionsComponentsProp = {
  invoiceItem: Invoice;
};
export default function ActionsComponents({
  invoiceItem,
}: ActionsComponentsProp) {
  const [isModalForEditOpen, setIsModalForEditOpen] = useState(false);
  const [isModalForDownloadOpen, setIsModalForDownLoadOpen] = useState(false);
  const [companyName, setCompayName] = useState("");
  const [modalText, setModalText] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  return (
    <>
      <Table.Td>
        {invoiceItem.status === "دستی" ? (
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
                    setCompayName(invoiceItem.client.user.company);
                    setInvoiceNumber(invoiceItem.invoice_number);
                  }}
                >
                  <IconDownload size={20} />
                </UnstyledButton>
              </Tooltip>
              <Tooltip label={"ویرایش فاکتور"}>
                <UnstyledButton
                  onClick={() => {
                    setIsModalForEditOpen(true);
                    setCompayName(invoiceItem.client.user.company);
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
                    setCompayName(invoiceItem.client.user.company);
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
    </>
  );
}
