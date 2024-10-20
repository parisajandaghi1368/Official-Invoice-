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
    .then((res) => res?.data)
    .catch((err) => {
      throw err?.response?.data;
    });
};

const useUsers = () => {
  const { token } = useToken();
  const logout = useLogout();

  const url = `${urls.users}?$top=${20}`;

  const { data, error, isLoading, mutate } = useSWR(
    token ? [url, token] : null,
    projectsFetcher
  );
  useEffect(() => {
    if (error && (error as AxiosError)?.response?.status === 401) {
      console.error("401, logging out");
      logout();
    }
  }, [data, error, logout]);

  return {
    users: data?.value,
    data: data,
    error: error as AxiosError,
    isLoading,
    mutate,
  };
};
export default useUsers;
