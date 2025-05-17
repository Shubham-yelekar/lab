"use client";
import React from "react";
import "./shiny-button.css";
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimationFrame,
} from "framer-motion";

const ShinyButton = () => {
  const x = useMotionValue(100); // start from 100%
  const xPercent = useTransform(x, (v) => `${v}%`);

  // Optional: Animate manually if you want a continuous loop
  useAnimationFrame((t) => {
    x.set(100 - ((t / 20) % 200)); // loops between 100% and -100%
  });

  return (
    <div className="bg-neutral-950 h-full flex items-center justify-center">
      <motion.button
        className="px-16 py-8 rounded-full relative radial-gradient"
        style={{ "--x": xPercent } as React.CSSProperties} // ✅ safe animation
        whileTap={{ scale: 0.97 }}
        transition={{
          type: "spring",
          stiffness: 20,
          damping: 15,
          mass: 2,
        }}
      >
        <motion.span className="text-neutral-100 tracking-wide font-regular text-2xl h-full w-full block relative linear-mask">
          Start Now
        </motion.span>
        <span className="block absolute inset-0 rounded-full p-[4px] linear-overlay"></span>
      </motion.button>
    </div>
  );
};

export default ShinyButton;
