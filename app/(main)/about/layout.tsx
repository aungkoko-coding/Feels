import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "is an online platform where users can share their emotions anonymously. Similar to NGL, we go a step further by allowing users to attach a maximum of three YouTube videos along with their messages to easily express their feelings. Moreover, we offer an option to share these YouTube videos publicly, visible only to authenticated users. Sounds amazing, right? Let's start using Feels!",
  openGraph: {
    title: "About | Feels",
    description:
      "is an online platform where users can share their emotions anonymously. Similar to NGL, we go a step further by allowing users to attach a maximum of three YouTube videos along with their messages to easily express their feelings. Moreover, we offer an option to share these YouTube videos publicly, visible only to authenticated users. Sounds amazing, right? Let's start using Feels!",
  },
};

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default AboutLayout;
