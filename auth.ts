import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";
import type { JWT } from "next-auth/jwt";

// ─────────────────────────────────────────────
// Helper: gọi Keycloak token endpoint để refresh
// ─────────────────────────────────────────────
async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const response = await fetch(
      `${process.env.AUTH_KEYCLOAK_ISSUER}/protocol/openid-connect/token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          client_id: process.env.AUTH_KEYCLOAK_ID!,
          client_secret: process.env.AUTH_KEYCLOAK_SECRET!,
          grant_type: "refresh_token",
          refresh_token: token.refreshToken!,
        }),
      }
    );

    const refreshed = await response.json();

    if (!response.ok) {
      console.error("[auth] Refresh token failed:", refreshed);
      throw refreshed;
    }

    return {
      ...token,
      accessToken: refreshed.access_token,
      // Keycloak đôi khi trả về refresh_token mới, đôi khi không
      refreshToken: refreshed.refresh_token ?? token.refreshToken,
      idToken: refreshed.id_token ?? token.idToken,
      // expires_in là số giây, chuyển sang epoch seconds
      expiresAt: Math.floor(Date.now() / 1000) + refreshed.expires_in,
      error: undefined,
    };
  } catch (error) {
    console.error("[auth] Refresh token error:", error);
    return { ...token, error: "RefreshTokenError" as const };
  }
}

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Keycloak({
      clientId: process.env.AUTH_KEYCLOAK_ID!,
      clientSecret: process.env.AUTH_KEYCLOAK_SECRET!,
      issuer: process.env.AUTH_KEYCLOAK_ISSUER!,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, account }) {
      // ── Lần đăng nhập đầu tiên: account được trả về bởi Keycloak ──
      if (account) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          idToken: account.id_token,
          // expires_at từ account là epoch seconds
          expiresAt: account.expires_at,
        };
      }

      // ── Token vẫn còn hạn (buffer 60 giây để tránh race condition) ──
      if (Date.now() < (token.expiresAt! * 1000) - 60_000) {
        return token;
      }

      // ── Token đã hết hạn → thực hiện refresh ──
      // Cơ chế này tự động chạy trên Server mỗi khi `await auth()` được gọi
      return refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken!;
      session.idToken = token.idToken;
      session.error = token.error;
      return session;
    },
  },
});