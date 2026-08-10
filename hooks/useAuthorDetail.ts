"use client";

import { useQuery } from "@tanstack/react-query";
import { getAuthorDetailAction } from "@/actions/author.action";
import type { AuthorDetailDTO } from "@/lib/types";

export function useAuthorDetail(olkey: string) {
  const key = olkey?.replace(/^\/+/, "").replace(/^authors\//, "") ?? "";
  return useQuery<AuthorDetailDTO | null>({
    queryKey: ["author", key],
    queryFn: () => getAuthorDetailAction(key),
    enabled: !!key,
  });
}
