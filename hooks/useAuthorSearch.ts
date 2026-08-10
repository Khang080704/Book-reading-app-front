"use client";

import { useQuery } from "@tanstack/react-query";
import { searchAuthorsAction } from "@/actions/author.action";
import type { AuthorDTO } from "@/lib/types";

export function useAuthorSearch(q: string, page = 0, limit = 20) {
  return useQuery<AuthorDTO[]>({
    queryKey: ["authors", { q, page, limit }],
    queryFn: () => searchAuthorsAction(q, page, limit),
    enabled: typeof q === "string" && q.length > 0,
  });
}
