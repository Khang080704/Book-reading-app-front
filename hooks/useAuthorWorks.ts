"use client";

import { useQuery } from "@tanstack/react-query";
import { get } from "@/lib/api";
import type { WorkDTO } from "@/lib/types";

export function useAuthorWorks(authorKey: string) {
  const key = authorKey?.replace(/^\/+/, "").replace(/^authors\//, "") ?? "";
  return useQuery<WorkDTO[]>({
    queryKey: ["authorWorks", key],
    queryFn: () => get<WorkDTO[]>(`/author/${encodeURIComponent(key)}/works`),
    enabled: !!key,
  });
}
