"use server";

import { prisma } from "../prisma";
import bcrypt from "bcryptjs";
import { signIn } from "../auth";
import { createAndSendOtp } from "./verify-email-action";

export async function registerUser(
  formData: FormData,
): Promise<{ error: string } | undefined> {
  const name = formData.get("name") as string;
  const email = (formData.get("email") as string).toLowerCase();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const terms = formData.get("terms") === "on";

  if (!name || !email || !password || !confirmPassword) {
    return { error: "All fields are required." };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W]{8,}$/;

  if (!passwordRegex.test(password)) {
    return {
      error:
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
    };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  if (!terms) {
    return { error: "You must accept the terms and conditions." };
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing && existing.emailVerified) {
      return { error: "An account with this email already exists." };
    }

    // If account exists but is unverified, delete it and re-register cleanly
    if (existing && !existing.emailVerified) {
      await prisma.user.delete({ where: { email } });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: { name, email, passwordHash },
    });
  } catch (err) {
    console.error("[registerUser] db error", err);
    return { error: "Something went wrong. Please try again." };
  }

  try {
    await createAndSendOtp(email);
  } catch (err) {
    console.error("[registerUser] email error", err);
    return {
      error:
        "Account created but we couldn't send the verification email. Please try resending.",
    };
  }

  try {
    await signIn("credentials", { email, password, redirect: false });
  } catch (err) {
    console.error("[registerUser] signIn error", err);
  }
}
