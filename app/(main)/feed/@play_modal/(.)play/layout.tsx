import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Play | Feels",
  description: "Watch videos of what others shared.",
  openGraph: {
    title: "Play | Feels",
    description: "Watch videos of what others shared.",
  },
};

const PlayLayout = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default PlayLayout;
