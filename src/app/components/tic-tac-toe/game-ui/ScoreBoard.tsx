import { motion } from "motion/react";
import React from "react";

type ScoreBoardProps = {
  isWinner: string | null;
  isXnext: boolean;
};

const ScoreBoard = ({ isWinner, isXnext }: ScoreBoardProps) => {
  return (
    <div className="h-24 w-60 mb-4 flex flex-col gap-2 justify-between items-center">
      <div className="font-bold text-2xl "> Play Tic Tac Toe </div>
      {!isWinner ? (
        <div className="relative flex items-center justify-between gap-8 p-2 w-full">
          <motion.div className="font-bold text-2xl text-[#B17457] p-2">
            Player X
          </motion.div>
          <motion.div
            layout
            style={{
              left: isXnext ? "-2%" : "60%",
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="w-32 h-12 bg-[#E9E5D9] rounded-4xl  absolute -z-10"
          ></motion.div>
          <motion.div className="font-bold text-[#577EB1] text-2xl">
            Player O
          </motion.div>
        </div>
      ) : (
        <motion.h3 layout className="font-bold text-2xl">
          {isWinner === "X" ? (
            <span className="text-[#B17457]">Player X</span>
          ) : (
            <span className="text-[#577EB1]">Player O</span>
          )}{" "}
          wins !!
        </motion.h3>
      )}
    </div>
  );
};

export default ScoreBoard;
