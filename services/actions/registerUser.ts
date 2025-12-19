"use server";

import { RegisterFormValues } from "@/app/auth/register/page";

export const registerUser = async (data: RegisterFormValues) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BACKEND_URL}/auth/create-user`,
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
    throw new Error(result?.message || "Register failed");
  }

  return result;
};
