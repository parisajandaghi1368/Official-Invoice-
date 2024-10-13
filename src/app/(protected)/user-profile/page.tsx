"use client";
import PasswordInput from "@/app/(unprotected)/(components)/password-input";
import {
  Stack,
  rem,
  Text,
  Paper,
  TextInput,
  Group,
  Button,
} from "@mantine/core";
import React, { ChangeEvent, useState } from "react";
import ModalForChangingPassword from "./components/modal-for-changing-password";
import classes from "./style/style.module.css";
import { useForm } from "@mantine/form";
import useUser from "@/shared/hooks/use-user";
import useToken from "@/shared/hooks/use-token";
import axios from "axios";
import { urls } from "@/shared/config/urls";
import { getCommonHeaders } from "@/shared/utils/fetch-helpers";
import { notifications } from "@mantine/notifications";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";
import { userProfileValidationSchema } from "./tools/schema";
export default function UserProfile() {
  const { user } = useUser();
  const { token: userToken } = useToken();
  const [isChangingPasswordModalOpen, setIsChangingPasswordModalOpen] =
    useState(false);
  const form = useForm<z.infer<typeof userProfileValidationSchema>>({
    initialValues: {
      user_name: user?.name ?? "",
      email: user?.email ?? "",
      mobile: user?.mobile ?? "",
      password: "",
    },
    validateInputOnBlur: true,
    validate: zodResolver(userProfileValidationSchema),
  });
  const userInfo = {
    email: form.values.email,
    current_password: form.values.password,
    name: form.values.user_name,
  };
  async function changeUserInfo() {
    if (!userToken) return null;
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      try {
        await axios.patch(`${urls.users}/${user?.id}`, userInfo, {
          headers: getCommonHeaders({ token: userToken }),
        });
        notifications.show({
          message: "تغییرات با موفقیت ثبت شد!",
          color: "green",
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
    <>
      <Stack justify="center" align="center" p={"xl"}>
        <Paper maw={rem(1161)} w={"100%"} bg={"#F0F5FF"} p={"xs"}>
          <Text size="md" fw={700}>
            تنظیمات حساب کاربری
          </Text>
        </Paper>
        <Stack w={"100%"} maw={rem(1161)} align="flex-start" gap={rem(60)}>
          <Group>
            <TextInput
              w={rem(363)}
              h={rem(36)}
              label="نام کاربر"
              value={form.values.user_name}
              {...form.getInputProps("user_name")}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                form.setFieldValue("user_name", event.target.value);
                console.log("typeof event.target", typeof event.target);
              }}
            />
            <TextInput
              w={rem(363)}
              h={rem(36)}
              label="ایمیل کاربر"
              value={form.values.email}
              classNames={{
                input: classes.input,
              }}
              {...form.getInputProps("email")}
              onChange={(event) =>
                form.setFieldValue("email", event.target.value)
              }
            />
          </Group>
          <Group>
            <TextInput
              w={rem(363)}
              h={rem(36)}
              label="شماره تماس"
              value={form.values.mobile}
              disabled
              classNames={{
                input: classes.input,
              }}
              {...form.getInputProps("mobile")}
            />
            <PasswordInput
              label="رمز عبور"
              width={rem(360)}
              height={rem(36)}
              inputProp={form.getInputProps("password")}
            />
          </Group>
          <Group w={"60%"} justify="flex-end">
            <Button
              variant="outline"
              onClick={() => setIsChangingPasswordModalOpen(true)}
            >
              تغییر رمز عبور
            </Button>
            <Button onClick={changeUserInfo}>ثبت تغییرات</Button>
          </Group>
        </Stack>
      </Stack>
      <ModalForChangingPassword
        onClose={() => setIsChangingPasswordModalOpen(false)}
        opened={isChangingPasswordModalOpen}
      />
    </>
  );
}
