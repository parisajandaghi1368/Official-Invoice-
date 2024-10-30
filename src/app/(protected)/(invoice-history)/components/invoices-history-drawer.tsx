import { Invoice } from "@/shared/utils/types";
import {
  Divider,
  Drawer,
  Group,
  Mark,
  Pagination,
  Stack,
  Text,
} from "@mantine/core";
import { IconHistory, IconX } from "@tabler/icons-react";

import {
  convertPersianToIso,
  replaceEnglishNumbers,
} from "../../(invoice-exportation)/tools/converter-functions";
import { useHistories } from "@/shared/hooks/use-history";
import { pageIndexAtom } from "../../official-invoice/atom/atom";
import { useAtom } from "jotai";
import { ITEMS_PER_PAGE } from "@/shared/constants/overlays-constant";
type Drawerprops = {
  opened: boolean;
  onClose: () => void;
};
export default function InvoicesHistoryDrawer({
  opened,
  onClose,
}: Drawerprops) {
  const { data, totalPage } = useHistories();
  const [pageIndex, setPageIndex] = useAtom(pageIndexAtom);
  const handlePage = (newPageIndex: number) => {
    setPageIndex(newPageIndex);
  };
  const totalPages = Math.floor(totalPage / ITEMS_PER_PAGE);

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
          {data?.map((item: Invoice, index: string) => {
            const englishToPersianNumber = replaceEnglishNumbers(
              item.created_at
            );
            const persianToIsoDate = convertPersianToIso(
              englishToPersianNumber
            );
            return (
              <Stack key={index} my={"xs"}>
                <Text>{persianToIsoDate}</Text>
                <Group>
                  <Text fz={"xs"} fw={"bold"} c="dimmed">
                    {item?.client?.user.name}
                  </Text>

                  {item?.client?.user?.company && (
                    <Mark
                      fz={"xs"}
                      fw={"bold"}
                      c="dimmed"
                      p={"5px"}
                      color="#F7F7F8"
                    >
                      {item?.client?.user?.company}
                    </Mark>
                  )}
                </Group>

                <Divider />
                {totalPages > 0 && (
                  <Pagination
                    total={totalPages}
                    value={pageIndex}
                    onChange={handlePage}
                  />
                )}
              </Stack>
            );
          })}
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}
