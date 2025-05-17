import React from "react";

import AnimatedTabs from "./AnimatedTabs";

const page = () => {
  return (
    <div className="relative" style={{ height: "calc(100vh - 4rem)" }}>
      <AnimatedTabs />
      {/* <Info /> */}
    </div>
  );
};

export default page;
