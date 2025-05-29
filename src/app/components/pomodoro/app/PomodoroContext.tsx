"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type Durations = {
  time: number;
  session: number;
  breakTime: number;
};

interface PomodoroContextType {
  timeLeft: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  setDurations: (durations: Durations) => void;
}

const PomodoroContext = createContext<PomodoroContextType | undefined>(
  undefined
);

const PomodoroProvider = ({ children }: { children: ReactNode }) => {
  const initialTime = 1500;
  const [currentTime, setCurrentTime] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const interval = useRef<NodeJS.Timeout | null>(null);
  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      interval.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev <= 1) {
            clearInterval(interval.current!);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const pause = () => {
    if (interval.current) {
      clearInterval(interval.current);
      setIsRunning(false);
    }
  };

  const reset = () => {
    if (interval.current) {
      clearInterval(interval.current);
      setIsRunning(false);
      setCurrentTime(initialTime);
    }
  };

  const setDurations = ({ time, session, breakTime }: Durations) => {
    if (interval.current) {
      clearInterval(interval.current);
    }
    setCurrentTime(time * 60);
    console.log(time);

    setIsRunning(false);
  };

  useEffect(() => {
    return () => {
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, []);

  return (
    <PomodoroContext.Provider
      value={{
        timeLeft: currentTime,
        isRunning: isRunning,
        start,
        pause,
        reset,
        setDurations,
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
