"use client";
import { createContext, ReactNode, useContext } from "react";

interface PomodoroContextType {
  timeLeft: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  setDurations: (session: number, breatTime: number) => void;
}

const PomodoroContext = createContext<PomodoroContextType | undefined>(
  undefined
);

const PomodoroProvider = ({ children }: { children: ReactNode }) => {
  return (
    <PomodoroContext.Provider
      value={{
        timeLeft: 1500,
        isRunning: false,
        start: () => {},
        pause: () => {},
        reset: () => {},
        setDurations: () => {},
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};

const usePomodoro = (): PomodoroContextType => {
  const context = useContext(PomodoroContext);
  if (!context) {
    throw new Error("usePomodoro must be used within a PomodoroProvider");
  }
  return context;
};

export { PomodoroContext, PomodoroProvider, usePomodoro };
