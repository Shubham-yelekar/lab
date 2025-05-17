import React from "react";
import ShinyButton from "./ShinyButton";
import Info from "./Info";

const page = () => {
  return (
    <div className="relative" style={{ height: "calc(100vh - 4rem)" }}>
      <ShinyButton />
      {/* <Info /> */}
    </div>
  );
};

export default page;
