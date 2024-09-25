import { Divider, Drawer, Group, Mark, Stack, Text } from "@mantine/core";
import { IconHistory, IconX } from "@tabler/icons-react";
import React from "react";
type Drawerprops = {
  opened: boolean;
  onClose: () => void;
};
export default function InvoicesHistoryDrawer({
  opened,
  onClose,
}: Drawerprops) {
  const history = [
    {
      date: "۹۸/۰۸/۰۸ - ۱۴:۴۳",
      invoiceState: "ابطال فاکتور",
      company: "نقش اول کیفیت",
    },
    {
      date: "۹۸/۰۸/۰۸ - ۱۴:۴۳",
      invoiceState: "ابطال فاکتور",
      company: "نقش اول کیفیت",
    },
    {
      date: "۹۸/۰۸/۰۸ - ۱۴:۴۳",
      invoiceState: "ویرایش فاکتور",
      company: "نقش اول کیفیت",
    },
    {
      date: "۹۸/۰۸/۰۸ - ۱۴:۴۳",
      invoiceState: "ابطال فاکتور",
      company: "نقش اول کیفیت",
    },
    {
      date: "۹۸/۰۸/۰۸ - ۱۴:۴۳",
      invoiceState: "ابطال فاکتور",
      company: "شرکت نقش اول کیفیت گستران آفریقای مرکزی",
    },
  ];
  return (
    <Drawer.Root
      transitionProps={{
        transition: "fade-right",
      }}
      position="right"
      size={"19%"}
      opened={opened}
      onClose={onClose}
    >
      <Drawer.Overlay />
      <Drawer.Content>
        <Drawer.Header>
          <Drawer.Title>
            <Group>
              <IconHistory color="#4C6EF5" stroke={2.25} size={20} />
              <Text c={"indigo"} size="md" fw={"bold"}>
                تاریخچه
              </Text>
            </Group>
          </Drawer.Title>
          <IconX size={16} />
        </Drawer.Header>
        <Drawer.Body>
          {history.map((item, index) => (
            <Stack key={index} my={"xs"}>
              <Text>{item.date}</Text>
              <Group>
                <Text fz={"xs"} fw={"bold"} c="dimmed">
                  {item.invoiceState}
                </Text>
                <Mark
                  fz={"xs"}
                  fw={"bold"}
                  c="dimmed"
                  p={"5px"}
                  color="#F7F7F8"
                >
                  {item.company}
                </Mark>
              </Group>

              <Divider />
            </Stack>
          ))}
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}
