"use client";
import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

type GameBoardProps = {
  squares: (string | null)[];
  setSquares: Dispatch<SetStateAction<(string | null)[]>>;
  isXnext: boolean;
  setXnext: Dispatch<SetStateAction<boolean>>;
  isWinner: string | null;
  setIsWinner: Dispatch<SetStateAction<string | null>>;
};

const GameBoard = ({
  squares,
  setSquares,
  isXnext,
  setXnext,
  setIsWinner,
  isWinner,
}: GameBoardProps) => {
  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      setIsWinner(winner);
    }
  }, [squares, setIsWinner]);

  const handleClick = (id: number) => {
    if (squares[id] || calculateWinner(squares)) {
      return; // return if square index contains any value
    }
    setSquares((prev) => {
      const updated = [...prev]; // copy of the array
      isXnext ? (updated[id] = "X") : (updated[id] = "O"); // check for X's Turn
      setXnext(!isXnext); // toggle the turn
      return updated; // returns updated sqrares array
    });
  };

  return (
    <>
      <div
        className={`${caveat.className} antialiased grid grid-cols-3 gap-1.5 bg-[#D8D2C2] w-fit`}
      >
        {squares.map((sqr, id) => (
          <Square
            isXnext={isXnext}
            value={sqr}
            onClick={() => handleClick(id)}
            key={id}
          />
        ))}
      </div>
    </>
  );
};

type SquareProps = {
  value: string | null;
  onClick: () => void;
  isXnext: boolean;
};

const Square = ({ value, onClick, isXnext }: SquareProps) => {
  const textColor = value === "X" ? "#B17457" : "#577EB1";

  return (
    <button
      className="bg-white w-24 aspect-square grid place-items-center"
      data-value={value}
      onClick={onClick}
    >
      <span style={{ color: textColor }} className="font-bold text-6xl">
        {value}
      </span>
    </button>
  );
};

function calculateWinner(squares: (string | null)[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default GameBoard;
