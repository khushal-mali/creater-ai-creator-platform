"use client";

import { useEffect, useRef } from "react";

const CustomMouse = () => {
  const blobRef = useRef(null);
  const frameRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (frameRef.current) return;

      frameRef.current = requestAnimationFrame(() => {
        if (blobRef.current) {
          blobRef.current.style.transform = `translate3d(
            ${e.clientX - 192}px,
            ${e.clientY - 192}px,
            0
          )`;
        }
        frameRef.current = null;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);
  return (
    <div
      ref={blobRef}
      className="pointer-events-none fixed z-0 h-96 w-96 rounded-full bg-linear-to-r from-blue-900/20 via-purple-900/20 blur-3xl transition-transform duration-300 ease-out will-change-transform"
    />
  );
};

export default CustomMouse;
