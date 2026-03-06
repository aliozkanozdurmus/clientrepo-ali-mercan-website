import { Landmark, ShieldCheck, Globe2, IdCard, FileText, Building2, Mail, ClipboardList, Newspaper, Briefcase, FileCheck2, ArrowUpRight as ArrowUpRightIcon } from "lucide-react";
import { AccordionSection, CurrencyDisplay, RefreshButton, LiveClock } from "./side-panel-client";

type SidePanelProps = {
    variant?: "desktop" | "mobile";
};

type Rate = {
    code: string;
    name: string;
    unit: number;
    buy: number;
    sell: number;
};

async function fetchTcmbRates(): Promise<Rate[]> {
    try {
        const res = await fetch("https://www.tcmb.gov.tr/kurlar/today.xml", {
            next: { revalidate: 600 },
        });
        const xml = await res.text();
        const blocks = Array.from(xml.matchAll(/<Currency[^>]*?>[\s\S]*?<\/Currency>/g)).map((m) => m[0]);
        const rates: Rate[] = blocks.map((block) => {
            const codeMatch = block.match(/Kod="([^"]+)"/);
            const unitMatch = block.match(/<Unit>(.*?)<\/Unit>/);
            const nameMatch = block.match(/<Isim>(.*?)<\/Isim>/) || block.match(/<CurrencyName>(.*?)<\/CurrencyName>/);
            const buyMatch = block.match(/<ForexBuying>(.*?)<\/ForexBuying>/);
            const sellMatch = block.match(/<ForexSelling>(.*?)<\/ForexSelling>/);
            return {
                code: codeMatch?.[1] ?? "",
                name: (nameMatch?.[1] ?? codeMatch?.[1] ?? "").trim(),
                unit: Number(unitMatch?.[1] ?? "1"),
                buy: Number(buyMatch?.[1] ?? "0"),
                sell: Number(sellMatch?.[1] ?? "0"),
            };
        });

        const priorityCurrencies = ["USD", "EUR", "GBP", "CHF"];
        const priorityRates = rates.filter(r => priorityCurrencies.includes(r.code));
        const otherRates = rates.filter(r => !priorityCurrencies.includes(r.code) && r.code && r.sell > 0);

        return [...priorityRates, ...otherRates];
    } catch {
        return [];
    }
}

type FeedItem = { title: string; link: string };

