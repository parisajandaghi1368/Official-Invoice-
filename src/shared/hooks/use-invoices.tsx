import { useEffect, useMemo } from "react";
import useToken from "@/shared/hooks/use-token";
import useSWR from "swr";
import { getCommonHeaders } from "@/shared/utils/fetch-helpers";
import axios from "axios";
import { AxiosError } from "axios";
import useLogout from "@/shared/hooks/use-logout";

import { urls } from "@/shared/config/urls";
import { useDebouncedValue } from "@mantine/hooks";
import qs from "qs";
import { Invoice } from "../utils/types";

const projectsFetcher = async ([url, token]: [string, string]) => {
  return axios
    .get(url, {
      headers: getCommonHeaders({ token }),
    })
    .then((res) => res?.data)
    .catch((err) => {
      if (err.response && err.response.status === 404) {
        return [];
      } else {
        throw err?.response?.data;
      }
    });
};
interface UseInvoiceParam {
  searchInvoiceNum: string;
}

const useInvoices = ({ searchInvoiceNum }: UseInvoiceParam) => {
  const { token } = useToken();
  const logout = useLogout();
  const [debouncedSearch] = useDebouncedValue(searchInvoiceNum, 500);

  const query = qs.stringify(
    {
      $top: 20,
    },
    { encode: true }
  );
  const url = `${urls.invoices}?${query}`;
  const { data, error, isLoading, mutate, isValidating } = useSWR(
    token ? [url, token] : null,
    projectsFetcher
  );
  useEffect(() => {
    if (error && (error as AxiosError)?.response?.status === 401) {
      console.error("401, logging out");
      logout();
    }
  }, [data, error, logout]);
  const invoiceNumber = useMemo(() => {
    const filteredInvoiceNumber = data?.data?.map(
      (item: Invoice) => item.invoice_number ?? ""
    );
    return filteredInvoiceNumber?.filter(
      (value: string, index: number) =>
        value !== "" && filteredInvoiceNumber?.indexOf(value) === index
    );
  }, [data?.data]);

  return {
    invoiceNumber,
    error: error as AxiosError,
    isLoadingInvoiceNum: isLoading,
    mutate,
    isValidating,
  };
};

export default useInvoices;
