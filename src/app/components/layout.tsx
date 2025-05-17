"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { Geist_Mono } from "next/font/google";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  return (
    <div className="">
      <div className="p-4 w-full h-8 md:h-16 border-b-1 border-neutral-300 flex items-center justify-center ">
        <p className={`${geistMono.className} text-neutral-500 text-sm  `}>
          {pathname}
        </p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
