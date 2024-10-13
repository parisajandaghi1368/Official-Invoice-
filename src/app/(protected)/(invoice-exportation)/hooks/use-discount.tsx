import { getCommonHeaders } from "@/shared/utils/fetch-helpers";
import useToken from "@/shared/hooks/use-token";
import axios from "axios";
import useLogout from "@/shared/hooks/use-logout";

import useSWR from "swr";
import { useEffect } from "react";
import { AxiosError } from "axios";

import { urls } from "@/shared/config/urls";
const discountsFetcher = async ([url, token]: [string, string]) => {
  return axios
    .get(url, {
      headers: getCommonHeaders({ token }),
    })
    .then((res) => res?.data)
    .catch((err) => {
      console.log("err");
      if (err.response && err.response.status === 404) {
        return [];
      } else {
        throw err?.response?.data;
      }
    });
};

const useDiscounts = () => {
  const { token } = useToken();
  const logout = useLogout();

  const url = `${urls.discounts}`;

  const { data, error, isLoading, mutate, isValidating } = useSWR(
    token ? [url, token] : null,
    discountsFetcher
  );
  useEffect(() => {
    if (error && (error as AxiosError)?.response?.status === 401) {
      console.error("401, logging out");
      logout();
    }
  }, [data, error, logout]);

  return {
    discounts: data?.value,
    data: data,
    error: error as AxiosError,
    isLoading,
    mutate,
    isValidating,
  };
};
export default useDiscounts;
