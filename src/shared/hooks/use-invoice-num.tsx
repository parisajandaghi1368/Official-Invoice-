import { useMemo } from "react";

import { AxiosError } from "axios";

import { useDebouncedValue } from "@mantine/hooks";

import { Invoice } from "../utils/types";
import useAllInvoices from "./use-all-invoices";

interface UseInvoiceNumParam {
  searchInvoiceNum: string;
}

const useInvoiceNumbers = ({ searchInvoiceNum }: UseInvoiceNumParam) => {
  const [debouncedSearch] = useDebouncedValue(searchInvoiceNum || "", 500);

  const { data, error, isLoading, mutate, isValidating } = useAllInvoices({
    queryParam: debouncedSearch
      ? `invoice_number eq ${debouncedSearch}`
      : undefined,
  });

  const invoiceNumbers = useMemo(() => {
    if (!data) return [];

    return data
      ?.filter((item: Invoice) => {
        return item.invoice_number !== null;
      })
      .map((item: Invoice) => item.invoice_number);
  }, [data]);

  return {
    invoiceNumbers,
    error: error as AxiosError,
    invoiceNumLoading: isLoading,
    mutate,
    isValidating,
  };
};

export default useInvoiceNumbers;
