"use client";

export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.promptaze.com";

const TOKEN_KEY = "promptaze_admin_token";

export type AuthUser = {
  id: string;
  email: string;
  name: string | null;
  role: string;
};

export type LoginResult = {
  token: string;
  user: AuthUser;
};

export function getStoredToken(): string | null {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie.split("; ").filter(Boolean);
  const match = cookies.find((c) => c.startsWith(`${TOKEN_KEY}=`));
  if (!match) return null;
  const value = match.split("=", 2)[1];
  return decodeURIComponent(value);
}

export function clearStoredToken() {
  if (typeof document === "undefined") return;
  document.cookie = `${TOKEN_KEY}=; Max-Age=0; Path=/`;
}

function setTokenCookie(token: string) {
  if (typeof document === "undefined") return;
  const maxAgeSeconds = 60 * 60 * 24 * 7; // 7 days
  document.cookie = `${TOKEN_KEY}=${encodeURIComponent(
    token,
  )}; Max-Age=${maxAgeSeconds}; Path=/`;
}

export function getTokenPayload():
  | (AuthUser & { sub?: string; iat?: number; exp?: number })
  | null {
  const token = getStoredToken();
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(base64);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export async function loginAdmin(
  email: string,
  password: string,
): Promise<LoginResult> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const message =
      (body?.error as string | undefined) ?? "Login failed. Check credentials.";
    throw new Error(message);
  }

  const data = (await res.json()) as LoginResult;
  if (typeof window !== "undefined") {
    setTokenCookie(data.token);
  }
  return data;
}

