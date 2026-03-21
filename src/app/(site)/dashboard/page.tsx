import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SignOutButton from "./SignOutButton";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) redirect("/login");

  return (
    <div>
          <h1>Welcome, {session.user?.name ?? session.user?.email}!</h1>
      <SignOutButton />
    </div>
  );
}
