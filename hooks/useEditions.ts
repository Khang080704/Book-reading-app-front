"use client";

import { useQuery } from "@tanstack/react-query";
import { getWorkEditionsAction } from "@/actions/book.action";
import type { EditionsListDTO } from "@/lib/types";

export function useEditions(workKey: string) {
  return useQuery<EditionsListDTO | null>({
    queryKey: ["editions", workKey],
    queryFn: () => getWorkEditionsAction(workKey),
    enabled: !!workKey,
  });
}
