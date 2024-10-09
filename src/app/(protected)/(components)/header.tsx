"use client";
import { Avatar, Flex, Menu, UnstyledButton, rem } from "@mantine/core";
import Image from "next/image";
import MapLogo from "../../../assets/map-logo.svg";
import { IconLogout, IconSettings } from "@tabler/icons-react";
import useLogout from "../../../shared/hooks/use-logout";
import { useRouter } from "next/navigation";
export default function Header() {
  const logOut = useLogout();
  const router = useRouter();
  return (
    <Flex bg={"indigo"} p={"xl"} justify={"center"}>
      <Flex
        w={"100%"}
        justify={"space-between"}
        align={"center"}
        maw={rem(1200)}
      >
        <Image src={MapLogo} alt="MapLogo" />
        <Menu
          width={rem(150)}
          shadow="md"
          position="bottom-start"
          offset={2}
          withArrow
          arrowPosition="center"
        >
          <Menu.Target>
            <UnstyledButton>
              <Avatar radius="xl" color="blue" variant="white" size={"md"} />
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              leftSection={<IconSettings size={15} />}
              onClick={() => router.push("/user-profile")}
            >
              تنظیمات
            </Menu.Item>
            <Menu.Item leftSection={<IconLogout size={15} />} onClick={logOut}>
              خروج
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
    </Flex>
  );
}
