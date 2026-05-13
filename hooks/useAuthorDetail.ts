"use client";

import { useQuery } from "@tanstack/react-query";
import { get } from "@/lib/api";
import type { AuthorDetailDTO } from "@/lib/types";

export function useAuthorDetail(olkey: string) {
  const key = olkey?.replace(/^\/+/, "").replace(/^authors\//, "") ?? "";
  return useQuery<AuthorDetailDTO>({
    queryKey: ["author", key],
    queryFn: () => get<AuthorDetailDTO>(`/author/${encodeURIComponent(key)}`),
    enabled: !!key,
  });
}
