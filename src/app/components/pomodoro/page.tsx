import React from "react";
import Pomodoro from "./app/Pomodoro";
import { ThemeProvider } from "./app/ThemeContext";
const page = () => {
  return (
    <ThemeProvider>
      <div
        className="relative h-full flex items-center justify-center"
        style={{ height: "calc(100vh - 4rem)" }}
      >
        <Pomodoro />
      </div>
    </ThemeProvider>
  );
};

export default page;
