import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const useScrambledText = (
  targetText: string,
  cyclesPerLetter = 2,
  ShuffleTime = 50
) => {
  const [text, setText] = useState(targetText);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = targetText
        .split("")
        .map((char, index) => {
          if (pos / cyclesPerLetter > index) return char;
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setText(scrambled);
      pos++;
      if (pos >= targetText.length * cyclesPerLetter) {
        stopScramble();
      }
    }, ShuffleTime);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);
    setText(targetText);
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current || undefined);
    };
  }, []);

  return { text, scramble, stopScramble };
};
