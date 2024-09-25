"use client";
import { Divider, Flex, Menu, UnstyledButton } from "@mantine/core";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import React, { useState } from "react";
import { MenuItem } from "@/shared/constants/overlays-constant";
export default function MenuForInvoiceExportation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState("ایمیل");
  return (
    <Menu
      offset={{ mainAxis: 14, crossAxis: -5 }}
      onClose={() => setIsMenuOpen(false)}
      opened={isMenuOpen}
    >
      <Menu.Target>
        <Flex onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <UnstyledButton ml={"md"}>{userName}</UnstyledButton>
          {isMenuOpen ? (
            <UnstyledButton
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconChevronUp size={18} color="black" />
            </UnstyledButton>
          ) : (
            <UnstyledButton
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconChevronDown size={18} color="black" />
            </UnstyledButton>
          )}

          <Divider size="xs" orientation="vertical" />
        </Flex>
      </Menu.Target>
      <Menu.Dropdown>
        {MenuItem.map((item, index) => (
          <Menu.Item
            key={index}
            fz={item.fz}
            onClick={() => {
              setUserName(item.content);
            }}
          >
            {item.content}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
