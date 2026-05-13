export type Tokens = {
  accessToken: string;
  refreshToken?: string;
};

const STORAGE_KEY = "rb_tokens";

export function setTokens(tokens: Tokens) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens));
  } catch (e) {
    // ignore storage errors in environments without localStorage
  }
}

export function getAccessToken(): string | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.accessToken ?? null;
  } catch (e) {
    return null;
  }
}

export function clearTokens() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    // ignore
  }
}
