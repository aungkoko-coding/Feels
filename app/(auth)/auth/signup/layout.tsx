import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Are you ready to use our amazing features?",
  openGraph: {
    title: "Sign Up",
    description: "Are you ready to use our amazing features?",
  },
};

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
