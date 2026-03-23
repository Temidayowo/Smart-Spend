"use server";

import crypto from "crypto";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "../prisma";
import { sendPasswordResetEmail } from "../mail";

const RESET_TOKEN_EXPIRY_MS = 60 * 60 * 1000; // 1 hour

// ---------------------------------------------------------------------------
// Request password reset
// ---------------------------------------------------------------------------

export async function requestPasswordReset(
  formData: FormData,
): Promise<{ error?: string; success?: boolean }> {
  const email = (formData.get("email") as string)?.toLowerCase().trim();

  if (!email) return { error: "Email is required." };

  // Always return success to avoid leaking whether an account exists
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { success: true };

  // Invalidate any existing reset tokens for this user
  await prisma.passwordReset.deleteMany({ where: { userId: user.id } });

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + RESET_TOKEN_EXPIRY_MS);

  await prisma.passwordReset.create({
    data: { userId: user.id, token, expiresAt },
  });

  const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

  await sendPasswordResetEmail(email, resetUrl, expiresAt);

  return { success: true };
}

// ---------------------------------------------------------------------------
// Reset password (also used by OAuth users to set a password for first time)
// ---------------------------------------------------------------------------

export async function resetPassword(
  formData: FormData,
): Promise<{ error?: string }> {
  const token = formData.get("token") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!token) return { error: "Invalid or missing reset token." };
  if (!password || !confirmPassword)
    return { error: "All fields are required." };
  if (password !== confirmPassword) return { error: "Passwords do not match." };
  if (password.length < 8)
    return { error: "Password must be at least 8 characters." };

  const record = await prisma.passwordReset.findUnique({ where: { token } });

  if (!record || record.usedAt)
    return { error: "Invalid or expired reset link." };
  if (record.expiresAt < new Date())
    return { error: "This reset link has expired. Please request a new one." };

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: record.userId },
      data: { passwordHash },
    }),
    prisma.passwordReset.update({
      where: { token },
      data: { usedAt: new Date() },
    }),
  ]);

  redirect("/login");
}
