'server-only'

import { auth } from "@/auth"
import { UserDto } from "@/lib/types";

export class UserService {
    public static async getUserInfo(): Promise<UserDto | null> {
        const accessToken = (await auth())?.accessToken;

        if (accessToken) {
            try {
                const payloadBase64 = accessToken.split('.')[1];
                if (payloadBase64) {

                }
            } catch (e) {
                console.error("[UserService DEBUG] Failed to parse JWT payload:", e);
            }
        }

        if (!accessToken) {
            console.error("[UserService] No access token found in session.");
            return null;
        }

        const rawBaseUrl = process.env.BACKEND_DOMAIN || "http://localhost:8081";
        const baseUrl = rawBaseUrl.replace(/\/+$/, "");

        const res = await fetch(`${baseUrl}/api/v1/me`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });

        if (!res.ok) {
            const errorText = await res.text().catch(() => "");
            console.error(`[UserService] Request failed with status ${res.status} (${res.statusText}): ${errorText}`);
            return null;
        }

        const user = (await res.json()) as UserDto;
        return user;
    }
}
