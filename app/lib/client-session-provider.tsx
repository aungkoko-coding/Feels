"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export default function ClientSessionProvider({
  children,
  session,
}: {
  session?: Session | null | undefined;
  children: React.ReactNode;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
