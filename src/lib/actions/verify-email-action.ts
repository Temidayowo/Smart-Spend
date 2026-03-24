"use server";

import { prisma } from "../prisma";
import { auth } from "../auth";
import { sendOtpEmail } from "../mail";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function otpExpiry(): Date {
  return new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
}

// ---------------------------------------------------------------------------
// Public actions
// ---------------------------------------------------------------------------

export async function createAndSendOtp(email: string) {
  await prisma.verificationToken.deleteMany({ where: { identifier: email } });

  const otp = generateOtp();
  const expiresAt = otpExpiry();

  await prisma.verificationToken.create({
    data: { identifier: email, token: otp, expires: expiresAt },
  });

  await sendOtpEmail(email, otp, expiresAt);
}

export async function verifyEmail(otp: string): Promise<{ success: boolean }> {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Not authenticated.");

  const email = session.user.email;

  const record = await prisma.verificationToken.findFirst({
    where: { identifier: email, token: otp },
  });

  if (!record) throw new Error("Invalid verification code.");
  if (record.expires < new Date())
    throw new Error("Code has expired. Please request a new one.");

  await prisma.$transaction([
    prisma.user.update({
      where: { email },
      data: { emailVerified: new Date(), verifiedAt: new Date() },
    }),
    prisma.verificationToken.delete({ where: { token: otp } }),
  ]);

  return { success: true }; // let client handle redirect
}

export async function resendVerificationEmail() {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Not authenticated.");

  const email = session.user.email;

  const user = await prisma.user.findUnique({ where: { email } });
  if (user?.emailVerified) throw new Error("Email is already verified.");

  await createAndSendOtp(email);
}