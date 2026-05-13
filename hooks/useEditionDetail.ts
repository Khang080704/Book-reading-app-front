"use client";

import { useQuery } from "@tanstack/react-query";
import { get } from "@/lib/api";
import type { EditionDTO } from "@/lib/types";

export function useEditionDetail(editionKey: string) {
  return useQuery<EditionDTO>({
    queryKey: ["edition", editionKey],
    queryFn: () => get<EditionDTO>(`/books/editions/${editionKey}`),
    enabled: !!editionKey,
  });
}
