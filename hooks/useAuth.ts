"use client";

import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/api";
import { setTokens, clearTokens } from "@/lib/auth";
import type { TokenResponse, UserDto, RegisterRequest, LoginRequest } from "@/lib/types";

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginRequest) =>
      apiClient.post<TokenResponse>("/auth/login", data).then((res) => {
        setTokens(res.data);
        return res.data;
      }),
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterRequest) =>
      apiClient.post<UserDto>("/auth/register", data).then((res) => res.data),
  });
}

export function useLogout() {
  return () => {
    clearTokens();
    try {
      window.location.href = "/auth/login";
    } catch {
      // noop
    }
  };
}
