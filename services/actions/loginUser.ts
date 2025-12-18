"use server";

import { LoginProps } from "@/app/auth/login/page";

export const loginUser = async (data: LoginProps) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || "Login failed");
  }

  return result;
};
