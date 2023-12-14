import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to use our amazing features.",
  openGraph: {
    title: "Sign In",
    description: "Sign in to use our amazing features.",
  },
  metadataBase: new URL(process.env.NEXT_METADATA_BASE!),
};
export default function SignLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
