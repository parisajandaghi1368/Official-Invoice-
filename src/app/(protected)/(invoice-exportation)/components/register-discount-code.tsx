import {
  Stack,
  Text,
  TextInput,
  TextInputProps,
  UnstyledButton,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

import { Discounts } from "@/shared/utils/types";
import { notifications } from "@mantine/notifications";
import { useState } from "react";
import useDiscounts from "../hooks/use-discount";
interface DiscountCodeProp {
  resetDiscountCode: () => void;
  setDiscountError: () => void;
  discountValue: string;
  inputProp: TextInputProps;
  disable: boolean;
}
export default function DiscountCodeInput({
  resetDiscountCode,
  discountValue,
  setDiscountError,
  inputProp,
  disable,
}: DiscountCodeProp) {
  const [isDiscountCodeButtonClick, setIsDiscountCodeButtonClick] =
    useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const { discounts } = useDiscounts();
  const handleRegisterDiscount = () => {
    const isExist = discounts.filter(
      (item: Discounts) => item.code === discountValue
    );
    if (isExist.length === 0) {
      notifications.show({
        message: "کد تخفیف نامعتبر است!",
        color: "yellow",
      });
    } else {
      setIsDiscountCodeButtonClick(true);
      setShowMessage(true);
    }
  };
  return (
    <Stack>
      <TextInput
        label={"کدتخفیف"}
        disabled={disable}
        rightSection={
          !isDiscountCodeButtonClick ? (
            <UnstyledButton
              onClick={() => {
                discountValue.length === 0
                  ? setDiscountError()
                  : handleRegisterDiscount();
              }}
            >
              {disable ? (
                <Text c="dimmed" fz="xs">
                  ثبت‌کد
                </Text>
              ) : (
                <Text c="#4C6EF5" fz="xs">
                  ثبت‌کد
                </Text>
              )}
            </UnstyledButton>
          ) : (
            <UnstyledButton>
              <IconTrash
                size={18}
                onClick={() => {
                  resetDiscountCode();
                  setIsDiscountCodeButtonClick(false);
                  setShowMessage(false);
                }}
              />
            </UnstyledButton>
          )
        }
        {...inputProp}
      ></TextInput>
      {showMessage && (
        <Text ta={"center"} size="xs" c={"#00b341"}>
          انقدر تومان از مبلغ قابل پرداخت کم شده است.
        </Text>
      )}
    </Stack>
  );
}
