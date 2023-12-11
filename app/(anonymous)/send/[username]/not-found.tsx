"use client";
import Lottie from "lottie-react";
import notFoundAnimation from "../../../lib/animations/not-found-ani.json";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center text-white">
      <Lottie
        animationData={notFoundAnimation}
        style={{ width: 300, height: 300 }}
      />
      <p className="text-2xl">User not found!</p>
    </div>
  );
}
