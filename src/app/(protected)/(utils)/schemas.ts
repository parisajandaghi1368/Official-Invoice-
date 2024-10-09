import z from "zod";

export const ExportationFormValidation = z.object({
  userName: z.number({ message: "کد پروژه باید عدد باشد!" }),
  projectCode: z.string().min(2, { message: "این فیلد نمی‌تواند خالی باشد!" }),
  exportDate: z.string().min(2, { message: "این فیلد نمی‌تواند خالی باشد!" }),
  goodsDescription: z
    .string()
    .min(2, { message: "این فیلد نمی‌تواند خالی باشد!" }),
  count: z
    .string()
    .regex(/^\d+$/, { message: "تعداد باید یک عدد صحیح مثبت باشد!" })
    .transform(Number),
  unitPrice: z.string().min(2, { message: "این فیلد نمی‌تواند خالی باشد!" }),
  discountCode: z.string().min(2, { message: "این فیلد نمی‌تواند خالی باشد!" }),
  tax: z.string().min(2, { message: "این فیلد نمی‌تواند خالی باشد!" }),
});
export const UserProfileValidation = z.object({
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
export const ChangePasswordValidation = z.object({
  current_password: z
    .string()
    .refine((value) => /^[A-Za-z0-9!]{8,}$/.test(value), {
      message:
        "رمز عبور باید حداقل ۸ کاراکتر داشته باشد و فقط شامل حروف، اعداد و ! باشد.",
    }),
  old_password: z.string(),
});
