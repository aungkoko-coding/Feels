import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feed",
  description: "Discover the latest videos of what others shared.",
  openGraph: {
    title: "Feed | Feels",
    description: "Discover the latest videos of what others shared.",
  },
};

const FeedLayout = ({
  children,
}: // play_modal,
{
  children: React.ReactNode;
  // play_modal: React.ReactNode;
}) => {
  return children;
};

export default FeedLayout;
