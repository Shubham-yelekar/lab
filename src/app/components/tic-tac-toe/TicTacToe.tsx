"use client";
import React, { useState } from "react";
import GameBoard from "./game-ui/GameBoard";
import ScoreBoard from "./game-ui/ScoreBoard";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const renderBoard = () => {
  return Array(9).fill(null); // creating a array of '9' items with value of 'null'
};

const TicTacToe = () => {
  const freshBoard = renderBoard();
  const [squares, setSquares] = useState<(string | null)[]>(freshBoard); // squares array
  const [isXnext, setXnext] = useState<boolean>(true); // tracks X's turn
  const [isWinner, setIsWinner] = useState<string | null>(null);

  function resetGame() {
    setSquares(freshBoard);
    setXnext(true);
    setIsWinner(null);
  }

  return (
    <div
      className={`${caveat.className} flex flex-col h-full items-center justify-center`}
    >
      <ScoreBoard isWinner={isWinner} isXnext={isXnext} />
      <GameBoard
        squares={squares}
        setSquares={setSquares}
        isXnext={isXnext}
        setXnext={setXnext}
        isWinner={isWinner}
        setIsWinner={setIsWinner}
      />
      <button onClick={resetGame}>Reset</button>
    </div>
  );
};

export default TicTacToe;
