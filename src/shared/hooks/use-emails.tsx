import { getCommonHeaders } from "@/shared/utils/fetch-helpers";
import useToken from "@/shared/hooks/use-token";
import axios from "axios";
import useLogout from "@/shared/hooks/use-logout";
import useSWR from "swr";
import { useEffect, useMemo } from "react";
import { AxiosError } from "axios";
import qs from "qs";
import { urls } from "@/shared/config/urls";
import { useDebouncedValue } from "@mantine/hooks";
import { User } from "../utils/types";
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

interface UseEmailsParams {
  searchEmail: string[];
}
export function useEmails({ searchEmail }: UseEmailsParams) {
  const { token } = useToken();
  const logout = useLogout();
  const [debouncedSearch] = useDebouncedValue(searchEmail, 500);

  const query = qs.stringify(
    {
      $top: 20,
      $filter: `substringof('${debouncedSearch}',email) eq true`,
    },
    { encode: true }
  );
  const url = `${urls.users}?${query}`;
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
  const emails = useMemo(() => {
    return data?.value?.map((item: User) => item.email);
  }, [data?.value]);
  return {
    isLoading,
    mutate,
    emails: emails,
  };
}
