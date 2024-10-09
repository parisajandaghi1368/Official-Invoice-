"use client";
import {
  Button,
  Divider,
  Group,
  Stack,
  Text,
  TextInput,
  UnstyledButton,
  rem,
} from "@mantine/core";

import React, { useState } from "react";
import classes from "../style/style.module.css";
import { useRouter } from "next/navigation";
import PasswordInput from "../(components)/password-input";
import { useForm } from "@mantine/form";
import axios from "axios";
import { urls } from "@/shared/config/urls";
import useToken from "@/shared/hooks/use-token";
import { login } from "./auth";
import { notifications } from "@mantine/notifications";
import { getCommonHeaders } from "@/shared/utils/fetch-helpers";
import { IconRefresh } from "@tabler/icons-react";
export default function Login() {
  const router = useRouter();

  const [shouldShowCaptcha, setShouldShowCaptcha] = useState(false);
  const [captcha_id, setCaptchaId] = useState();
  const { setToken } = useToken();
  const [loading, setloading] = useState(false);
  const [png, setPng] = useState("");
  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      captcha_solution: "",
    },
    validateInputOnBlur: true,
    validate: {
      username: (value) => {
        const isCharacterOnly = value.match(/[a-zA-Z-%._]/g);
        if (isCharacterOnly) {
          const isValidEmail =
            /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9._%-]+\.[a-zA-Z]{2,4}$/g.test(value);
          if (isValidEmail) {
            return null;
          } else {
            return "فرمت ایمیل وارد شده اشتباه است.";
          }
        }
        const isDigitsOnly = value.match(/[0-9]/g);
        if (isDigitsOnly) {
          const isValidMobile = /^09[0-9]{9}$/.test(value);

          if (isValidMobile) {
            return null;
          } else {
            return "فرمت موبایل وارد شده اشتباه است.";
          }
        } else {
          return "نام کاربری نمی تواند خالی باشد.";
        }
      },
      password: (value) => {
        const isValid = /^[A-Za-z0-9!]{8,}$/g.test(value);
        if (isValid) {
          return null;
        } else {
          return "رمز عبور نمی تواند خالی باشد.";
        }
      },
      captcha_solution: (value) => {
        if (!shouldShowCaptcha) {
          return null;
        } else if (value.length < 5) {
          return "لطفا کد کپچا را وارد نمایید.";
        }
      },
    },
  });

  async function fetchCaptchaImage() {
    const response = await axios.post(
      `${urls.captcha}/captcha/new/easy/5/600`,
      {
        method: "POST",
        headers: getCommonHeaders({ sendToken: false }),
      }
    );

    const result = await response.data;
    setCaptchaId(result.id);

    const img = new Image();
    img.src = `data:image/png;base64,${result.png}`;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);
      const pngDataUrl = canvas.toDataURL("image/png");
      setPng(pngDataUrl);
    };
  }

  async function handleLogin() {
    const { hasErrors } = form.validate();
    if (hasErrors) return;

    setloading(true);

    const { password, username, captcha_solution } = form.values;
    let loginPayload: any = {
      password,
      username,
    };
    if (shouldShowCaptcha) {
      loginPayload = { ...loginPayload, captcha_id, captcha_solution };
    }
    const { data, error } = await login(loginPayload);
    if (error) {
      if (error.message === "user or password not found") {
        notifications.show({
          message: "رمز عبور یا نام کاربری اشتباه است!",
          color: "red",
        });
        if (shouldShowCaptcha) {
          fetchCaptchaImage();
        }
      } else if (error.message === "your solution is wrong") {
        notifications.show({
          message: "لطفا کد کپچا را  مطابق تصویر وارد نمایید!",
          color: "yellow",
        });
      }
      setloading(false);
      if (error.fields?.captcha_id) {
        setShouldShowCaptcha(true);
        await fetchCaptchaImage();
      }
    } else if (data?.access_token) {
      return setToken(data.access_token);
    } else {
      console.error("no error but also weird response (no token)");
      setloading(false);
    }
  }

  const userName = form.getInputProps(" username");
  return (
    <Stack w={rem(400)}>
      <Text fw={700} size="lg">
        ورود
      </Text>
      <TextInput
        label="ایمیل یا شماره موبایل"
        placeholder="ایمیل یا شماره موبایل"
        withAsterisk
        classNames={{
          input: classes.input,
        }}
        styles={{ label: { fontSize: 14, marginBottom: 5 } }}
        {...form.getInputProps("username")}
        onInput={(event: any) => {
          const value = event.target.value;
          const regX = /[0-9]{11}/g;
          const numberValidation = value.match(regX);
          if (numberValidation) {
            if (value.length > 11) {
              event.target.value = value.slice(0, 11);
            }
          }
          userName.onChange(event);
        }}
      ></TextInput>
      <PasswordInput
        inputProp={form.getInputProps("password")}
        label="رمزعبور"
      />
      {shouldShowCaptcha && (
        <Group justify="center" bg={"#E1F5FE"} p={"sm"}>
          <img src={png} width={120} height={65} alt="Captcha" />
          <IconRefresh
            size={20}
            onClick={() => {
              fetchCaptchaImage();
            }}
          />

          <TextInput
            placeholder="کپچا"
            withAsterisk
            maxLength={5}
            {...form.getInputProps("captcha_solution")}
          />
        </Group>
      )}
      <Group my={"md"}>
        <Button
          onClick={handleLogin}
          loading={loading}
          style={{ color: loading ? "transparentwhit" : undefined }}
        >
          ورود
        </Button>
      </Group>
      <Divider />
      <Group>
        <UnstyledButton onClick={() => router.push("/password-recovery")}>
          <Text fw={500} size="md" c="#4C6EF5">
            بازیابی رمز عبور
          </Text>
        </UnstyledButton>
      </Group>
    </Stack>
  );
}
