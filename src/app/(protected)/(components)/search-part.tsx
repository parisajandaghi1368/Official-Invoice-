"use client";
import { Button, Divider, Flex, Group, Input } from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from "@tabler/icons-react";
import React, { useState } from "react";
import ModalForInvoiceExportation from "./overlays/modal-for-invoice-export";
import ModalForFilterInvoice from "./overlays/modal-for-filter-invoice";

export default function SearchPart() {
  const [isExportationModalOpen, setIsExportationModalOpen] = useState(false);
  const [isModalForFilterOpen, setIsModalForFilterOpen] = useState(false);

  return (
    <>
      <Group mx={"17rem"} justify="space-between">
        <Input
          rightSectionPointerEvents="auto"
          w={"40%"}
          size="md"
          placeholder="جستجو"
          rightSection={
            <Flex ml={"7rem"} justify={"center"} align={"center"} gap={"xs"}>
              <IconSearch size={18} />
              <Divider size="xs" orientation="vertical" />
              <Button
                variant="light"
                size="compact-md"
                onClick={() => {
                  setIsModalForFilterOpen(true);
                }}
                rightSection={
                  isModalForFilterOpen ? (
                    <IconChevronUp size={18} />
                  ) : (
                    <IconChevronDown size={18} />
                  )
                }
              >
                فیلترها
              </Button>
            </Flex>
          }
        />

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
      </Group>
      <ModalForInvoiceExportation
        onClose={() => setIsExportationModalOpen(false)}
        opened={isExportationModalOpen}
      />
      <ModalForFilterInvoice
        opened={isModalForFilterOpen}
        onClose={() => setIsModalForFilterOpen(false)}
      />
    </>
  );
}
