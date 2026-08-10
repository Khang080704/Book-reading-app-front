"use client";

import { useQuery } from "@tanstack/react-query";
import { getWorkDetailsAction } from "@/actions/book.action";
import type { BookDetailDTO } from "@/lib/types";

export function useWorkDetail(workKey: string) {
  return useQuery<BookDetailDTO | null>({
    queryKey: ["work", workKey],
    queryFn: () => getWorkDetailsAction(workKey),
    enabled: !!workKey,
  });
}
