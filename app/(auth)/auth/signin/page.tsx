"use client";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { passwordRegex, usernameRegex } from "@/app/lib/regexs";
import { apiUrl } from "@/app/lib/variables";
import Alert from "@/app/ui/alert";

const authenticate = (username: string, password: string) => {
  return axios.post(`${apiUrl}/auth/signin`, {
    username,
    password,
  });
};

const SignInPage = () => {
  const [formError, setFormError] = useState<{
    errorAt?: "username" | "password";
    warnType?: boolean;
    message: string;
  } | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const searchParams = useSearchParams();
  const rootCallbackUrl = process.env.NEXT_PUBLIC_AUTH_URL;
  const callbackUrl = searchParams.get("callbackUrl") || rootCallbackUrl;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value.trim(),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameRegex.test(formData.username)) {
      setFormError({
        errorAt: "username",
        warnType: true,
        message:
          "Username should not contain special characters and whitespace!",
      });
    } else if (!passwordRegex.test(formData.password)) {
      setFormError({
        errorAt: "password",
        warnType: true,
        message: "Password should contain at least 8 characters!",
      });
    } else {
      (async () => {
        try {
          setIsAuthenticating(true);
          const { data } = await authenticate(
            formData.username,
            formData.password
          );
          signIn("credentials", {
            data: JSON.stringify(data),
            redirect: true,
            callbackUrl,
          });
        } catch (err) {
          setIsAuthenticating(false);
          if (err instanceof AxiosError) {
            setFormError({
              message: err.response?.data.message || err.message,
            });
            return;
          }
          setFormError({ message: (err as Error)?.message });
        }
      })();
    }

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
        <Alert
          show={!!formError}
          warnType={formError?.warnType}
          message={formError?.message || ""}
          fontSize="text-sm"
        />
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
        <button className="px-5 py-4 flex items-center justify-center text-center active:scale-95 duration-200 outline-none w-full rounded-md text-white bg_orange_gradient">
          {isAuthenticating ? (
            <svg
              className="rotate"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M140,32V64a12,12,0,0,1-24,0V32a12,12,0,0,1,24,0Zm33.25,62.75a12,12,0,0,0,8.49-3.52L204.37,68.6a12,12,0,0,0-17-17L164.77,74.26a12,12,0,0,0,8.48,20.49ZM224,116H192a12,12,0,0,0,0,24h32a12,12,0,0,0,0-24Zm-42.26,48.77a12,12,0,1,0-17,17l22.63,22.63a12,12,0,0,0,17-17ZM128,180a12,12,0,0,0-12,12v32a12,12,0,0,0,24,0V192A12,12,0,0,0,128,180ZM74.26,164.77,51.63,187.4a12,12,0,0,0,17,17l22.63-22.63a12,12,0,1,0-17-17ZM76,128a12,12,0,0,0-12-12H32a12,12,0,0,0,0,24H64A12,12,0,0,0,76,128ZM68.6,51.63a12,12,0,1,0-17,17L74.26,91.23a12,12,0,0,0,17-17Z"></path>
            </svg>
          ) : (
            <span>Sign in</span>
          )}
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
