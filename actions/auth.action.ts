"use server";

import { auth, signOut } from "@/auth";

/**
 * Lấy Keycloak End Session URL đầy đủ kèm id_token_hint và post_logout_redirect_uri
 */
export async function getLogoutUrl() {
  const session = await auth();
  const idToken = session?.idToken;

  let appBaseUrl =
    process.env.NEXTAUTH_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000";

  // Chuẩn hóa: loại bỏ trailing slash thừa nếu có để khớp đúng cấu hình Keycloak
  appBaseUrl = appBaseUrl.replace(/\/$/, "");

  const keycloakIssuer =
    process.env.AUTH_KEYCLOAK_ISSUER ??
    process.env.NEXT_PUBLIC_AUTH_KEYCLOAK_ISSUER;
  const clientId =
    process.env.AUTH_KEYCLOAK_ID ??
    process.env.NEXT_PUBLIC_AUTH_KEYCLOAK_ID ??
    "book-store-client";

  const keycloakLogoutUrl = new URL(
    `${keycloakIssuer}/protocol/openid-connect/logout`
  );

  keycloakLogoutUrl.searchParams.set("post_logout_redirect_uri", appBaseUrl);
  keycloakLogoutUrl.searchParams.set("client_id", clientId);
  if (idToken) {
    keycloakLogoutUrl.searchParams.set("id_token_hint", idToken);
  }

  return keycloakLogoutUrl.toString();
}

/**
 * Thực hiện logout phía Server
 */
export async function logoutAction() {
  await signOut({ redirect: false });
  const logoutUrl = await getLogoutUrl();
  return logoutUrl;
}
