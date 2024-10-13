import z from "zod";

const emailSchema = z
  .string()
  .regex(/^[a-zA-Z0-9._%-]+@[a-zA-Z0-9._%-]+\.[a-zA-Z]{2,4}$/);

const mobileSchema = z.string().regex(/^09[0-9]{9}$/);

const projectCodeSchema = z.string().regex(/^[0-9]{1,4}$/);

const usernameSchema = z.string().refine(
  (value) => {
    const emailResult = emailSchema.safeParse(value);
    if (emailResult.success) return true;

    const mobileResult = mobileSchema.safeParse(value);
    if (mobileResult.success) return true;

    const codeResult = projectCodeSchema.safeParse(value);
    if (codeResult.success) return true;

    return false;
  },
  {
    message: "نام کاربری باید ایمیل یا شماره موبایل معتبر و یا کد پروژه باشد.",
  }
);

export const exportationFormValidationSchema = z.object({
  userName: usernameSchema,
  projectCode: z.string().regex(/^[0-9]{1,4}$/, {
    message: "کد پروژه را وارد کنید.این فیلد باید عدد باشد!",
  }),
  exportDate: z.string().min(2, { message: "این فیلد نمی‌تواند خالی باشد!" }),
  goodsDescription: z
    .string()
    .min(2, { message: "این فیلد نمی‌تواند خالی باشد!" }),
  count: z
    .string()
    .regex(/^\d+$/, { message: "تعداد باید یک عدد صحیح مثبت باشد!" }),
  unitPrice: z
    .string()
    .regex(/^\d+$/, { message: "این فیلد باید یک  مقدار صحیح مثبت باشد !" }),
  discountCode: z.string().min(2, { message: "این فیلد نمی‌تواند خالی باشد!" }),
  tax: z.string().min(2, { message: "این فیلد نمی‌تواند خالی باشد!" }),
});
