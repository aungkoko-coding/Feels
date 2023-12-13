"use client";
import Ably from "ably/promises";
import { AblyProvider } from "ably/react";

const AblyClientProvider = ({ children }: { children: React.ReactNode }) => {
  const client = new Ably.Realtime.Promise(
    // process.env.NEXT_PUBLIC_ABLY_API_KEY!
    { authUrl: `${process.env.NEXT_PUBLIC_API_URL}/ably/auth` }
  );
  return <AblyProvider client={client}>{children}</AblyProvider>;
};

export default AblyClientProvider;
