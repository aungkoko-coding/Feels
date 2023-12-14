"use client";
import Lottie from "lottie-react";
import privacyAnimation from "../../lib/animations/privacy-ani.json";

const PrivacyPage = () => {
  return (
    <section className="flex flex-col items-center mb-28">
      <div className="flex justify-center">
        <Lottie
          animationData={privacyAnimation}
          style={{ width: 250, height: 250 }}
        />
      </div>
      <h1 className="title-font text-5xl font-extrabold sm:text-6xl orange_gradient py-2 text-center">
        We Respect Your Privacy
      </h1>
      <p className="desc text-center">
        Please feel free to share your emotions as we store your messages in
        secure way. Additionally, we do not collect sender information for
        anonymous messages. Your privacy is our priority.
      </p>
    </section>
  );
};

export default PrivacyPage;
