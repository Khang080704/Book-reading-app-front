"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * TokenRefresher — component không render UI, chỉ quản lý vòng đời token.
 *
 * Cơ chế:
 * - Cứ mỗi 4 phút gọi `update()` để trigger jwt callback trên server,
 *   đảm bảo accessToken trong cookie luôn được làm mới trước khi hết hạn.
 * - Nếu server trả về session.error === "RefreshTokenError"
 *   (ví dụ: refresh_token đã hết hạn / bị revoke),
 *   redirect người dùng về trang login để đăng nhập lại.
 *
 * Lý do cần component này (ngoài cơ chế tự động của Server Component):
 * - Server Component tự refresh khi được render (mỗi request).
 * - Nhưng nếu người dùng giữ tab mở lâu không navigate,
 *   Server Component không được gọi → token hết hạn mà không được refresh.
 * - TokenRefresher giải quyết vấn đề đó bằng cách polling định kỳ ở client.
 */
export default function TokenRefresher() {
  const { data: session, status, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Nếu refresh token thất bại → buộc đăng nhập lại
    if (session?.error === "RefreshTokenError") {
      router.push("/auth/login");
      return;
    }

    // Chỉ chạy khi đã authenticated
    if (status !== "authenticated") return;

    // Refresh mỗi 4 phút (Keycloak mặc định access token 5 phút)
    const FOUR_MINUTES = 4 * 60 * 1000;
    const interval = setInterval(() => {
      update();
    }, FOUR_MINUTES);

    return () => clearInterval(interval);
  }, [session?.error, status, update, router]);

  return null;
}
