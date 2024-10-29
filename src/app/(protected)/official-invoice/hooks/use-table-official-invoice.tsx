import { useEffect, useMemo } from "react";
import useToken from "@/shared/hooks/use-token";
import useSWR from "swr";
import { getCommonHeaders } from "@/shared/utils/fetch-helpers";
import axios from "axios";
import { AxiosError } from "axios";
import useLogout from "@/shared/hooks/use-logout";
import { useDebouncedValue } from "@mantine/hooks";
import { urls } from "@/shared/config/urls";
import { useAtomValue } from "jotai";
import { pageIndexAtom, searchTermAtom } from "../atom/atom";

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

// function useAllInvoices({ query }) {
//   return useSWR(`${url.invoices}${query ? `?${query}` : ""}`, fetcher);
// }

const useTableOfficialInvoices = () => {
  const pageIndex = useAtomValue(pageIndexAtom);
  const searchTerm = useDebouncedValue(useAtomValue(searchTermAtom), 500);
  const { token } = useToken();
  const logout = useLogout();

  const skip = pageIndex && (pageIndex - 1) * 10;

  // const { data, error, isLoading, mutate, isValidating } = useAllInvoices({
  //   query: qs({
  //     $top: 10,
  //     $skip: skip,
  //   }),
  // });

  const { data, error, isLoading, mutate, isValidating } = useSWR(
    token
      ? [
          `${urls.invoices}?$top=${10}&$skip=${skip}
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
  const totalPage = useMemo(() => {
    return data?.["count"] ?? 0;
  }, [data]);

  return {
    invoices: data?.data,
    data: data,
    error: error as AxiosError,
    isLoading,
    mutate,
    searchTerm,
    pageIndex,
    totalPage,
    isValidating,
  };
};

export default useTableOfficialInvoices;
