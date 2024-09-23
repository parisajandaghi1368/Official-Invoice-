import { UnstyledButton } from "@mantine/core";
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
          style={{ color: "#4C6EF5", fontSize: 11 }}
          onClick={() => {
            discountValue.length === 0
              ? setDiscountError()
              : setISDiscountCodeButtonClick(true);
          }}
        >
          ثبت‌کد
        </UnstyledButton>
      ) : (
        <IconTrash
          size={18}
          cursor={"pointer"}
          onClick={() => {
            resetDiscountCode();
          }}
        />
      )}
    </>
  );
}
