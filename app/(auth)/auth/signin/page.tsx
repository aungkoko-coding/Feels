"use client";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const authenticate = (username: string, password: string) => {
  return axios.post(`${apiUrl}/auth/signin`, {
    username,
    password,
  });
};

const SignInPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const searchParams = useSearchParams();
  const rootCallbackUrl = process.env.NEXT_PUBLIC_AUTH_URL;
  const callbackUrl = searchParams.get("callbackUrl") || rootCallbackUrl;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    (async () => {
      const { data } = await authenticate(formData.username, formData.password);
      signIn("credentials", {
        data: JSON.stringify(data),
        redirect: true,
        callbackUrl,
      });
    })();
    // console.log(callbackUrl, rootCallbackUrl);
  };

  return (
    <section className="bg-white shadow-md px-10 py-8 max-w-[500px] mx-auto rounded-md">
      <h1 className="text-3xl font-extrabold">Sign in</h1>
      <p className="text-sm mt-1 text-black/90 font-medium">
        {callbackUrl === rootCallbackUrl
          ? "Hey! Welcome back!"
          : "You need to sign in to use our features!"}
      </p>
      <form onSubmit={handleSubmit} className="mt-7 space-y-4">
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          type="text"
          placeholder="Username"
          className="px-5 py-4 outline-none border border-black/60 w-full rounded-md"
        />
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
          className="px-5 py-4 outline-none border border-black/60 w-full rounded-md"
        />
        <button className="px-5 py-4 active:scale-95 duration-200 outline-none w-full rounded-md text-white bg_orange_gradient">
          Sign in
        </button>
      </form>
      <Link
        href={`/auth/signup?callbackUrl=${callbackUrl}`}
        className="text-center mt-4 block text-sm hover:underline duration-200 text-blue-800"
      >
        Create account
      </Link>
    </section>
  );
};

export default SignInPage;
