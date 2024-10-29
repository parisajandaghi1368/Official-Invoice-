import { useMemo } from "react";

import { useDebouncedValue } from "@mantine/hooks";
import { User } from "../utils/types";
import { useAllUsers } from "./use-all-users";

interface UseCompanyParams {
  searchCompany: string;
}
export function useCompanies({ searchCompany }: UseCompanyParams) {
  const [debouncedSearch] = useDebouncedValue(searchCompany || "", 500);
  const { data, mutate, isLoading } = useAllUsers({
    queryParam: debouncedSearch
      ? `$filter=substringof('${debouncedSearch}',company) eq true`
      : undefined,
  });

  const companies = useMemo(() => {
    if (!data) return [];
    const filteredCompany = data?.filter(
      (item: User) => item?.company !== null && item?.company !== ""
    );

    return filteredCompany
      ?.filter(
        (value: string, index: number) =>
          filteredCompany?.indexOf(value) === index
      )
      .map((item: User) => item.company);
  }, [data]);

  return {
    companyLoading: isLoading,
    mutate,
    companies,
  };
}
