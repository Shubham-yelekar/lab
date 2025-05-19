import React from "react";
import HackerText from "./HackerText";

const page = () => {
  return (
    <div
      className="relative  bg-neutral-200 h-full flex items-center justify-center text-4xl uppercase cursor-pointer"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <HackerText />
    </div>
  );
};

export default page;
