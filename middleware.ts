import { auth } from "@/auth";
import { NextResponse } from "next/server";

// Các route yêu cầu đăng nhập
const PROTECTED_PREFIXES = ["/me"];

export default auth((req) => {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isProtected && !req.auth) {
    // Redirect về trang login với callbackUrl để quay lại sau khi đăng nhập
    const loginUrl = new URL("/auth/signin", req.nextUrl.origin);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.href);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  /*
   * Áp dụng middleware cho tất cả các route NGOẠI TRỪ:
   * - _next/static (static files)
   * - _next/image (image optimization)
   * - favicon.ico
   * - public files
   * - NextAuth API routes (/api/auth/*)
   */
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
