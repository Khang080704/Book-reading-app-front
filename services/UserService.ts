'server-only'

import { auth } from "@/auth"
import { UserDto } from "@/lib/types";

export class UserService {
    public static async getUserInfo() {
        const accessToken = (await auth())?.accessToken;
        const res = await fetch(`${process.env.BACKEND_DOMAIN}/api/v1/me`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })

        const user = (await res.json()) as UserDto
        return user;
    }
}