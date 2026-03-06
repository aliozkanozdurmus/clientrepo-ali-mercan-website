"use client";

import { useEffect, useState } from "react";

type NewsItem = {
  title: string;
  link: string;
  date?: string;
  summary?: string;
  source?: string;
};

export function NewsListClient({ items }: { items: NewsItem[] }) {
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const visible = isMobile ? items.slice(0, 3) : showAll ? items.slice(0, 9) : items.slice(0, 6);
  const canToggle = !isMobile && items.length > 6;

  return (
    <div style={{ display: "grid", gap: "1.5rem" }}>
      <div className="grid-3">
        {visible.map((item) => (
          <a
            key={item.link + item.title}
            href={item.link}
            target={item.link === "#" ? "_self" : "_blank"}
            rel="noreferrer"
            className="card"
            style={{ gap: "0.75rem", display: "flex", flexDirection: "column" }}
          >
            <div style={{ fontWeight: 700, fontSize: "calc(1.1rem - 2px)", letterSpacing: "-0.01em", color: "var(--text-primary)" }}>
              {item.title}
            </div>
            {item.summary && (
              <div style={{ color: "var(--text-secondary)", lineHeight: 1.6, fontSize: "calc(0.95rem - 2px)" }}>{item.summary}</div>
            )}

            <div
              style={{
                marginTop: "auto",
                paddingTop: "1rem",
                borderTop: "1px solid var(--border-light)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "calc(0.8rem - 2px)",
                color: "var(--text-muted)",
              }}
            >
              {item.source && (
                <span style={{ fontWeight: 500, color: "var(--accent-secondary)" }}>
                  Kaynak: {item.source}
                </span>
              )}
              {item.date && <span>{item.date.replace(" +0300", "")}</span>}
            </div>
          </a>
        ))}
      </div>
      {canToggle && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            className="btn btn-secondary"
            style={{ padding: "10px 18px", fontSize: "calc(0.95rem - 2px)" }}
            onClick={() => setShowAll((s) => !s)}
          >
            {showAll ? "Daha az göster" : "Daha fazlasını göster"}
          </button>
        </div>
      )}
    </div>
  );
}
