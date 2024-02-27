import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/nav/NavBar";
import SessionProvider from "@/components/session-provider";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Jaehyeon Blog",
    default: "Jaehyeon Blog",
  },
  description: "description",
  openGraph: {
    title: "Jaehyeon",
    url: process.env.SITE_URL,
    siteName: "Jaehyeon Blog",
    images: "/vercel.svg",
    type: "website",
  },
  keywords: ["Jaehyeon", "Wunhyeon"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="max-w-7xl mx-auto p-10 space-y-10">
            <NavBar />
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
        <SessionProvider />
        <Footer />
      </body>
    </html>
  );
}
