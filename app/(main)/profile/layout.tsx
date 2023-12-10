import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Explore and manage your account.",
};

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ProfileLayout;
