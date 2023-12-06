import Link from "next/link";
import { Inter } from "next/font/google";
import "../globals.css";
import Footer from "../ui/auth/footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <div className="main"></div>
          <header className="z-20">
            <nav className="container py-2">
              <Link href="/">
                <img src="/assets/images/logo.png" alt="Logo" />
              </Link>
            </nav>
          </header>
          <main className="relative z-10 my-10 container">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
