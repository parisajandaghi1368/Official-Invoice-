import { urls } from "@/shared/config/urls";
import { ITEMS_PER_PAGE } from "@/shared/constants/overlays-constant";
import useLogout from "@/shared/hooks/use-logout";
import useToken from "@/shared/hooks/use-token";
import { getCommonHeaders } from "@/shared/utils/fetch-helpers";
import { useDebouncedValue } from "@mantine/hooks";
import axios, { AxiosError } from "axios";
import { useAtomValue } from "jotai";
import { useEffect, useMemo } from "react";
import useSWR from "swr";
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

const useTableOfficialInvoices = () => {
  const pageIndex = useAtomValue(pageIndexAtom);
  const searchTerm = useDebouncedValue(useAtomValue(searchTermAtom), 500);
  const { token } = useToken();
  const logout = useLogout();

  const skip = pageIndex && (pageIndex - 1) * ITEMS_PER_PAGE;

  const { data, error, isLoading, mutate, isValidating } = useSWR(
    token
      ? [
          `${urls.invoices}?$top=${ITEMS_PER_PAGE}&$skip=${skip}
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
