import Step from "../../ui/step";

const UsageGuidePage = () => {
  return (
    <section>
      <h1 className="text-4xl font-extrabold title-font text-center lg:text-start">
        How to use?
      </h1>
      <ul className="my-16 space-y-10">
        <Step step={1} description="Create an account." />
        <Step step={2} description="Once you have an account, go to profile." />
        <Step
          step={3}
          description={
            <>
              You will see two options to share your link. Choose any option,
              share it on any social media platform, and wait for incoming
              anonymous messages. Don&apos;t forget to put caption like
              &quot;Share your thoughts and emotions anonymously!&quot;.
            </>
          }
        />
        <Step
          step={4}
          description="You can share any incoming messages attached with your replies."
        />
      </ul>
    </section>
  );
};

export default UsageGuidePage;
