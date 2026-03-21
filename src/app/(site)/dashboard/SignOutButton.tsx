"use client";

import { logoutUser } from "@/lib/actions/action";

export default function SignOutButton() {
  return <button onClick={logoutUser}>Sign Out</button>;
}
