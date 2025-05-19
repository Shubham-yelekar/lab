"use client";
import React from "react";
import { motion } from "motion/react";
import { Geist_Mono } from "next/font/google";
import { useScrambledText } from "./useScrambled";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const HackerText = () => {
  const { text, scramble, stopScramble } = useScrambledText("Hacker-Text");
  return (
    <motion.span
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      initial={{ opacity: 0.6 }}
      whileHover={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`${geistMono.className}`}
    >
      {text}
    </motion.span>
  );
};

export default HackerText;
