import React from "react";
import AppleDock from "./AppleDock";

const page = () => {
  return (
    <div
      className="relative h-full bg-[url(/image-mesh-gradient.webp)] bg-no-repeat bg-center bg-cover"
      style={{ height: "calc(100vh - 4rem)" }}
    >
      <AppleDock />
    </div>
  );
};

export default page;
