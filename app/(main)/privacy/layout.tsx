import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "See how Feels respect your privacy.",
  openGraph: {
    title: "Privacy | Feels",
    description: "See how Feels respect your privacy.",
  },
};

const PrivacyLayout = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default PrivacyLayout;
