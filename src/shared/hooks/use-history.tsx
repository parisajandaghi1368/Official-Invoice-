import { useMemo } from "react";

import { useDebouncedValue } from "@mantine/hooks";

import { Invoice } from "../utils/types";
import useAllInvoices from "./use-all-invoices";

interface UseprojectCodeParam {
  searchProjectCode: string;
}

const useProjectCode = ({ searchProjectCode }: UseprojectCodeParam) => {
  const [debouncedSearch] = useDebouncedValue(searchProjectCode || "", 500);
  const { data, isLoading } = useAllInvoices({
    queryParam: debouncedSearch
      ? `$filter=id eq'${debouncedSearch}'`
      : undefined,
  });

  const projectCode = useMemo(() => {
    if (!data) return [];
    return data?.map((item: Invoice) => String(item?.id));
  }, [data]);

  return {
    projectCode,
    loadingProjectCode: isLoading,
  };
};

export default useProjectCode;
