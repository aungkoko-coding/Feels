import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "../globals.css";
import "react-toastify/ReactToastify.min.css";
import Navbar from "../ui/navbar/navbar";
import Footer from "../ui/footer";
import ClientSessionProvider from "../lib/client-session-provider";
import QueryProvider from "../lib/query-provider";
import { ToastContainer } from "react-toastify";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Feels",
    template: "%s | Feels",
  },
  description:
    "Feels is an online platform where users can share their emotions anonymously. Similar to NGL, we go a step further by allowing users to attach a maximum of three YouTube videos along with their messages to easily express their feelings.",
  metadataBase: new URL(process.env.NEXT_METADATA_BASE!),
};

// export const dynamic = "force-static";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(authOptions);
  // console.log({ session });
  return (
    <html lang="en">
      <body className={inter.className}>
        <Script
          strategy="beforeInteractive"
          src="https://cdn.ably.com/lib/ably.min-1.js"
        />
        <div className="flex flex-col min-h-screen">
          <div className="main">
            <div className="gradient" />
          </div>
          <ToastContainer />
          <ClientSessionProvider>
            <QueryProvider>
              <Suspense fallback={<h1>Loading...</h1>}>
                {/* <AblyClientProvider> */}
                <Navbar />
                <main className="relative container px-1 mt-10">
                  {children}
                </main>
                <Footer />
                {/* </AblyClientProvider> */}
              </Suspense>
            </QueryProvider>
          </ClientSessionProvider>
        </div>
      </body>
    </html>
  );
}
