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
