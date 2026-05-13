"use client";

import { useQuery } from "@tanstack/react-query";
import { get } from "@/lib/api";
import type { AuthorDTO } from "@/lib/types";

export function useAuthorSearch(q: string, page = 0, limit = 20) {
  return useQuery<AuthorDTO[]>({
    queryKey: ["authors", { q, page, limit }],
    queryFn: () => get<AuthorDTO[]>("/author/search", { q, page, limit }),
    enabled: typeof q === "string" && q.length > 0,
  });
}
