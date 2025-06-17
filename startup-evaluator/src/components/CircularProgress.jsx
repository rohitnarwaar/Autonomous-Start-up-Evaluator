import React from "react";

const CircularProgress = ({ value = 0, label = "Score", size = 120, strokeWidth = 10 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#333"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#4ade80"
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fill="#fff"
        fontSize="20"
        className="rotate-[90deg]"
      >
        {value}
      </text>
      <text
        x="50%"
        y="65%"
        textAnchor="middle"
        dy=".3em"
        fill="#aaa"
        fontSize="12"
        className="rotate-[90deg]"
      >
        {label}
      </text>
    </svg>
  );
};

export default CircularProgress;
