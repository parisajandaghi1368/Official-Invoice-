import { Avatar, Flex } from "@mantine/core";
import Image from "next/image";
import MapLogo from "../../../assets/map-logo.svg";
export default function Header() {
  return (
    <Flex bg={"indigo"} p={'xl'} >
      <Flex w={"100%"} justify={"space-between"} align={"center"} mx={'17rem'}>
        <Image src={MapLogo} alt="MapLogo" />
        <Avatar
          className="cursor-pointer"
          radius="xl"
          color="blue"
          variant="white"
          size={"md"}
        />
      </Flex>
    </Flex>
  );
}
