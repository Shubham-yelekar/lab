"use client";
import {
  useMotionValue,
  useTransform,
  motion,
  MotionValue,
  useSpring,
} from "motion/react";
import React, { useRef } from "react";

const AppleDock = () => {
  let mouseX = useMotionValue(Infinity);

  return (
    <div className="h-full w-full">
      <div
        onMouseMove={(e) => {
          mouseX.set(e.pageX);
        }}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="bg-white/30 mx-auto h-16 flex px-2 pb-3 gap-3 items-end rounded-3xl border border-white/20 md:p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:gap-4 "
      >
        {Items.map((item, id) => (
          <AppIcon key={id} mouseX={mouseX} />
        ))}
      </div>
    </div>
  );
};

function AppIcon({ mouseX }: { mouseX: MotionValue }) {
  let ref = useRef<HTMLDivElement>(null);
  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });
  let widthSync = useTransform(distance, [-100, 0, 100], [40, 80, 40]);
  let width = useSpring(widthSync, { damping: 10, mass: 0.2, stiffness: 100 });
  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className="aspect-square w-10 rounded-full  bg-white md:w-14 md:rounded-3xl"
    ></motion.div>
  );
}

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
