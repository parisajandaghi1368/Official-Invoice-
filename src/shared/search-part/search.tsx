import ModalForFilterInvoice from "./modal-for-filter-invoice";
import { Button, Divider, Flex, Input, rem } from "@mantine/core";
import {
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from "@tabler/icons-react";
import React, { useState } from "react";

export default function SearchInput() {
  const [isModalForFilterOpen, setIsModalForFilterOpen] = useState(false);
  return (
    <>
      {" "}
      <Input
        rightSectionPointerEvents="auto"
        rightSectionWidth={rem(165)}
        w={"40%"}
        size="md"
        placeholder="جستجو"
        rightSection={
          <Flex justify={"center"} align={"center"} gap={"xs"}>
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
      />{" "}
      <ModalForFilterInvoice
        opened={isModalForFilterOpen}
        onClose={() => setIsModalForFilterOpen(false)}
      />
    </>
  );
}
