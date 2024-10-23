import { getCommonHeaders } from "@/shared/utils/fetch-helpers";
import useToken from "@/shared/hooks/use-token";
import axios from "axios";
import useLogout from "@/shared/hooks/use-logout";
import useSWR from "swr";
import { useEffect, useMemo } from "react";
import { AxiosError } from "axios";
import { urls } from "@/shared/config/urls";
import { useDebouncedValue } from "@mantine/hooks";
import qs from "qs";
import { Plan } from "../utils/types";

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
interface UsePlansParams {
  searchPlan: string;
}
const usePlans = ({ searchPlan }: UsePlansParams) => {
  const { token } = useToken();
  const logout = useLogout();
  const [debouncedSearch] = useDebouncedValue(searchPlan, 500);

  const query = qs.stringify(
    {
      $top: 20,
      $filter: `substringof('${debouncedSearch}',name) eq true`,
    },
    { encode: true }
  );
  const url = `${urls.plans}?${query}`;
  const { data, error, isLoading, mutate } = useSWR(
    token ? [url, token] : null,
    plansFetcher
  );
  useEffect(() => {
    if (error && (error as AxiosError)?.response?.status === 401) {
      console.error("401, logging out");
      logout();
    }
  }, [data, error, logout]);
  const plans = useMemo(() => {
    return data?.value?.map((item: Plan) => item?.name);
  }, [data?.value]);
  return {
    plans,
    data: data,
    error: error as AxiosError,
    loading: isLoading,
    mutate,
  };
};
export default usePlans;
