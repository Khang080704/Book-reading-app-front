"use client";

import { useQuery } from "@tanstack/react-query";
import { getAuthorWorksAction } from "@/actions/author.action";
import type { WorkDTO } from "@/lib/types";

export function useAuthorWorks(authorKey: string) {
  const key = authorKey?.replace(/^\/+/, "").replace(/^authors\//, "") ?? "";
  return useQuery<WorkDTO[]>({
    queryKey: ["authorWorks", key],
    queryFn: () => getAuthorWorksAction(key),
    enabled: !!key,
  });
}
