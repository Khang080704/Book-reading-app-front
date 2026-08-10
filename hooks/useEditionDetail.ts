"use client";

import { useQuery } from "@tanstack/react-query";
import { getEditionDetailsAction } from "@/actions/book.action";
import type { EditionDTO } from "@/lib/types";

export function useEditionDetail(editionKey: string) {
  return useQuery<EditionDTO | null>({
    queryKey: ["edition", editionKey],
    queryFn: () => getEditionDetailsAction(editionKey),
    enabled: !!editionKey,
  });
}
