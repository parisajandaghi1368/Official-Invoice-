import useLogout from "@/shared/hooks/use-logout";
import useToken from "@/shared/hooks/use-token";
import { getCommonHeaders } from "@/shared/utils/fetch-helpers";
import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import useSWR from "swr";

import { urls } from "@/shared/config/urls";

const projectsFetcher = async ([url, token]: [string, string]) => {
  return axios
    .get(url, {
      headers: getCommonHeaders({ token }),
    })
    .then((res) => {
      return res?.data?.value;
    })
    .catch((err) => {
      throw err?.response?.data;
    });
};

interface UseAllUsersParams {
  queryParam: string | undefined;
}
export function useAllUsers({ queryParam }: UseAllUsersParams) {
  const { token } = useToken();
  const logout = useLogout();

  const url = `${urls.users}${
    queryParam ? `?$top=30&${queryParam}` : "?$top=30"
  }`;
  const swr = useSWR(token ? [url, token] : null, projectsFetcher);
  const { data, error, isLoading, mutate } = swr;
  useEffect(() => {
    if (error && (error as AxiosError)?.response?.status === 401) {
      console.error("401, logging out");
      logout();
    }
  }, [data, error, logout]);

  return {
    isLoading,
    mutate,
    data,
  };
}
