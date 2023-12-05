"use client";
import { useCallback, useRef, useEffect, MouseEventHandler } from "react";
import { useRouter } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef(null);
  const wrapper = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onDismiss();
    },
    [onDismiss]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      wrapper.current?.classList.remove("translate-y-1/2");
      wrapper.current?.classList.add("translate-y-0");
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      ref={overlay}
      className="fixed z-[9999] left-0 right-0 top-0 bottom-0 bg-black/60"
    >
      <button onClick={onDismiss} className="text-white absolute right-2 top-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          viewBox="0 0 256 256"
        >
          <path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path>
        </svg>
      </button>
      <div
        ref={wrapper}
        className="absolute top-10 translate-y-1/2 left-0 right-0 bottom-0 pt-5 bg-white rounded-t-xl duration-300"
      >
        <div className="overflow-auto h-full thin-scrollbar">
          <div className="container">{children}</div>
        </div>
      </div>
    </div>
  );
}
