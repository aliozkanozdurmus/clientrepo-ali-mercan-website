"use client";

import { ChevronDown, ChevronUp, RefreshCw } from "lucide-react";
import type { ReactNode, MouseEvent } from "react";
import { useEffect, useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

interface AccordionSectionProps {
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
    timestamp?: string;
    icon?: ReactNode;
    refreshable?: boolean;
    refreshLabel?: string;
}

export function AccordionSection({ title, children, defaultOpen = false, timestamp, icon, refreshable = false, refreshLabel }: AccordionSectionProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const router = useRouter();
    const [isRefreshing, startTransition] = useTransition();

    const handleRefresh = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        if (isRefreshing) return;
        startTransition(() => {
            router.refresh();
        });
    };

    return (
        <section>
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    fontWeight: 800,
                    color: "var(--text-muted)",
                    letterSpacing: "0.05em",
                    fontSize: "0.8rem",
                    marginBottom: isOpen ? "0.75rem" : "0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.5rem 0.25rem",
                    borderRadius: "6px",
                    transition: "all 0.2s ease",
                    background: isOpen ? "rgba(202, 160, 79, 0.05)" : "transparent"
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    {icon}
                    <div>
                        {title}
                        {timestamp && <div style={{ fontSize: "0.65rem", fontWeight: 600, color: "var(--text-muted)", opacity: 0.7, marginTop: "0.15rem", letterSpacing: "0.05em" }}>{timestamp}</div>}
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    {refreshable && (
                        <button
                            type="button"
                            onClick={handleRefresh}
                            aria-label={refreshLabel ?? `${title} yenile`}
                            title="Yenile"
                            disabled={isRefreshing}
                            style={{
                                width: "24px",
                                height: "24px",
                                borderRadius: "6px",
                                border: "1px solid rgba(15, 23, 42, 0.08)",
                                background: "rgba(255, 255, 255, 0.6)",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "var(--text-muted)",
                                cursor: "pointer",
                                opacity: isRefreshing ? 0.7 : 1,
                                transition: "all 0.2s ease"
                            }}
                        >
                            <RefreshCw size={12} style={{ animation: isRefreshing ? "spin 1s linear infinite" : "none" }} />
                        </button>
                    )}
                    <ChevronDown
                        size={14}
                        style={{
                            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.2s ease"
                        }}
                    />
                </div>
            </div>
            {isOpen && <div>{children}</div>}
            <style jsx>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
}

interface CurrencyDisplayProps {
    rates: Array<{
        code: string;
        name: string;
        unit: number;
        buy: number;
        sell: number;
    }>;
    timestamp: string;
}

export function CurrencyDisplay({ rates, timestamp }: CurrencyDisplayProps) {
    const [showAll, setShowAll] = useState(false);
    const displayRates = showAll ? rates.slice(0, 12) : rates.slice(0, 4);

    return (
        <AccordionSection title="Döviz Kurları" defaultOpen={false} timestamp={timestamp} refreshable refreshLabel="Döviz kurlarını yenile">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.4rem" }}>
                {displayRates.map((r) => (
                    <div
                        key={r.code}
                        style={{
                            padding: "0.5rem",
                            background: "rgba(255, 255, 255, 0.7)",
                            borderRadius: "10px",
                            border: "1px solid rgba(15, 23, 42, 0.04)",
                            textAlign: "center"
                        }}
                    >
                        <div style={{ fontSize: "0.85rem", fontWeight: 800 }}>{r.code}</div>
                        <div style={{ fontSize: "0.95rem", fontWeight: 900, color: r.sell >= r.buy ? "#166534" : "#991b1b", margin: "0.1rem 0" }}>
                            {(r.sell / r.unit).toFixed(3)}
                        </div>
                    </div>
                ))}
            </div>
            {rates.length > 4 && (
                <button
                    onClick={() => setShowAll(!showAll)}
                    style={{
                        marginTop: "0.5rem",
                        width: "100%",
                        padding: "0.4rem",
                        background: "rgba(202, 160, 79, 0.1)",
                        border: "1px solid rgba(202, 160, 79, 0.2)",
                        borderRadius: "8px",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        color: "var(--accent-secondary)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.3rem",
                        transition: "all 0.2s ease"
                    }}
                >
                    {showAll ? (
                        <>
                            <ChevronUp size={12} />
                            Daha Az Kur
                        </>
                    ) : (
                        <>
                            <ChevronDown size={12} />
                            Daha Fazla Kur
                        </>
                    )}
                </button>
            )}
        </AccordionSection>
    );
}

export function LiveClock() {
    const [currentTime, setCurrentTime] = useState("");

    const formatter = useMemo(
        () =>
            new Intl.DateTimeFormat("tr-TR", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
            }),
        []
    );

    useEffect(() => {
        const update = () => setCurrentTime(formatter.format(new Date()));
        update();
        const timer = setInterval(update, 1000);
        return () => clearInterval(timer);
    }, [formatter]);

    return (
        <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", justifyContent: "center" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a" }} />
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", letterSpacing: "0.05em", fontWeight: 700 }}>
                Güncel Saat {currentTime}
            </span>
        </div>
    );
}

export function RefreshButton() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    return (
        <button
            onClick={handleRefresh}
            disabled={isPending}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.4rem",
                padding: "0.4rem 0.8rem",
                marginTop: "0.5rem",
                borderRadius: "8px",
                border: "1px solid var(--border-light)",
                background: "rgba(255, 255, 255, 0.5)",
                fontSize: "0.8rem",
                fontWeight: 600,
                color: "var(--text-secondary)",
                cursor: "pointer",
                width: "100%",
                transition: "all 0.2s ease",
                opacity: isPending ? 0.7 : 1,
            }}
        >
            <RefreshCw size={12} className={isPending ? "spin-animation" : ""} style={{ animation: isPending ? "spin 1s linear infinite" : "none" }} />
            {isPending ? "Yenileniyor..." : "Verileri Yenile"}
            <style jsx>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
        </button>
    );
}

