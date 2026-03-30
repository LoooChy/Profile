"use client";

import { useMemo, useState } from "react";

export default function SkillBadge({ className, delay, label }) {
  const [interactiveStyle, setInteractiveStyle] = useState({});

  const wrapperStyle = useMemo(() => {
    return delay ? { transitionDelay: delay } : undefined;
  }, [delay]);

  const handleMouseMove = (event) => {
    const badge = event.currentTarget;
    const rect = badge.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;

    setInteractiveStyle({
      transform: `translate(${x * 0.22}px, ${y * 0.18 - 4}px) scale(1.1)`,
      filter: "brightness(1.05)",
      boxShadow: "0 18px 36px rgba(248, 193, 0, 0.2)"
    });
  };

  const handleMouseLeave = () => {
    setInteractiveStyle({});
  };

  return (
    <div className="badge-float" style={wrapperStyle}>
      <button
        className={`skill-badge ${className}`}
        onBlur={handleMouseLeave}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        style={interactiveStyle}
        type="button"
      >
        {label}
      </button>
    </div>
  );
}
