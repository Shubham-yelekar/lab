"use client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  RotateCcw,
  Bolt,
  CirclePlus,
  CircleMinus,
  CheckCheck,
} from "lucide-react";
import { useTheme } from "./ThemeContext";
import clsx from "clsx";
import { usePomodoro } from "./PomodoroContext";

const Pomodoro = () => {
  const { darkMode } = useTheme();
  const [openSettings, setOpenSettings] = useState<boolean>(false);

  return (
    <div
      className={clsx(
        "h-full w-full flex gap-2 flex-col items-center justify-center",
        darkMode ? "bg-black" : "bg-orange-50"
      )}
    >
      <div
        className={clsx(
          "relative p-3 border-1  rounded-4xl flex gap-4 items-center flex-col",
          darkMode
            ? "bg-neutral-900 border-neutral-800 "
            : "bg-orange-100 border-orange-200"
        )}
      >
        <Timer />
        <Sessions />
        <div className="w-full flex justify-between">
          <button
            className={clsx(
              "p-3  rounded-3xl  cursor-pointer transition-all",
              darkMode
                ? "bg-neutral-800 hover:bg-neutral-700 text-amber-50"
                : "bg-orange-200 hover:bg-orange-400"
            )}
          >
            <RotateCcw />
          </button>
          <button
            onClick={() => setOpenSettings((prev) => !prev)}
            className={clsx(
              "p-3  rounded-3xl  cursor-pointer transition-all",
              darkMode
                ? "bg-neutral-800 hover:bg-neutral-700 text-amber-50"
                : "bg-orange-200 hover:bg-orange-400"
            )}
          >
            <Bolt />
          </button>
        </div>
        {openSettings && (
          <Setting
            toggleSettings={openSettings}
            setToggleSettings={setOpenSettings}
          />
        )}
      </div>
      <Switch />
    </div>
  );
};

const Timer = () => {
  const { darkMode } = useTheme();
  const { timeLeft, start, pause, isRunning } = usePomodoro();
  const [time, setTime] = useState(timeLeft);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  const formatTime = (seconds: number): string => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="w-64 flex gap-4 flex-col items-center justify-center">
      <div className="text-4xl">🍅</div>
      <div>
        <h1
          className={clsx(
            "font-bold text-5xl ",
            darkMode ? "text-neutral-100" : "text-neutral-900"
          )}
        >
          {formatTime(time)}
        </h1>
      </div>
      <div>
        <button
          className={clsx(
            "px-8 py-2 rounded-4xl",
            darkMode
              ? "bg-neutral-100 text-neutral-800 "
              : "bg-neutral-900 text-neutral-100 "
          )}
        >
          Start
        </button>
      </div>
    </div>
  );
};

const Sessions = () => {
  return (
    <div className="flex gap-3 w-32">
      <div className="w-8 h-2 bg-orange-400 rounded-2xl"></div>
      <div className="w-8 h-2 bg-orange-200 rounded-2xl"></div>
      <div className="w-8 h-2 bg-orange-200 rounded-2xl"></div>
    </div>
  );
};

const Switch = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="flex items-center justify-center">
      <label className="relative h-8 w-14 inline-block  items-center bg-orange-200 rounded-4xl cursor-pointer">
        <input
          type="checkbox"
          onClick={() => toggleTheme()}
          className="sr-only peer"
          value=""
        />
        <span className="absolute inset-y-0 start-0 m-1 size-6 bg-orange-400 rounded-4xl transition-all peer-checked:start-6 "></span>
      </label>
    </div>
  );
};

type settingsProp = {
  toggleSettings: boolean;
  setToggleSettings: Dispatch<SetStateAction<boolean>>;
};

const Setting = ({ toggleSettings, setToggleSettings }: settingsProp) => {
  const { darkMode, toggleTheme } = useTheme();

  const handleSubmit = () => {
    setToggleSettings((prev) => !prev);
  };

  return (
    <div
      className={clsx(
        "absolute top-0 left-0 h-full w-full  p-3 flex flex-col justify-between rounded-4xl",
        darkMode ? "bg-neutral-900 text-neutral-100" : "bg-orange-100"
      )}
    >
      <div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl ">Timer</span>
          <div
            className={clsx(
              "flex items-center gap-4 p-1 rounded-3xl",
              darkMode ? "bg-neutral-800" : "bg-orange-200"
            )}
          >
            <button>
              <CirclePlus />{" "}
            </button>
            <span className="text-xl">25</span>
            <button>
              <CircleMinus />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl ">Break</span>
          <div
            className={clsx(
              "flex items-center gap-4 p-1 rounded-3xl",
              darkMode ? "bg-neutral-800" : "bg-orange-200"
            )}
          >
            <button>
              <CirclePlus />{" "}
            </button>
            <span className="text-xl">25</span>
            <button>
              <CircleMinus />
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl ">Sessions</span>
          <div
            className={clsx(
              "flex items-center gap-4 p-1 rounded-3xl",
              darkMode ? "bg-neutral-800" : "bg-orange-200"
            )}
          >
            <button>
              <CirclePlus />{" "}
            </button>
            <span className="text-xl">25</span>
            <button>
              <CircleMinus />
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between">
        <button
          onClick={handleSubmit}
          className={clsx(
            "p-3  rounded-3xl  cursor-pointer transition-all",
            darkMode
              ? "bg-orange-400 hover:bg-orange-500"
              : "bg-orange-200 hover:bg-orange-400"
          )}
        >
          <CheckCheck />
        </button>
        <button
          onClick={() => setToggleSettings((prev) => !prev)}
          className={clsx(
            "p-3 rounded-3xl cursor-pointer transition-all, darkMode",
            darkMode
              ? "bg-neutral-800 hover:bg-neutral-700"
              : "bg-orange-200 hover:bg-orange-400 "
          )}
        >
          <Bolt />
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;
