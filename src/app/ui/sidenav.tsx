"use client";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { Dot } from "lucide-react";
import { pageLinks } from "./Links";

export default function SideNav() {
  const pathname = usePathname();
  const [menuToggle, setToggleMenu] = useState<boolean>(false);
  return (
    <div className="relative flex w-full justify-between border-b-1 border-neutral-300 md:flex-col md:justify-start md:h-screen md:w-64 xl:w-72 md:border-r-1 ">
      <div className="flex gap-2 items-center px-4 h-16 border-gray-300 md:border-b md:gap-1 ">
        <p className="font-bold text-lg">LAB</p>
        <a
          href="https://shubhamyelekar.vercel.app/"
          target="_blank"
          className="cursor-pointer px-3 py-1 text-sm w-fit bg-neutral-200 rounded-3xl hover:bg-red-500 hover:text-white transition-all duration-300"
        >
          @shubham
        </a>
      </div>
      <button
        onClick={() => setToggleMenu(!menuToggle)}
        className="bg-neutral-900 px-4 text-white cursor-pointer md:hidden"
      >
        {menuToggle ? "Close" : "Menu"}
      </button>
      <div
        className={clsx(
          "absolute z-2 bg-neutral-50 w-screen p-4 top-16 flex flex-col ",
          menuToggle ? "block" : "hidden",
          "md:flex md:static md:w-full md:bg-transparent"
        )}
      >
        {pageLinks.map((page, id) => (
          <Link
            key={`${page.name}-page`}
            href={page.href}
            className={clsx(
              "p-2 font-medium flex group transition-all duration-300",
              pathname === page.href ? " text-red-500" : "text-black"
            )}
          >
            <Dot
              className={clsx(
                "transition-all duration-300",
                pathname === page.href
                  ? "scale-100 w-7 opacity-100 "
                  : "scale-0 w-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-hover:w-7 "
              )}
            />{" "}
            {page.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
