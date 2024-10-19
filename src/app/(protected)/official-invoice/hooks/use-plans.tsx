import { getCommonHeaders } from "@/shared/utils/fetch-helpers";
import useToken from "@/shared/hooks/use-token";
import axios from "axios";
import useLogout from "@/shared/hooks/use-logout";
import useSWR from "swr";
import { useEffect } from "react";
import { AxiosError } from "axios";
import { urls } from "@/shared/config/urls";

const plansFetcher = async ([url, token]: [string, string]) => {
  return axios
    .get(url, {
      headers: getCommonHeaders({ token }),
    })
    .then((res) => res?.data)
    .catch((err) => {
      throw err?.response?.data;
    });
};

const usePlans = () => {
  const { token } = useToken();
  const logout = useLogout();

  const { data, error, isLoading, mutate } = useSWR(
    token ? [`${urls.plans}?$top=${10}&$skip=${0}`, token] : null,
    plansFetcher
  );
  useEffect(() => {
    if (error && (error as AxiosError)?.response?.status === 401) {
      console.error("401, logging out");
      logout();
    }
  }, [data, error, logout]);

  return {
    plans: data?.value,
    data: data,
    error: error as AxiosError,
    isLoading,
    mutate,
  };
};
export default usePlans;
