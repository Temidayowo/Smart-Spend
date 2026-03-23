"use client";

import { signIn, signOut } from "next-auth/react";
import { toast } from "sonner";

export async function loginUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const rememberMe = formData.get("rememberMe") === "on" ? "on" : "off";

  const result = await signIn("credentials", {
    email,
    password,
    rememberMe,
    redirect: false,
  });

  if (result?.error) {
    toast.error("Invalid email or password.");
    return { success: false, error: result.error, code: result.code };
  }

  toast.success("Logged in successfully!");
  window.location.href = "/dashboard";
  return { success: true, error: null, code: null };
}

export async function logoutUser() {
  await signOut({ redirectTo: "/login" });
}
