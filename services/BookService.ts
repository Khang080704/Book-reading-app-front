'server-only';

import { auth } from "@/auth";
import type {
  SearchBookDTO,
  BookDetailDTO,
  EditionsListDTO,
  EditionDTO,
  ReadingResourceDTO,
  ChapterDTO,
} from "@/lib/types";

export class BookService {
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

  public static async searchBooks(q: string, page = 1, limit = 10): Promise<SearchBookDTO[]> {
    if (!q || !q.trim()) return [];
    const params = new URLSearchParams({
      q: q.trim(),
      page: page.toString(),
      limit: limit.toString(),
    });
    const res = await this.request(`/api/v1/books/search?${params.toString()}`);
    if (!res.ok) return [];
    return (await res.json()) as SearchBookDTO[];
  }

  public static async getWorkDetails(workKey: string): Promise<BookDetailDTO | null> {
    const cleanKey = workKey.replace(/^\/+/, "").replace(/^works\//, "");
    const res = await this.request(`/api/v1/books/works/${encodeURIComponent(cleanKey)}`);
    if (!res.ok) return null;
    return (await res.json()) as BookDetailDTO;
  }

  public static async getWorkEditions(workKey: string): Promise<EditionsListDTO | null> {
    const cleanKey = workKey.replace(/^\/+/, "").replace(/^works\//, "");
    const res = await this.request(`/api/v1/books/works/${encodeURIComponent(cleanKey)}/editions`);
    if (!res.ok) return null;
    return (await res.json()) as EditionsListDTO;
  }

  public static async getEditionDetails(editionKey: string): Promise<EditionDTO | null> {
    const cleanKey = editionKey.replace(/^\/+/, "").replace(/^editions\//, "");
    const res = await this.request(`/api/v1/books/editions/${encodeURIComponent(cleanKey)}`);
    if (!res.ok) return null;
    return (await res.json()) as EditionDTO;
  }

  public static async getReadingResource(workKey: string): Promise<ReadingResourceDTO> {
    console.log(workKey)
    const res = await this.request(`/api/v1/books/works/${workKey}/reading-resource`);
    const data = await res.json();
    return data as ReadingResourceDTO;
  }

  public static async getAvailableBooks(): Promise<SearchBookDTO[]> {
    const res = await this.request(`/api/v1/books`);
    if (!res.ok) return [];
    return (await res.json()) as SearchBookDTO[];
  }

  public static async getChapters(resourceId: string): Promise<ChapterDTO[]> {
    const res = await this.request(`/api/v1/reading-resources/${encodeURIComponent(resourceId)}/chapters`);
    if (!res.ok) return [];

    const data = (await res.json()) as ChapterDTO[];

    data.sort((a, b) => a.order - b.order)

    return data;
  }
}

