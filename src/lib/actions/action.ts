"use client";

import { signIn, signOut } from "next-auth/react";

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const rememberMe = formData.get("rememberMe") === "on" ? "on" : "off"; // ← guard against "null"


  await signIn("credentials", {
    email,
    password,
    rememberMe,
    redirectTo: "/dashboard",
  });
}

export async function logoutUser() {
  await signOut({ redirectTo: "/login" });
}
