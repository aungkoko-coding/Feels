import Link from "next/link";

const Footer = () => {
  return (
    <footer className="z-10 relative py-3 mt-auto bg-orange-600">
      <div className="container px-1 flex flex-col items-center space-y-5 text-white">
        <div className="flex space-x-6 text-sm">
          <Link href="/about" className="hover:underline duration-200">
            About
          </Link>
          <Link href="/privacy" className="hover:underline duration-200">
            Privacy
          </Link>
          <Link href="/guide" className="hover:underline duration-200">
            Usage Guide
          </Link>
          <a
            href="mailto: feels&emotions@gmail.com"
            className="hover:underline duration-200"
          >
            Contact Us
          </a>
        </div>
        <p className="text-sm">&copy;2023 Aung Ko Ko. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
