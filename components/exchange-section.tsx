import { ArrowDownRight, ArrowUpRight } from "lucide-react";

type Rate = {
  code: string;
  name: string;
  unit: number;
  buy: number;
  sell: number;
};

async function fetchTcmbRates(): Promise<Rate[]> {
  const res = await fetch("https://www.tcmb.gov.tr/kurlar/today.xml", {
    // Refresh every 10 minutes
    next: { revalidate: 600 },
  });
  const xml = await res.text();

  // Extract each <Currency> block
  const blocks = Array.from(xml.matchAll(/<Currency[^>]*?>[\s\S]*?<\/Currency>/g)).map((m) => m[0]);

  const rates: Rate[] = blocks.map((block) => {
    const codeMatch = block.match(/Kod="([^"]+)"/);
    const unitMatch = block.match(/<Unit>(.*?)<\/Unit>/);
    const nameMatch =
      block.match(/<Isim>(.*?)<\/Isim>/) || block.match(/<CurrencyName>(.*?)<\/CurrencyName>/);
    const buyMatch = block.match(/<ForexBuying>(.*?)<\/ForexBuying>/);
    const sellMatch = block.match(/<ForexSelling>(.*?)<\/ForexSelling>/);

    const code = codeMatch?.[1] ?? "";
    const name = (nameMatch?.[1] ?? code).trim();
    const unit = Number(unitMatch?.[1] ?? "1");
    const buy = Number(buyMatch?.[1] ?? "0");
    const sell = Number(sellMatch?.[1] ?? "0");

    return { code, name, unit, buy, sell };
  });

  return rates.filter((r) => r.code && r.sell > 0).slice(0, 10);
}

function formatNumber(n: number) {
  return n.toLocaleString("tr-TR", { minimumFractionDigits: 4, maximumFractionDigits: 4 });
}

function Spread({ buy, sell }: { buy: number; sell: number }) {
  const delta = sell - buy;
  const dirUp = delta >= 0;
  const pct = buy > 0 ? (delta / buy) * 100 : 0;
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", color: dirUp ? "#166534" : "#991b1b" }}>
      {dirUp ? <ArrowUpRight size={16} strokeWidth={1.7} /> : <ArrowDownRight size={16} strokeWidth={1.7} />}
      <span style={{ fontWeight: 600 }}>{pct.toFixed(2)}%</span>
    </div>
  );
}

export async function ExchangeSection() {
  const data = await fetchTcmbRates();
  const compactData = data.slice(0, 8);
  const fetchedAt = new Date().toLocaleString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const gazeteler = Array.from({ length: 7 }).map((_, idx) => {
    const d = new Date();
    d.setDate(d.getDate() - idx);
    const day = d.toLocaleDateString("tr-TR", { day: "2-digit", month: "2-digit", year: "numeric" });
    const weekday = d.toLocaleDateString("tr-TR", { weekday: "long" });
    const url = `https://www.resmigazete.gov.tr/${day.split(".").join(".")}`;
    return { day, weekday, url };
  });

  return (
    <section className="section" style={{ paddingTop: "60px" }}>
      <div className="container" style={{ display: "grid", gap: "2.5rem" }}>
        <div
          className="exchange-grid-container"
          style={{
            display: "grid",
            gap: "1.5rem",
            alignItems: "start",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div
              className="exchange-rates-grid"
              style={{
                display: "grid",
                gap: "0.75rem",
              }}
            >
              {compactData.map((rate, index) => {
                const spreadPos = rate.sell - rate.buy >= 0;
                return (
                  <div
                    key={rate.code}
                    className={`card ${index >= 4 ? "desktop-only-item" : ""}`}
                    style={{ gap: "0.45rem", padding: "0.85rem 0.9rem", boxShadow: "0 8px 24px -20px rgba(12,18,32,0.35)" }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ fontSize: "calc(1rem - 2px)", fontWeight: 700, letterSpacing: "0.005em" }}>{rate.code}</div>
                      <Spread buy={rate.buy} sell={rate.sell} />
                    </div>
                    <div style={{ color: "var(--text-secondary)", fontSize: "calc(0.88rem - 2px)" }}>{rate.name}</div>
                    <div style={{ display: "flex", gap: "0.75rem", alignItems: "flex-end" }}>
                      <div>
                        <div style={{ color: "var(--text-muted)", fontSize: "calc(0.74rem - 2px)" }}>Alış</div>
                        <div style={{ fontSize: "calc(1rem - 2px)", fontWeight: 700 }}>{formatNumber(rate.buy / rate.unit)}</div>
                      </div>
                      <div>
                        <div style={{ color: "var(--text-muted)", fontSize: "calc(0.74rem - 2px)" }}>Satış</div>
                        <div style={{ fontSize: "calc(1rem - 2px)", fontWeight: 700 }}>{formatNumber(rate.sell / rate.unit)}</div>
                      </div>
                    </div>
                    <div
                      style={{
                        marginTop: 2,
                        color: spreadPos ? "#166534" : "#991b1b",
                        fontSize: "calc(0.82rem - 2px)",
                        fontWeight: 600,
                      }}
                    >
                      Spread: {formatNumber(rate.sell - rate.buy)}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* ... Resource labels code remains same ... */}
            <div
              style={{
                fontSize: "calc(0.75rem - 2px)",
                color: "var(--text-muted)",
                display: "flex",
                justifyContent: "flex-end",
                gap: "0.5rem",
                paddingRight: "0.5rem",
              }}
            >
              <span style={{ fontWeight: 600 }}>Kaynak: TCMB</span>
              <span>•</span>
              <span>Son Güncelleme: {fetchedAt}</span>
            </div>
          </div>

          <div
            className="card resmi-gazete-card"
            style={{
              padding: "0.75rem 0.85rem",
              display: "grid",
              gap: "0.35rem",
              alignSelf: "stretch",
              height: "100%",
            }}
          >
            <div>
              <div className="eyebrow" style={{ marginBottom: 4, color: "var(--text-muted)" }}>
                Resmî Gazete
              </div>
              <div style={{ fontWeight: 700, fontSize: "calc(1rem - 2px)" }}>Son 7 Gün</div>
            </div>
            <div style={{ display: "grid", gap: "0.3rem" }}>
              {gazeteler.map(({ day, weekday, url }, index) => (
                <a
                  key={day}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className={index >= 4 ? "desktop-only-item" : ""}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0.4rem 0.55rem",
                    borderRadius: "10px",
                    background: "rgba(15,23,42,0.025)",
                    border: "1px solid var(--border-light)",
                    color: "var(--text-primary)",
                    textDecoration: "none",
                  }}
                >
                  <div style={{ display: "flex", gap: "0.4rem", alignItems: "center", flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, fontSize: "calc(0.9rem - 2px)" }}>{day}</span>
                    <span style={{ color: "var(--text-secondary)", fontSize: "calc(0.82rem - 2px)", textTransform: "capitalize" }}>
                      · {weekday}
                    </span>
                  </div>
                  <span style={{ color: "var(--accent-primary)", fontWeight: 700, fontSize: "calc(0.82rem - 2px)" }}>Aç</span>
                </a>
              ))}
            </div>
            <div
              style={{
                marginTop: "auto",
                paddingTop: "0.5rem",
                borderTop: "1px solid var(--border-light)",
                fontSize: "calc(0.75rem - 2px)",
                color: "var(--text-muted)",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              Kaynak: resmigazete.gov.tr
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
