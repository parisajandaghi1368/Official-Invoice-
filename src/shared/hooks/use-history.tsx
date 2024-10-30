import { useMemo } from "react";

import useAllInvoices from "./use-all-invoices";
import { useAtomValue } from "jotai";
import { pageIndexAtom } from "@/app/(protected)/official-invoice/atom/atom";
import { ITEMS_PER_PAGE } from "../constants/overlays-constant";

export function useHistories() {
  const pageIndex = useAtomValue(pageIndexAtom);
  const skip = pageIndex && (pageIndex - 1) * ITEMS_PER_PAGE;
  const { data, mutate, isLoading } = useAllInvoices({
    queryParam: `&$skip=${skip}`,
  });
  const totalPage = useMemo(() => {
    return data?.["count"] ?? 0;
  }, [data]);
  return {
    emailLoading: isLoading,
    mutate,
    data,
    pageIndex,
    totalPage,
  };
}
