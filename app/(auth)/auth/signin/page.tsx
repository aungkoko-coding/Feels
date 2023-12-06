"use client";
import Link from "next/link";
import { useState } from "react";

const SignInPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="bg-white shadow-md px-10 py-8 max-w-[500px] mx-auto rounded-md">
      <h1 className="text-3xl font-extrabold">Sign in</h1>
      <p className="text-sm mt-1 text-black/90 font-medium">
        Hey! Welcome back!
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
        href="/auth/signup"
        className="text-center mt-4 block text-sm hover:underline duration-200 text-blue-800"
      >
        Create account
      </Link>
    </section>
  );
};

export default SignInPage;
