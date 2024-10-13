import z from "zod";

export const userProfileValidationSchema = z.object({
  user_name: z.string().min(1, { message: "نام کاربر نمی‌تواند خالی باشد." }),
  email: z
    .string()
    .email("فرمت ایمیل وارد شده اشتباه است.")
    .refine((value) => value.length !== 0, {
      message: "ایمیل نمی‌تواند خالی باشد.",
    }),
  mobile: z.string(),
  password: z.string().refine((value) => /^[A-Za-z0-9!]{8,}$/.test(value), {
    message:
      "رمز عبور باید حداقل ۸ کاراکتر داشته باشد و فقط شامل حروف، اعداد و ! باشد.",
  }),
});

export const changePasswordValidationSchema = z.object({
  current_password: z
    .string()
    .refine((value) => /^[A-Za-z0-9!]{8,}$/.test(value), {
      message:
        "رمز عبور باید حداقل ۸ کاراکتر داشته باشد و فقط شامل حروف، اعداد و ! باشد.",
    }),
  old_password: z.string().min(1, { message: "رمز عبور فعلی را وارد کنید!" }),
});