function decodeEntities(text: string) {
    return text
        .replace(/&nbsp;/g, " ")
        .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
        .replace(/&#([0-9]+);/g, (_, code) => String.fromCharCode(Number(code)))
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");
}

async function fetchSgkList(url: string, keyword: string, limit = 10): Promise<FeedItem[]> {
    try {
        const res = await fetch(url, {
            next: { revalidate: 600 },
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' }
        });
        const html = await res.text();
        const anchors = Array.from(html.matchAll(/<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi));
        const items: FeedItem[] = [];

        const ignoreList = ["devamını oku", "tümü", "devamı", "detay", "haberler", "duyurular"];

        for (const a of anchors) {
            const href = a[1];
            const raw = a[2] || "";
            const text = decodeEntities(raw.replace(/<[^>]*?>/g, "")).replace(/\s+/g, " ").trim();

            const isMatch = href.toLowerCase().includes(keyword.toLowerCase());
            const isIgnored = ignoreList.some(term => text.toLowerCase().includes(term));

            if (href && text && text.length > 5 && isMatch && !isIgnored && !href.toLowerCase().includes("javascript")) {
                const absolute = href.startsWith("http") ? href :
                    href.startsWith("/") ? `https://www.sgk.gov.tr${href}` :
                        `https://www.sgk.gov.tr/${href}`;

                if (!items.find(i => i.link === absolute)) {
                    items.push({ title: text, link: absolute });
                }
            }
            if (items.length >= limit) break;
        }
        return items;
    } catch {
        return [];
    }
}

export async function SidePanel({ variant = "desktop" }: SidePanelProps) {
    const isMobile = variant === "mobile";
    const rates = await fetchTcmbRates();
    const [sgkHaberler, sgkDuyurular] = await Promise.all([
        fetchSgkList("https://www.sgk.gov.tr/Haber", "/haber/", 10),
        fetchSgkList("https://www.sgk.gov.tr/Duyuru", "/duyuru/", 10),
    ]);

    const now = new Date();
    const updateTime = now.toLocaleString("tr-TR", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    });

    const shortcuts = [
        { name: "Dijital Vergi Dairesi", href: "https://dijital.gib.gov.tr/", Icon: Landmark },
        { name: "SGK İşveren", href: "https://ebildirge.sgk.gov.tr/WPEB/", Icon: ShieldCheck },
        { name: "e-Devlet", href: "https://www.turkiye.gov.tr/", Icon: Globe2 },
        { name: "İnteraktif VD", href: "https://ivd.gib.gov.tr/", Icon: IdCard },
        { name: "e-Fatura", href: "https://earsivportal.efatura.gov.tr/", Icon: FileText },
        { name: "STK GM", href: "https://www.siviltoplum.gov.tr/", Icon: Globe2 },
        { name: "TÜRMOB", href: "https://www.turmob.org.tr/", Icon: Landmark },
        { name: "GTO", href: "https://www.gto.org.tr/", Icon: Building2 },
        { name: "GSO", href: "https://www.gso.org.tr/", Icon: Building2 },
        { name: "PTT KEP", href: "https://hs01.kep.tr/", Icon: Mail },
        { name: "MERSİS", href: "https://mersis.gtb.gov.tr/", Icon: ClipboardList },
        { name: "Ticaret Sicil", href: "https://www.ticaretsicil.gov.tr/", Icon: Newspaper },
        { name: "İŞKUR", href: "https://esube.iskur.gov.tr/Portal/Isveren/IlanIslem.aspx", Icon: Briefcase },
        { name: "KOSGEB", href: "https://www.kosgeb.gov.tr/site/tr/genel/destekler", Icon: FileCheck2 },
    ];

    const gazeteler = Array.from({ length: 10 }).map((_, idx) => {
        const d = new Date();
        d.setDate(d.getDate() - idx);
        const day = d.toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric" });
        const weekday = d.toLocaleDateString("tr-TR", { weekday: "long" });
        const url = `https://www.resmigazete.gov.tr/${day.split(".").join(".")}`;
        return { day, weekday, url };
    });

    // Pratik Bilgiler Data
    const practicalInfo = [
        { label: "Asgari Ücret (Net)", value: "28.075,50 ₺" },
        { label: "Asgari Ücret (Brüt)", value: "33.030,00 ₺" },
        { label: "SGK Tavan", value: "297.270,00 ₺" },
        { label: "SGK Taban", value: "33.030,00 ₺" },
        { label: "Kıdem Taz. Tavanı", value: "63.948,00 ₺", note: "(01.01 - 30.06.2026 döneminde geçerli)" },
    ];

    return (
        <aside
            style={{
                width: isMobile ? "100%" : "15%",
                height: isMobile ? "100%" : "100vh",
                position: isMobile ? "relative" : "fixed",
                top: isMobile ? "auto" : 0,
                left: isMobile ? "auto" : 0,
                background: "linear-gradient(180deg, #f8f6f1 0%, #f1ede6 100%)",
                borderRight: "1px solid rgba(15, 23, 42, 0.08)",
                padding: "0.75rem",
                paddingTop: isMobile ? "1rem" : "72px",
                paddingBottom: "0.75rem",
                overflowY: "auto",
                zIndex: isMobile ? 1 : 50,
                scrollbarWidth: "none",
                display: "flex",
                flexDirection: "column",
            }}
            className={isMobile ? undefined : "desktop-only"}
        >
            <div style={{ marginBottom: "0.75rem", textAlign: "center" }}>
                <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--accent-primary)", letterSpacing: "-0.01em" }}>
                    Mega <span style={{ color: "var(--accent-secondary)" }}>Mali Müşavirlik</span>
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.15rem", letterSpacing: "0.08em", fontWeight: 700 }}>
                    Bilgi Portalı
                </div>
                <div style={{ marginTop: "0.35rem" }}>
                    <LiveClock />
                </div>
                <RefreshButton />
            </div>

            <div style={{ display: "grid", gap: "0.5rem", alignContent: "start" }}>
                <AccordionSection title="Hızlı Bağlantılar" defaultOpen={false}>
                    <div style={{ display: "grid", gap: "0.25rem" }}>
                        {shortcuts.map((s) => (
                            <a
                                key={s.name}
                                href={s.href}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    padding: "0.5rem 0.6rem",
                                    borderRadius: "8px",
                                    fontSize: "0.85rem",
                                    fontWeight: 600,
                                    background: "rgba(255, 255, 255, 0.3)",
                                    border: "1px solid transparent",
                                    transition: "all 0.2s ease"
                                }}
                                className="side-nav-link"
                            >
                                <s.Icon size={12} color="var(--accent-secondary)" style={{ flexShrink: 0 }} />
                                <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{s.name}</span>
                                <ArrowUpRightIcon size={9} color="var(--text-muted)" />
                            </a>
                        ))}
                    </div>
                </AccordionSection>

                <AccordionSection title="Pratik Bilgiler" defaultOpen={false}>
                    <div style={{ display: "grid", gap: "0.4rem" }}>
                        {practicalInfo.map((p, i) => (
                            <div key={i} style={{ padding: "0.4rem 0.6rem", background: "rgba(255,255,255,0.3)", borderRadius: "6px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div style={{ fontSize: "0.8rem", fontWeight: 600, color: "var(--text-secondary)" }}>{p.label}</div>
                                    <div style={{ fontSize: "0.8rem", fontWeight: 800 }}>{p.value}</div>
                                </div>
                                {"note" in p && p.note && (
                                    <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>{p.note}</div>
                                )}
                            </div>
                        ))}
                    </div>
                </AccordionSection>

                <CurrencyDisplay rates={rates} timestamp={updateTime} />

                <AccordionSection title="Resmî Gazete" defaultOpen={false} timestamp={updateTime} refreshable refreshLabel="Resmî Gazete'yi yenile">
                    <div style={{ display: "grid", gap: "0.3rem" }}>
                        {gazeteler.map((g) => (
                            <a
                                key={g.day}
                                href={g.url}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "0.4rem 0.6rem",
                                    background: "rgba(255, 255, 255, 0.3)",
                                    borderRadius: "8px",
                                    fontSize: "0.85rem",
                                    fontWeight: 700,
                                }}
                            >
                                <span>{g.day}</span>
                                <ArrowUpRightIcon size={9} color="var(--accent-secondary)" />
                            </a>
                        ))}
                    </div>
                </AccordionSection>

                <AccordionSection title="SGK Duyuruları" defaultOpen={false} timestamp={updateTime} refreshable refreshLabel="SGK duyurularını yenile">
                    <div style={{ display: "grid", gap: "0.4rem" }}>
                        {sgkDuyurular.length > 0 ? sgkDuyurular.map((d) => (
                            <a
                                key={d.link}
                                href={d.link}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    padding: "0.5rem 0.6rem",
                                    background: "rgba(255, 255, 255, 0.3)",
                                    borderRadius: "8px",
                                    fontSize: "0.8rem",
                                    display: "block",
                                    lineHeight: "1.3",
                                    fontWeight: 600,
                                    color: "var(--text-primary)"
                                }}
                            >
                                {d.title}
                            </a>
                        )) : <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>...</div>}
                    </div>
                </AccordionSection>

                <AccordionSection title="SGK Haberleri" defaultOpen={false} timestamp={updateTime} refreshable refreshLabel="SGK haberlerini yenile">
                    <div style={{ display: "grid", gap: "0.4rem" }}>
                        {sgkHaberler.length > 0 ? sgkHaberler.map((h) => (
                            <a
                                key={h.link}
                                href={h.link}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    padding: "0.5rem 0.6rem",
                                    background: "rgba(255, 255, 255, 0.3)",
                                    borderRadius: "8px",
                                    fontSize: "0.8rem",
                                    display: "block",
                                    lineHeight: "1.3",
                                    fontWeight: 600,
                                    color: "var(--text-primary)"
                                }}
                            >
                                {h.title}
                            </a>
                        )) : <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>...</div>}
                    </div>
                </AccordionSection>
            </div>

        </aside>
    );
}
