"use client";

const API_BASE =
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
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function clearStoredToken() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
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
    window.localStorage.setItem(TOKEN_KEY, data.token);
  }
  return data;
}

