"use client";

import { useQuery } from "@tanstack/react-query";
import { get } from "@/lib/api";
import type { BookDetailDTO } from "@/lib/types";

export function useWorkDetail(workKey: string) {
  return useQuery<BookDetailDTO>({
    queryKey: ["work", workKey],
    queryFn: () => get<BookDetailDTO>(`/books/works/${workKey}`),
    enabled: !!workKey,
  });
}
