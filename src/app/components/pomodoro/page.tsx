import React from "react";
import Pomodoro from "./app/Pomodoro";
import { ThemeProvider } from "./app/ThemeContext";
import { PomodoroProvider } from "./app/PomodoroContext";
const page = () => {
  return (
    <ThemeProvider>
      <PomodoroProvider>
        <div
          className="relative h-full flex items-center justify-center"
          style={{ height: "calc(100vh - 4rem)" }}
        >
          <Pomodoro />
        </div>
      </PomodoroProvider>
    </ThemeProvider>
  );
};

export default page;
