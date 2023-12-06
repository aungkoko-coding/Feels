"use client";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  return (
    <header className="z-20 backdrop-blur-sm sticky top-0">
      <nav className="container px-1 flex py-2 items-center ">
        <Link href="/">
          <img src="/assets/images/logo.png" alt="Logo" />
        </Link>
        <div className="ml-auto space-x-2">
          <button
            onClick={() =>
              signOut({ callbackUrl: process.env.NEXT_PUBLIC_AUTH_URL })
            }
            className="rounded-full border border-black text-black px-5 py-2 duration-200 hover:bg-black hover:text-white"
          >
            Sign Up
          </button>
          <button
            onClick={() => signIn()}
            className="rounded-full border border-transparent bg-black text-white px-5 py-2 duration-200 hover:bg-black/80"
          >
            Sign In
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
