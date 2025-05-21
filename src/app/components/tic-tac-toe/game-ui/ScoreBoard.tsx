import { motion } from "motion/react";
import React from "react";

type ScoreBoardProps = {
  isWinner: string | null;
  isXnext: boolean;
};

const ScoreBoard = ({ isWinner, isXnext }: ScoreBoardProps) => {
  console.log(isWinner);

  return (
    <div className="h-18 mb-4 flex flex-col gap-2 justify-between items-center">
      <div className="font-bold text-2xl "> Round 1 </div>
      {!isWinner ? (
        <div className="relative flex items-center justify-between gap-8 p-2">
          <motion.div className="font-bold text-2xl">Player X</motion.div>
          <motion.div
            layout
            style={{
              left: isXnext ? "-8%" : "50%",
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="w-5/8 h-8 bg-amber-200 rounded-4xl  absolute -z-10"
          ></motion.div>
          <motion.div className="font-bold text-2xl">Player O</motion.div>
        </div>
      ) : (
        <h3 className="font-bold text-2xl">Winner : {isWinner}</h3>
      )}
    </div>
  );
};

export default ScoreBoard;
