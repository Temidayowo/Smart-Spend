"use client";

import { signIn } from "next-auth/react";

export const social = async () => {
  await signIn("google", { callbackUrl: "/dashboard" });
};
