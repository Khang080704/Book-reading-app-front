"use client";

import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "@/lib/auth";
import apiClient from "@/lib/api";
import type { UserDto } from "@/lib/types";

export function useMe() {
  return useQuery<UserDto>({
    queryKey: ["me"],
    queryFn: () => apiClient.get<UserDto>("/me").then((r) => r.data),
    enabled: typeof window !== "undefined" && !!getAccessToken(),
  });
}
