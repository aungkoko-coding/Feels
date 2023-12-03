import Step from "../ui/step";

const UsageGuidePage = () => {
  return (
    <section>
      <h1 className="text-4xl font-extrabold title-font">How to use?</h1>
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
              &quot;Tell me what you all feel&quot;.
            </>
          }
        />
        <Step
          step={4}
          description="You can share any incoming messages optionally attached with your reply."
        />
      </ul>
    </section>
  );
};

export default UsageGuidePage;
