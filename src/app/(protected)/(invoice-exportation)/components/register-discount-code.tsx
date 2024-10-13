import { UnstyledButton, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

import React, { useState } from "react";
import useDiscounts from "../hooks/use-discount";
import { notifications } from "@mantine/notifications";
interface RegisterDiscountCode {
  resetDiscountCode: () => void;
  setDiscountError: () => void;
  discountValue: string;
}
export default function RegisterDiscountCode({
  resetDiscountCode,
  discountValue,
  setDiscountError,
}: RegisterDiscountCode) {
  const [isDiscountCodeButtonClick, setISDiscountCodeButtonClick] =
    useState(false);
  const { discounts } = useDiscounts();
  const handleRegisterDiscount = () => {
    const isExist = discounts.filter(
      (item: any) => item.code === discountValue
    );
    if (isExist.length === 0) {
      notifications.show({
        message: "کد تخفیف نامعتبر است!",
        color: "red",
      });
    } else {
      setISDiscountCodeButtonClick(true);
    }
  };
  return (
    <>
      {!isDiscountCodeButtonClick ? (
        <UnstyledButton
          onClick={() => {
            discountValue.length === 0
              ? setDiscountError()
              : handleRegisterDiscount();
          }}
        >
          <Text c="#4C6EF5" fz="xs">
            ثبت‌کد
          </Text>
        </UnstyledButton>
      ) : (
        <UnstyledButton>
          <IconTrash
            size={18}
            onClick={() => {
              resetDiscountCode();
            }}
          />
        </UnstyledButton>
      )}
    </>
  );
}
