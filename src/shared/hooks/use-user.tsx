import axios, { AxiosError } from "axios";
import useSWR from "swr";

import useToken from "../hooks/use-token";
import { MySelf } from "../utils/types";
import { getCommonHeaders } from "../utils/fetch-helpers";
import { urls } from "../config/urls";

function userFetcher([url, token]: [url: string, token: string]) {
  const headers = getCommonHeaders({ token });
  return axios.get(url, { headers }).then((res) => res.data as MySelf);
}

const useUser = () => {
  const { token } = useToken();

  const { data, error, isLoading, mutate } = useSWR(
    token ? [`${urls.users}/my-self`, token] : null,
    userFetcher
  );

  return {
    user: data,
    error: error as AxiosError,
    isLoading,
    mutate,
  };
};

export default useUser;
