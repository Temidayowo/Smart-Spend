import nodemailer from "nodemailer";
import { prisma } from "./prisma";
import { otpTemplate, passwordResetTemplate } from "./email-templates";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendOtpEmail(
  email: string,
  otp: string,
  expiresIn: Date,
): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { name: true },
  });
  const name = user?.name ?? "there";

  try {
    await transporter.sendMail({
      from: `"Spend Smart" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Your Spend Smart verification code",
      html: otpTemplate({ name, otp, expiresIn }),
    });
  } catch (error) {
    console.error("[sendOtpEmail]", error);
    throw new Error("Failed to send OTP email");
  }
}

export async function sendPasswordResetEmail(
  email: string,
  resetUrl: string,
  expiresAt: Date,
): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: { name: true },
  });
  const name = user?.name ?? "there";

  try {
    await transporter.sendMail({
      from: `"Spend Smart" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Reset your Spend Smart password",
      html: passwordResetTemplate({ name, resetUrl, expiresIn: expiresAt }),
    });
  } catch (error) {
    console.error("[sendPasswordResetEmail]", error);
    throw new Error("Failed to send password reset email");
  }
}
