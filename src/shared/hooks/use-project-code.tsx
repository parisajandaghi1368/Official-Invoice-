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
interface UseprojectCodeParam {
  searchProjectCode: string;
}

const useProjectCode = ({ searchProjectCode }: UseprojectCodeParam) => {
  const { token } = useToken();
  const logout = useLogout();
  const [debouncedSearch] = useDebouncedValue(searchProjectCode, 500);

  const query = qs.stringify(
    {
      $top: 20,
      // $filter: `id eq ${debouncedSearch}`,
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
  const projectCode = useMemo(() => {
    return data?.data?.map((item: Invoice) => item?.id);
  }, [data?.data]);
  console.log("projectCode", projectCode);

  return {
    projectCode,
    error: error as AxiosError,
    isLoadingProjectCode: isLoading,
    mutate,

    isValidating,
  };
};

export default useProjectCode;
