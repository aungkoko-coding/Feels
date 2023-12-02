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
        <img src="/assets/images/hero.png" alt="Hero Image" className="mt-2" />
        <div className="gradient" />
        <div className="mt-10 flex justify-center">
          <div className="space-x-5 flex">
            <p>
              Total Users: <span className="font-bold">5</span>
            </p>
            <p>
              Total Messages: <span className="font-bold">10</span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
