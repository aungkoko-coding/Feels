import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guide",
  description: "Step by step guide of how to use Feels.",
  openGraph: {
    title: "Guide | Feels",
    description: "Step by step guide of how to use Feels.",
  },
};

const UsageGuideLayout = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default UsageGuideLayout;
