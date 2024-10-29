import { useMemo } from "react";

import { useDebouncedValue } from "@mantine/hooks";
import { User } from "../utils/types";
import { useAllUsers } from "./use-all-users";

interface UseMobilesParams {
  searchMobile: string;
}
export function useMobiles({ searchMobile }: UseMobilesParams) {
  const [debouncedSearch] = useDebouncedValue(searchMobile, 500);

  const { data, mutate, isLoading } = useAllUsers({
    queryParam: debouncedSearch
      ? `$filter=substringof('${debouncedSearch}',mobile) eq true`
      : undefined,
  });
  console.log(
    "datafilter",
    data?.map((item: User) => item?.company)
  );

  const mobiles = useMemo(() => {
    if (!data) return [];
    const filteredMobiles = data?.filter(
      (item: User) => item?.mobile !== null && item?.mobile !== ""
    );

    return filteredMobiles
      ?.filter(
        (value: string, index: number) =>
          filteredMobiles?.indexOf(value) === index
      )
      .map((item: User) => item.mobile);
  }, [data]);

  return {
    mobileLoading: isLoading,
    mutate,
    mobiles: mobiles,
  };
}
