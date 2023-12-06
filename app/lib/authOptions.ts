import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authenticate = (username: string, password: string) => {
  return axios.post("http://localhost:3001/auth/signin", {
    username,
    password,
  });
};

// If we need to access authOptions from somewhere else rather than [...authOptions] route, it's better to separate module and export authOptions. Otherwise, it will mismatch with the route handler exports of NextAuth and build will fail.
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (typeof credentials !== "undefined") {
          const { data: res } = await authenticate(
            credentials.username,
            credentials.password
          );
          if (typeof res !== "undefined") {
            // console.log({ res });
            return { ...res.user, apiToken: res.token };
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    // the returned value of this callback will be passed as the "token" property of session callback param object.
    async jwt({ user, token }) {
      // the user value is the returned value of "authorize" callback function.
      // You must type guard because sometimes the "user" value is undefined. I noticed this callback runs twice.
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user = token.user;
      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};
