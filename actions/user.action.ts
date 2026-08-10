import { UserService } from "@/services/UserService";

export const getUserInfoAction = async () => {
    const user = await UserService.getUserInfo();
    return user;
}