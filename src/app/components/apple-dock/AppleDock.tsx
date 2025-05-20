"use client";
import { useMotionValue, useTransform, motion } from "motion/react";
import React from "react";

const AppleDock = () => {
  let mouseX = useMotionValue(0);
  let width = useTransform(mouseX, [0, 300], [40, 60]);
  return (
    <div className="h-full w-full">
      <div
        onMouseMove={(e) => {
          mouseX.set(e.pageX);
          console.log(e.pageX);
        }}
        className="bg-white/30 rounded-3xl border border-white/20 p-2  md:p-4 absolute flex gap-3  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:gap-4 "
      >
        {Items.map((item, id) => (
          <motion.div
            style={{ width }}
            className="aspect-square w-10 rounded-xl  bg-white md:w-14 md:rounded-3xl"
            key={id}
          ></motion.div>
        ))}
      </div>
    </div>
  );
};

const Items = [
  {
    name: "chrome",
  },
  {
    name: "Work",
  },
  {
    name: "Work",
  },
  {
    name: "Work",
  },
  {
    name: "Work",
  },
  {
    name: "Work",
  },
];

export default AppleDock;
