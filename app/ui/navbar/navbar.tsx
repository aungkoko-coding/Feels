"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useSessionData from "../../lib/hooks/useSessionData";
import { useState, useEffect, useRef } from "react";
import MessageNotification from "./message-notification";
import authLoadingAni from "../../lib/animations/auth-loading-ani.json";
import Lottie from "lottie-react";

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
          <img src="/assets/images/logo.png" alt="Logo" className="w-16 h-10" />
        </Link>
        <div className="ml-auto flex relative">
          {loading && (
            <span className="absolute right-0 top-1/2 -translate-y-1/2">
              <Lottie
                animationData={authLoadingAni}
                style={{ width: 100, height: 100 }}
              />
            </span>
          )}
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
                  <MessageNotification />
                </li>
              </ul>

              <div className="rounded-full cursor-pointer w-10 h-10 p-[2px] border-2 border-orange-600  font-medium text-white">
                <Link
                  href="/profile"
                  className="bg_orange_gradient w-full uppercase h-full rounded-full flex items-center justify-center"
                >
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
                </Link>
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
