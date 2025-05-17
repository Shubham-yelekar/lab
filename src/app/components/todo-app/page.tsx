import React from "react";
import Todo from "./Todo";

const page = () => {
  return (
    <div
      className="relative bg-neutral-100"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <Todo />
    </div>
  );
};

export default page;
