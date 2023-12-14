"use client";
import Lottie from "lottie-react";
import heroAni from "../lib/animations/hero-ani.json";

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center relative mb-10">
        <h1 className="head_text text-center">
          Share the Emotion,
          <br className="max-md:hidden" />
          <span className="orange_gradient text-center">
            Feel the Connection
          </span>
        </h1>
        <p className="desc text-center">
          Break free from constraints. Share your emotions openly and
          authentically through anonymous messages paired with handpicked
          YouTube links. Your feelings, your way.
        </p>
        <Lottie animationData={heroAni} style={{ width: 200, height: 200 }} />
      </section>
    </>
  );
}
