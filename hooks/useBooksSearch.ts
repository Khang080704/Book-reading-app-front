"use client";

import { useQuery } from "@tanstack/react-query";
import { get } from "@/lib/api";
import type { SearchBookDTO } from "@/lib/types";

export function useBooksSearch(q: string, page = 1, limit = 10) {
  return useQuery<SearchBookDTO[]>({
    queryKey: ["books", { q, page, limit }],
    queryFn: () => get<SearchBookDTO[]>("/books/search", { q, page, limit }),
    enabled: typeof q === "string" && q.length > 0,
  });
}
