import { Button, Group, Modal, Stack, TextInput } from "@mantine/core";
import React from "react";

export default function ModalForFilterInvoice() {
  return (
    <Modal size={"80%"} opened={true} onClose={() => {}}>
      <Stack  justify="center" align="center" bg={'blue'} gap={'md'}>
        <Group>
          <TextInput w={"10.75rem"} label="از تاریخ"></TextInput>
          <TextInput w={"10.75rem"} label="تا تاریخ"></TextInput>
          <TextInput w={"10.75rem"} label="از قیمت"></TextInput>
          <TextInput w={"10.75rem"} label="تا قیمت"></TextInput>
          <TextInput w={"22.5rem"} label="کد پروژه"></TextInput>
        </Group>
        <Group>
          <TextInput w={"22.5rem"} label="شماره فاکتور رسمی"></TextInput>
          <TextInput w={"22.5rem"} label="نوع پلن"></TextInput>
          <TextInput w={"22.5rem"} label="نام سازمان"></TextInput>
        </Group>
        <Group>
          <TextInput w={"22.5rem"} label='ایمیل'></TextInput>
          <TextInput w={"22.5rem"} label='شماره موبایل'></TextInput>
          <Group w={"22.5rem"}></Group>
        </Group>
        <Group  justify="flex-end" >
          <Button></Button>
          <Button></Button>
        </Group>
      </Stack>
    </Modal>
  );
}
