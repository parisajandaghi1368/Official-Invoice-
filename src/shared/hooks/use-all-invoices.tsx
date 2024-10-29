import { useEffect } from "react";
import useToken from "@/shared/hooks/use-token";
import useSWR from "swr";
import { getCommonHeaders } from "@/shared/utils/fetch-helpers";
import axios from "axios";
import { AxiosError } from "axios";
import useLogout from "@/shared/hooks/use-logout";

import { urls } from "@/shared/config/urls";

const projectsFetcher = async ([url, token]: [string, string]) => {
  return axios
    .get(url, {
      headers: getCommonHeaders({ token }),
    })
    .then((res) => {
      console.log("res.data.value", res?.data?.data);
      return res?.data?.data;
    })
    .catch((err) => {
      if (err.response && err.response.status === 404) {
        return [];
      } else {
        throw err?.response?.data;
      }
    });
};
interface UseAllInvoicesParam {
  queryParam: string | undefined;
}

const useAllInvoices = ({ queryParam }: UseAllInvoicesParam) => {
  const { token } = useToken();
  const logout = useLogout();
  const url = `${urls.invoices}${
    queryParam ? `?$top=30&${queryParam}` : "?$top=30"
  }`;

  const swr = useSWR(token ? [url, token] : null, projectsFetcher);
  const { data, error, isLoading, mutate, isValidating } = swr;
  useEffect(() => {
    if (error && (error as AxiosError)?.response?.status === 401) {
      console.error("401, logging out");
      logout();
    }
  }, [data, error, logout]);

  return {
    data,
    error: error as AxiosError,
    isLoading,
    mutate,
    isValidating,
  };
};

export default useAllInvoices;
