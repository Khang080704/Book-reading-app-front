"use client";

import { useQuery } from "@tanstack/react-query";
import { get } from "@/lib/api";
import type { EditionsListDTO } from "@/lib/types";

export function useEditions(workKey: string) {
  return useQuery<EditionsListDTO>({
    queryKey: ["editions", workKey],
    queryFn: () => get<EditionsListDTO>(`/books/works/${workKey}/editions`),
    enabled: !!workKey,
  });
}
