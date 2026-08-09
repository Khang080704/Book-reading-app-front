import { UserService } from "@/services/UserService";

export const getUserInfoAction = async () => {
    const user = UserService.getUserInfo();
    return user
}