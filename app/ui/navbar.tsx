"use client";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useSessionData from "../lib/hooks/useSessionData";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const { user, authenticated, loading } = useSessionData();
  const [errorLoadingAvatar, setErrorLoadingAvatar] = useState(false);
  const headerRef = useRef<HTMLHeadElement>(null);
  const signUpCallbackUrl = `/auth/signup?callbackUrl=${
    process.env.NEXT_PUBLIC_AUTH_URL
  }${pathname.slice(1)}`;

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 20) {
        headerRef.current?.classList.add("bg-white", "shadow-sm");
      } else {
        headerRef.current?.classList.remove("bg-white", "shadow-sm");
      }
    });
  }, []);

  return (
    <header ref={headerRef} className="z-20 sticky top-0 duration-200">
      <nav className="container px-1 flex py-2 items-center ">
        <Link href="/">
          <img src="/assets/images/logo.png" alt="Logo" />
        </Link>
        <div className="ml-auto flex">
          {user && (
            <>
              <ul className="flex items-center space-x-5 mr-4 text-orange-600">
                <li>
                  <Link href="/feed">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M168,120a12,12,0,0,1-5.12,9.83l-40,28A12,12,0,0,1,104,148V92a12,12,0,0,1,18.88-9.83l40,28A12,12,0,0,1,168,120Zm68-56V176a28,28,0,0,1-28,28H48a28,28,0,0,1-28-28V64A28,28,0,0,1,48,36H208A28,28,0,0,1,236,64Zm-24,0a4,4,0,0,0-4-4H48a4,4,0,0,0-4,4V176a4,4,0,0,0,4,4H208a4,4,0,0,0,4-4ZM160,216H96a12,12,0,0,0,0,24h64a12,12,0,0,0,0-24Z"></path>
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link href="/messages">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M120,128a16,16,0,1,1-16-16A16,16,0,0,1,120,128Zm32-16a16,16,0,1,0,16,16A16,16,0,0,0,152,112Zm84,16A108,108,0,0,1,78.77,224.15L46.34,235A20,20,0,0,1,21,209.66l10.81-32.43A108,108,0,1,1,236,128Zm-24,0A84,84,0,1,0,55.27,170.06a12,12,0,0,1,1,9.81l-9.93,29.79,29.79-9.93a12.1,12.1,0,0,1,3.8-.62,12,12,0,0,1,6,1.62A84,84,0,0,0,212,128Z"></path>
                    </svg>
                  </Link>
                </li>
              </ul>

              <div
                onClick={() =>
                  signOut({ callbackUrl: process.env.NEXT_PUBLIC_AUTH_URL })
                }
                className="rounded-full cursor-pointer w-10 h-10 p-[2px] border-2 border-orange-600  font-medium text-white"
              >
                <div className="bg_orange_gradient w-full uppercase h-full rounded-full flex items-center justify-center">
                  {user.imgUrl && !errorLoadingAvatar ? (
                    <img
                      src={user.imgUrl}
                      alt={user.username}
                      className="cover rounded-full"
                      onError={() => setErrorLoadingAvatar(true)}
                    />
                  ) : (
                    user.username[0]
                  )}
                </div>
              </div>
            </>
          )}
          {!(loading || authenticated) && (
            <div className="space-x-3">
              <Link
                href={signUpCallbackUrl}
                className="rounded-full border border-black text-black px-5 py-2 duration-200 hover:bg-black hover:text-white"
              >
                Sign Up
              </Link>
              <button
                onClick={() => signIn()}
                className="rounded-full border border-black bg-black text-white px-5 py-2 duration-200 hover:bg-black/80"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
