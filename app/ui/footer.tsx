import Link from "next/link";

const Footer = () => {
  return (
    <footer className="z-10 relative py-3 mt-auto bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500">
      <div className="container px-1 flex flex-col items-center text-white">
        <Link href="/guide" className="italic underline">
          Usage Guide?
        </Link>
        <p>&copy;2023 Aung Ko Ko. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
