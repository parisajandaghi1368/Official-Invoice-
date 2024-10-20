"use client";
import { Button, Group, rem } from "@mantine/core";
import {} from "@tabler/icons-react";
import React, { useState } from "react";
import ModalForInvoiceExportation from "../../(invoice-exportation)/components/modal-for-invoice-export";
import SearchInput from "@/shared/search-part/search";
type SearchProps = {
  isInHomePage: boolean;
  isValidating: boolean;
};
export default function Search({ isInHomePage }: SearchProps) {
  const [isExportationModalOpen, setIsExportationModalOpen] = useState(false);

  return (
    <>
      <Group maw={rem(1161)} w={"100%"} justify="space-between">
        <SearchInput />
        {isInHomePage ? (
          <Group>
            <Button size="md" variant="outline">
              اکسل مؤدیان
            </Button>
            <Button size="md" variant="outline">
              دانلود جدول
            </Button>
            <Button
              size="md"
              variant="filled"
              onClick={() => {
                setIsExportationModalOpen(true);
              }}
            >
              صدور فاکتور
            </Button>
          </Group>
        ) : (
          <Button size="md" variant="outline">
            دانلود جدول
          </Button>
        )}
      </Group>
      <ModalForInvoiceExportation
        onClose={() => setIsExportationModalOpen(false)}
        opened={isExportationModalOpen}
      />
    </>
  );
}
