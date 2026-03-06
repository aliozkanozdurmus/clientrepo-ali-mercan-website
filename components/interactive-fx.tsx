"use client";

import { useEffect, useState } from "react";

export default function InteractiveFx() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      setPos({ x: event.clientX, y: event.clientY });
    };

    const handleResize = () => {
      setPos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: -1,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 320,
          height: 320,
          background: "radial-gradient(circle at center, rgba(196, 154, 61, 0.18), transparent 60%)",
          filter: "blur(40px)",
          transform: `translate3d(${pos.x - 160}px, ${pos.y - 160}px, 0)` as string,
          transition: "transform 0.12s ease-out",
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
}
