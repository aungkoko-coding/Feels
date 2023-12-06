import axios from "axios";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const authenticate = (username: string, password: string) => {
  return axios.post(`${apiUrl}/auth/signin`, {
    username,
    password,
  });
};

// If we need to access authOptions from somewhere else rather than [...authOptions] route, it's better to separate module and export authOptions. Otherwise, it will mismatch with the route handler exports of NextAuth and build will fail.
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req) {
        // credentials value can be received from default sign in page or signIn function's second argument
        if (typeof credentials !== "undefined") {
          const data = JSON.parse(credentials.data); // see the shape of credentials in signin and signup page.

          return { ...data.user, apiToken: data.token };
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

// async authorize(credentials, req) {
//   if (typeof credentials !== "undefined") {
//     // console.log({ credentials });
//     const { data: res } = await authenticate(
//       credentials.username,
//       credentials.password
//     );
//     // console.log({ res });
//     if (typeof res !== "undefined") {
//       // console.log({ res });
//       return { ...res.user, apiToken: res.token };
//     } else {
//       return null;
//     }
//   } else {
//     return null;
//   }
// }
