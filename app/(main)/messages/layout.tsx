import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages",
};

const MessagesLayout = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default MessagesLayout;
