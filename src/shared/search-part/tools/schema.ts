import z from "zod";

export const filterInvoiceValidationSchema = z.object({
  fromDate: z.string(),
  toDate: z.string(),
  fromPrice: z.string().array(),
  toPrice: z.string().array(),
  projectCode: z.string().array(),
  officialInvoiceNumber: z.string().array(),
  plan: z.string().array(),
  company: z.string().array(),
  email: z.string().array(),
  mobile: z.string().array(),
});
