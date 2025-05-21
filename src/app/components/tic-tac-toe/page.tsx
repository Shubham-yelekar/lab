import React from "react";
import TicTacToe from "./TicTacToe";

const page = () => {
  return (
    <div className="relative h-full " style={{ height: "calc(100vh - 4rem)" }}>
      <TicTacToe />
    </div>
  );
};

export default page;
