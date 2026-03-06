"use client";

import { usePathname } from "next/navigation";
import { AiChatbot } from "@/components/aichatbot";

export function AiChatbotFloating() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) return null;

  return (
    <div
      style={{
        position: "fixed",
        right: "20px",
        bottom: "20px",
        zIndex: 90,
        pointerEvents: "none",
      }}
    >
      <div style={{ pointerEvents: "auto" }}>
        <AiChatbot />
      </div>
    </div>
  );
}
