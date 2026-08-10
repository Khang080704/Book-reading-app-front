'server-only'

import { auth } from "@/auth"
import type { WorkDTO, AuthorDTO } from "@/lib/types"
import { BookService } from "./BookService";
import { AuthorService } from "./AuthorService";

export class FavoriteService {
  private static async getToken() {
    return (await auth())?.accessToken;
  }

  private static async request(url: string, method: string = "GET") {
    const accessToken = await this.getToken();
    const headers: HeadersInit = {};
    if (accessToken) {
      headers["Authorization"] = `Bearer ${accessToken}`;
    }
    const baseUrl = process.env.BACKEND_DOMAIN || "http://localhost:8081";
    const res = await fetch(`${baseUrl}${url}`, {
      method,
      headers,
    });
    return res;
  }

  public static async getFavoriteWorks(): Promise<WorkDTO[]> {
    const res = await this.request("/api/v1/favorites/works");
    if (!res.ok) return [];
    return (await res.json()) as WorkDTO[];
  }

  public static async getFavoriteAuthors(): Promise<AuthorDTO[]> {
    const res = await this.request("/api/v1/favorites/authors");
    if (!res.ok) return [];
    return (await res.json()) as AuthorDTO[];
  }

  public static async addFavoriteWork(workKey: string): Promise<string> {
    const res = await this.request(`/api/v1/favorites/works/${encodeURIComponent(workKey)}`, "POST");
    if (!res.ok) throw new Error("Failed to add favorite work");
    return await res.text();
  }

  public static async removeFavoriteWork(workKey: string): Promise<string> {
    const res = await this.request(`/api/v1/favorites/works/${encodeURIComponent(workKey)}`, "DELETE");
    if (!res.ok) throw new Error("Failed to remove favorite work");
    return await res.text();
  }

  public static async addFavoriteAuthor(authorKey: string): Promise<string> {
    const res = await this.request(`/api/v1/favorites/authors/${encodeURIComponent(authorKey)}`, "POST");
    if (!res.ok) throw new Error("Failed to add favorite author");
    return await res.text();
  }

  public static async removeFavoriteAuthor(authorKey: string): Promise<string> {
    const res = await this.request(`/api/v1/favorites/authors/${encodeURIComponent(authorKey)}`, "DELETE");
    if (!res.ok) throw new Error("Failed to remove favorite author");
    return await res.text();
  }

  public static async isWorkFavorite(workKey: string): Promise<boolean> {
    const res = await this.request(`/api/v1/favorites/works/${encodeURIComponent(workKey)}/status`);
    if (!res.ok) return false;
    return (await res.json()) as boolean;
  }

  public static async isAuthorFavorite(authorKey: string): Promise<boolean> {
    const res = await this.request(`/api/v1/favorites/authors/${encodeURIComponent(authorKey)}/status`);
    if (!res.ok) return false;
    return (await res.json()) as boolean;
  }

  public static async getWorkDetail(workKey: string) {
    return BookService.getWorkDetails(workKey);
  }

  public static async getAuthorDetail(olkey: string) {
    return AuthorService.getAuthorDetail(olkey);
  }

  public static async getAuthorWorks(authorKey: string): Promise<WorkDTO[]> {
    return AuthorService.getAuthorWorks(authorKey);
  }
}
