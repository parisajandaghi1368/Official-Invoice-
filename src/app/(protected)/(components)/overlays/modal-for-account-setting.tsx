import {
  Button,
  Group,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { IconX } from "@tabler/icons-react";
import React from "react";
import { z } from "zod";
import { ChangePasswordValidation } from "../../(utils)/schemas";
import useToken from "@/shared/hooks/use-token";
import axios from "axios";
import { urls } from "@/shared/config/urls";
import useUser from "@/shared/hooks/use-user";
import { getCommonHeaders } from "@/shared/utils/fetch-helpers";
import { notifications } from "@mantine/notifications";
import ChangingPasswordInput from "../changing-password-input";
type ModalForChangingPasswordProps = {
  onClose: () => void;
  opened: boolean;
};
export default function ModalForChangingPassword({
  onClose,
  opened,
}: ModalForChangingPasswordProps) {
  const { token: userToken } = useToken();
  const { user } = useUser();
  const form = useForm<z.infer<typeof ChangePasswordValidation>>({
    initialValues: {
      current_password: "",
      old_password: "",
    },
    validateInputOnBlur: true,
    validate: zodResolver(ChangePasswordValidation),
  });
  const passwordInfo = {
    current_password: form.values.current_password,
    old_password: form.values.old_password,
  };

  async function changePassword() {
    if (!userToken) return null;
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      console.log({ passwordInfo });
      try {
        await axios.patch(`${urls.users}/${user?.id}`, passwordInfo, {
          headers: getCommonHeaders({ token: userToken }),
        });
      } catch (error) {
        notifications.show({
          message: "متاسفانه مشکلی پیش آمده است!",
          color: "red",
        });
      }
    } else {
      notifications.show({
        message: "لطفا همه اطلاعات را تکمیل کنید!",
        color: "yellow",
      });
    }
  }
  return (
    <Modal onClose={onClose} opened={opened} size={"xl"}>
      <Stack gap="lg">
        <Group justify="space-between">
          <Text>تغییر رمز عبور</Text>
          <UnstyledButton>
            <IconX
              size={18}
              onClick={() => {
                onClose();
              }}
            />
          </UnstyledButton>
        </Group>
        <SimpleGrid cols={2}>
          <ChangingPasswordInput
            label="رمز عبور فعلی"
            inputProp={form.getInputProps("old_password")}
            inputValue={form.values.old_password}
            onChange={(event: any) =>
              form.setFieldValue("old_password", event.target.value)
            }
          />
          <ChangingPasswordInput
            label="رمز عبور جدید"
            inputValue={form.values.current_password}
            inputProp={form.getInputProps("current_password")}
            onChange={(event: any) =>
              form.setFieldValue("current_password", event.target.value)
            }
          />
        </SimpleGrid>
        <Group justify="flex-end" align="center" px={"xl"} py={"lg"}>
          <Button
            onClick={() => {
              changePassword();
            }}
          >
            تایید
          </Button>
          <Button onClick={onClose}>انصراف</Button>
        </Group>
      </Stack>
    </Modal>
  );
}
