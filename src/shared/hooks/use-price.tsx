import { AxiosError } from "axios";

import { useDebouncedValue } from "@mantine/hooks";

import useAllInvoices from "./use-all-invoices";

interface UseInvoiceParam {
  searchPrice: string;
}

const usePrices = ({ searchPrice }: UseInvoiceParam) => {
  const [debouncedSearch] = useDebouncedValue(searchPrice || "", 500);

  const { error, mutate, isValidating } = useAllInvoices({
    queryParam: debouncedSearch
      ? `final_price eq ${debouncedSearch}`
      : undefined,
  });

  return {
    error: error as AxiosError,
    mutate,
    isValidating,
  };
};

export default usePrices;
