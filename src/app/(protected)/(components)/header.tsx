import { Avatar, Flex, rem } from "@mantine/core";
import Image from "next/image";
import MapLogo from "../../../assets/map-logo.svg";
export default function Header() {
  return (
    <Flex bg={"indigo"} p={"xl"} justify={"center"}>
      <Flex
        w={"100%"}
        justify={"space-between"}
        align={"center"}
        maw={rem(1200)}
      >
        <Image src={MapLogo} alt="MapLogo" />
        <Avatar radius="xl" color="blue" variant="white" size={"md"} />
      </Flex>
    </Flex>
  );
}
