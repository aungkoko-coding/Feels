import Link from "next/link";

const AboutPage = () => {
  return (
    <section className="flex flex-col items-center">
      <h1 className="title-font italic tracking-tighter text-5xl select-none sm:text-6xl text-orange-600 py-2 text-center">
        Feels
      </h1>
      <p className="desc text-center">
        is an online platform where users can share their emotions anonymously.
        Similar to{" "}
        <a
          href="https://ngl.link/"
          target="_blank"
          className="text-xl font-bold"
        >
          NGL
        </a>
        , we go a step further by allowing users to attach a maximum of three
        YouTube videos along with their messages to easily express their
        feelings. Moreover, we offer an option to share these YouTube videos
        publicly, visible only to authenticated users. Sounds amazing, right?
        Let&apos;s start using{" "}
        <Link
          href="/"
          className="font-bold italic title-font text-orange-600 tracking-tighter select-none"
        >
          Feels
        </Link>
        !
      </p>
    </section>
  );
};

export default AboutPage;
