import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Footer from "../ui/footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-[120vh] bg_orange_gradient">
          <main className="relative z-10 container px-1 mt-10">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
