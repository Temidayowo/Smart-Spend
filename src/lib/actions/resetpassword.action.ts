"use server";

import { prisma } from "../prisma";
import bcrypt from "bcryptjs";

export const resetPassword = async (
  newPassword: string,
  confirmNewPassword: string,
  token: string,
) => {
  if (!token) {
    throw new Error("Token is required");
  }

  if (newPassword !== confirmNewPassword) {
    throw new Error("Passwords do not match");
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d])[A-Za-z\d\W]{8,}$/;

  if (!passwordRegex.test(newPassword)) {
    throw new Error(
      "Password must be at least 8 characters and include uppercase, lowercase, number, and special character.",
    );
  }

  const passwordReset = await prisma.passwordReset.findUnique({
    where: { token },
  });

  if (!passwordReset) {
    throw new Error("Invalid token");
  }

  if (passwordReset.expiresAt < new Date()) {
    await prisma.passwordReset.delete({ where: { token } });
    throw new Error("Reset link has expired. Please request a new one");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.$transaction([
    prisma.user.update({
      where: { id: passwordReset.userId },
      data: { passwordHash: hashedPassword },
    }),
    prisma.passwordReset.delete({
      where: { token },
    }),
  ]);
};
