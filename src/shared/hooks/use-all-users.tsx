import { getCommonHeaders } from "@/shared/utils/fetch-helpers";
import useToken from "@/shared/hooks/use-token";
import axios from "axios";
import useLogout from "@/shared/hooks/use-logout";
import useSWR from "swr";
import { useEffect } from "react";
import { AxiosError } from "axios";

import { urls } from "@/shared/config/urls";

const projectsFetcher = async ([url, token]: [string, string]) => {
  return axios
    .get(url, {
      headers: getCommonHeaders({ token }),
    })
    .then((res) => {
      console.log("res?.data", res?.data?.value);
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
