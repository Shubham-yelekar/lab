"use client";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";

export default function SideNav() {
  const [menuToggle, setToggleMenu] = useState<boolean>(false);
  return (
    <div className="relative flex w-full justify-between bg-blue-100 md:flex-col md:justify-start md:h-screen md:w-52 xl:w-72">
      <div className="text-4xl p-2 font-bold cursor-pointer">LAB</div>
      <button
        onClick={() => setToggleMenu(!menuToggle)}
        className="bg-blue-200 px-2 cursor-pointer md:hidden"
      >
        {menuToggle ? "Close" : "Menu"}
      </button>
      <div
        className={clsx(
          "absolute z-2 bg-amber-50 w-screen p-4 top-9 flex flex-col gap-2 mt-4",
          menuToggle ? "block" : "hidden",
          "md:flex md:static md:w-full md:bg-transparent"
        )}
      >
        <a href="#">Shiny Button</a>
        <a href="#">Link Hover</a>
      </div>
    </div>
  );
}
