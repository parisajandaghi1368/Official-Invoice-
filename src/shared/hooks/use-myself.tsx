import axios, { AxiosError } from "axios";
import useSWR from "swr";

import { urls } from "../config/urls";
import { getCommonHeaders } from "../utils/fetch-helpers";
import { MySelf } from "../utils/types";
import useToken from "./use-token";

function userFetcher([url, token]: [url: string, token: string]) {
  const headers = getCommonHeaders({ token });
  return axios.get(url, { headers }).then((res) => res.data as MySelf);
}

const useMyself = () => {
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

export default useMyself;
