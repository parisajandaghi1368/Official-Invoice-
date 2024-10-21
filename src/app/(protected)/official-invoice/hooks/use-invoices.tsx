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
    .then((res) => res?.data)
    .catch((err) => {
      if (err.response && err.response.status === 404) {
        return [];
      } else {
        throw err?.response?.data;
      }
    });
};

const useInvoices = () => {
  const { token } = useToken();
  const logout = useLogout();

  const { data, error, isLoading, mutate, isValidating } = useSWR(
    token
      ? [
          `${urls.invoices}?$top=${30}
          `,
          token,
        ]
      : null,
    projectsFetcher
  );
  useEffect(() => {
    if (error && (error as AxiosError)?.response?.status === 401) {
      console.error("401, logging out");
      logout();
    }
  }, [data, error, logout]);

  return {
    invoices: data?.data,
    data: data,
    error: error as AxiosError,
    isLoading,
    mutate,

    isValidating,
  };
};

export default useInvoices;
