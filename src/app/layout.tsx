import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import SideNav from "./ui/sidenav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shubham's Lab",
  description: "Shubham's Lab",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.className} antialiased outline-1 outline-red-500`}
    >
      <body className="flex h-screen  flex-col md:flex-row">
        <SideNav />
        <main className="flex-1 overflow-y-scroll">{children}</main>
      </body>
    </html>
  );
}
