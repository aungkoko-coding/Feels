import MessageBox from "./message-box";
import { notFound } from "next/navigation";
import { apiUrl } from "@/app/lib/variables";
import { Metadata } from "next";

export type UserType = {
  username: string;
  imgUrl?: string;
};

export const generateStaticParams = async () => {
  const res = await fetch(`${apiUrl}/users`);
  const users: UserType[] = await res.json();

  return users.map((user) => ({
    username: user.username,
  }));
};

export const generateMetadata = async ({
  params: { username },
}: {
  params: { username: string };
}): Promise<Metadata> => {
  const res = await fetch(`${apiUrl}/users/${username}`);
  if (!res.ok) {
    notFound();
  }

  return {
    title: "Send Anonymous Message",
    description: `Send anonymous messages to ${username}`,
    openGraph: {
      title: "Send Anonymous Message",
      description: `Send anonymous messages to ${username}`,
    },
  };
};

const SendAnonymousPage = async ({
  params,
}: {
  params: { username: string };
}) => {
  const { username } = params;
  const res = await fetch(`${apiUrl}/users/${username}`, {
    next: { tags: ["user", username] },
  });
  if (!res.ok) {
    notFound();
  }
  const user: UserType = await res.json();
  return <MessageBox user={user} />;
};

export default SendAnonymousPage;
