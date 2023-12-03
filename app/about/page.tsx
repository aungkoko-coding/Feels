import Link from "next/link";

const AboutPage = () => {
  return (
    <section className="flex flex-col items-center">
      <h1 className="title-font italic text-5xl font-extrabold sm:text-6xl text-orange-600 py-2 text-center">
        Feels
      </h1>
      <p className="desc text-center">
        is an online platform on which users can share their emotions
        anonymously. It is similar to{" "}
        <a
          href="https://ngl.link/"
          target="_blank"
          className="text-xl font-bold"
        >
          NGL
        </a>
        , but we additionally allow users to attach maximum three youtube videos
        along with their messages to easily express their feelings. We also
        provide an option to share those youtube videos publicly, only
        authenticated users can see. Sound amazing, right? Let&apos;s start
        using{" "}
        <Link href="/" className="font-bold italic title-font text-orange-600">
          Feels
        </Link>
        !
      </p>
    </section>
  );
};

export default AboutPage;
