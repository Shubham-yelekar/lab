import React from "react";
import KanbanBoard from "./KanbanBoard";

const page = () => {
  return (
    <div className="relative h-full" style={{ height: "calc(100vh - 4rem)" }}>
      <KanbanBoard />
    </div>
  );
};

export default page;
