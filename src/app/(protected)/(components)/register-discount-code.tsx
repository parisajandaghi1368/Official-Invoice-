import { UnstyledButton, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";

import React, { useState } from "react";
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
  return (
    <>
      {!isDiscountCodeButtonClick ? (
        <UnstyledButton
          onClick={() => {
            discountValue.length === 0
              ? setDiscountError()
              : setISDiscountCodeButtonClick(true);
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
