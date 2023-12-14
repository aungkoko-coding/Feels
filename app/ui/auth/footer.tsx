import Link from "next/link";

const Footer = () => {
  return (
    <footer className="z-10 relative py-3 mt-auto">
      <div className="container px-1 flex flex-col items-center space-y-5 ">
        <div className="flex space-x-6 text-sm">
          <Link href="/about" className="underline">
            About
          </Link>
          <Link href="/privacy" className="underline">
            Privacy
          </Link>
          <a href="mailto: feels&emotions@gmail.com" className="underline">
            Contact Us
          </a>
        </div>
        <p className="text-sm">&copy;2023 Aung Ko Ko. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
