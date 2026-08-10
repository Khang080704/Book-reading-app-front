"use client";

import { useQuery } from "@tanstack/react-query";
import { searchBooksAction } from "@/actions/book.action";
import type { SearchBookDTO } from "@/lib/types";

export function useBooksSearch(q: string, page = 1, limit = 10) {
  return useQuery<SearchBookDTO[]>({
    queryKey: ["books", { q, page, limit }],
    queryFn: () => searchBooksAction(q, page, limit),
    enabled: typeof q === "string" && q.length > 0,
  });
}
