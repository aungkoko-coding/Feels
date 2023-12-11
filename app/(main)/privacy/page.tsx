const PrivacyPage = () => {
  return (
    <section className="flex flex-col items-center">
      <img src="/assets/images/privacy.png" alt="Privacy Image" />
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
