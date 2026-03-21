import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import VerifyEmailForm from "./VerifyEmailForm";

export default async function Page() {
  const session = await auth();

  if (!session?.user) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email! },
    select: { emailVerified: true },
  });

  if (user?.emailVerified) redirect("/dashboard");

  const token = await prisma.verificationToken.findFirst({
    where: { identifier: session.user.email! },
    select: { expires: true },
  });

  const expiresAt = token?.expires?.getTime() ?? 0;

  return <VerifyEmailForm email={session.user.email!} expired={new Date(expiresAt)} />;
}
