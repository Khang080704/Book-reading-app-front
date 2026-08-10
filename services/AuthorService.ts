'server-only';

import { auth } from "@/auth";
import type { AuthorDTO, AuthorDetailDTO, WorkDTO } from "@/lib/types";

export class AuthorService {
  private static async getToken() {
    return (await auth())?.accessToken;
  }

  private static async request(url: string, method: string = "GET", init?: RequestInit) {
    const accessToken = await this.getToken();
    const headers: HeadersInit = {
      ...init?.headers,
    };
    if (accessToken) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${accessToken}`;
    }
    const baseUrl = process.env.BACKEND_DOMAIN || "http://localhost:8081";
    return fetch(`${baseUrl}${url}`, {
      ...init,
      method,
      headers,
    });
  }

  public static async searchAuthors(
    q: string,
    page = 0,
    limit = 20,
    sortBy = "name",
    direction = "desc"
  ): Promise<AuthorDTO[]> {
    const params = new URLSearchParams({
      q: q ?? "",
      page: page.toString(),
      limit: limit.toString(),
      sortBy,
      direction,
    });
    const res = await this.request(`/api/v1/author/search?${params.toString()}`);
    if (!res.ok) return [];
    return (await res.json()) as AuthorDTO[];
  }

  public static async getAuthorDetail(olkey: string): Promise<AuthorDetailDTO | null> {
    const cleanKey = olkey.replace(/^\/+/, "").replace(/^authors\//, "");
    const res = await this.request(`/api/v1/author/${encodeURIComponent(cleanKey)}`);
    if (!res.ok) return null;
    return (await res.json()) as AuthorDetailDTO;
  }

  public static async getAuthorWorks(authorKey: string): Promise<WorkDTO[]> {
    const cleanKey = authorKey.replace(/^\/+/, "").replace(/^authors\//, "");
    const res = await this.request(`/api/v1/author/${encodeURIComponent(cleanKey)}/works`);
    if (!res.ok) return [];
    return (await res.json()) as WorkDTO[];
  }
}
