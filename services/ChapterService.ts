import { auth } from "@/auth";
import { ChapterDTO } from "@/lib/types";

export class ChapterService {
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

    public static async getChapterContent(chapterId: string): Promise<ChapterDTO> {
        const res = await this.request(`/api/v1/chapters/${chapterId}`);
        const data = (await res.json()) as ChapterDTO;
        return data
    }

}