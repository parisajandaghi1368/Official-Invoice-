import { urls } from "@/shared/config/urls";
import useMyself from "@/shared/hooks/use-myself";
import useToken from "@/shared/hooks/use-token";
import { getCommonHeaders } from "@/shared/utils/fetch-helpers";
import {
  Button,
  Flex,
  Group,
  Modal,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import axios from "axios";
import { ChangeEvent } from "react";
import { z } from "zod";
import { changePasswordValidationSchema } from "../tools/schema";
import ChangingPasswordInput from "./changing-password-input";

type ModalForChangingPasswordProps = {
  onClose: () => void;
  opened: boolean;
};

export default function ModalForChangingPassword({
  onClose,
  opened,
}: ModalForChangingPasswordProps) {
  const { token: userToken } = useToken();
  const { user } = useMyself();

  const form = useForm<z.infer<typeof changePasswordValidationSchema>>({
    initialValues: {
      current_password: "",
      old_password: "",
    },
    validateInputOnBlur: true,
    validate: zodResolver(changePasswordValidationSchema),
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
        notifications.show({
          message: "رمز عبور با موفقیت تغییر کرد!",
          color: "green",
        });
        onClose();
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
  // useEffect(() => {
  //   if (!opened) form.reset();
  // }, [form, opened]);
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

        <Flex justify={"space-around"}>
          <ChangingPasswordInput
            label="رمز عبور فعلی"
            inputProp={form.getInputProps("old_password")}
            inputValue={form.values.old_password}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              form.setFieldValue("old_password", event.target.value)
            }
          />
          <ChangingPasswordInput
            label="رمز عبور جدید"
            inputValue={form.values.current_password}
            inputProp={form.getInputProps("current_password")}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              form.setFieldValue("current_password", event.target.value)
            }
          />
        </Flex>
        <Group justify="flex-end" ml={"xl"} py={"lg"}>
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
