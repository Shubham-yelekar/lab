"use client";
import React, { useState } from "react";
import { clsx } from "clsx";
import { motion } from "motion/react";

const tabs = [
  { id: "home", label: "Home" },
  { id: "work", label: "Work" },
  { id: "resume", label: "Resume" },
  { id: "about", label: "About" },
];

const AnimatedTabs = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  return (
    <div className="bg-neutral-100 h-[100%] flex flex-col items-center justify-center ">
      <div className="flex space-x-1 bg-[#ececec] p-1 border-1 border-neutral-300 rounded-full">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={clsx(
              "relative rounded-full px-5 py-2 text-md cursor-pointer text-neutral-500 font-medium transition-all duration-500",
              {
                "text-neutral-800": activeTab === tab.id,
                "hover:text-neutral-400": activeTab !== tab.id,
              }
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-neutral-100 shadow-[0px_8px_16px_-2px_rgba(0,_0,_0,_0.1)] "
                style={{
                  borderRadius: 9999,
                }}
                transition={{
                  duration: 0.5,
                }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default AnimatedTabs;
