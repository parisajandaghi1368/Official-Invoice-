import { useMemo } from "react";

import { useDebouncedValue } from "@mantine/hooks";
import { User } from "../utils/types";
import { useAllUsers } from "./use-all-users";

interface UseEmailsParams {
  searchEmail: string;
}
export function useEmails({ searchEmail }: UseEmailsParams) {
  const [debouncedSearch] = useDebouncedValue(searchEmail, 500);

  const { data, mutate, isLoading } = useAllUsers({
    queryParam: debouncedSearch
      ? `$filter=substringof('${debouncedSearch}',email) eq true`
      : undefined,
  });

  const emails = useMemo(() => {
    if (!data) return [];
    const filteredEmails = data?.filter(
      (item: User) => item?.email !== null && item?.email !== ""
    );

    return filteredEmails
      ?.filter(
        (value: string, index: number) =>
          filteredEmails?.indexOf(value) === index
      )
      .map((item: User) => item.email);
  }, [data]);

  return {
    emailLoading: isLoading,
    mutate,
    emails,
  };
}
