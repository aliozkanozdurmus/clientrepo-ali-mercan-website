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

async function fetchSgkList(url: string, keyword: string, limit = 5): Promise<FeedItem[]> {
  try {
    const res = await fetch(url, { next: { revalidate: 600 } });
    const html = await res.text();
    const anchors = Array.from(html.matchAll(/<a[^>]+href="([^"]+)"[^>]*>(.*?)<\/a>/gi));
    const items: FeedItem[] = [];
    for (const a of anchors) {
      const href = a[1];
      const raw = a[2] || "";
      const text = decodeEntities(raw.replace(/<[^>]*?>/g, "")).replace(/\s+/g, " ").trim();
      if (href && text && href.toLowerCase().includes(keyword) && !href.toLowerCase().includes("javascript")) {
        const absolute = href.startsWith("http") ? href : `https://www.sgk.gov.tr${href}`;
        items.push({ title: text, link: absolute });
      }
      if (items.length >= limit) break;
    }
    return items;
  } catch (error) {
    console.error("SGK fetch error", error);
    return [];
  }
}

export async function SgkSection() {
  const [haberler, duyurular] = await Promise.all([
    fetchSgkList("https://www.sgk.gov.tr/Haber", "/haber/", 6),
    fetchSgkList("https://www.sgk.gov.tr/Duyuru", "/duyuru/", 6),
  ]);

  const renderList = (items: FeedItem[], title: string) => (
    <div
      className="card"
      style={{
        padding: "0.85rem",
        display: "grid",
        gap: "0.4rem",
        height: "100%",
      }}
    >
      <div>
        <div className="eyebrow" style={{ marginBottom: 4, color: "var(--text-muted)" }}>
          SGK
        </div>
        <div style={{ fontWeight: 700, fontSize: "calc(1rem - 2px)" }}>{title}</div>
      </div>
      <div style={{ display: "grid", gap: "0.35rem" }}>
        {items.length === 0 && (
          <div style={{ color: "var(--text-secondary)", fontSize: "calc(0.9rem - 2px)" }}>Şu an içerik yüklenemedi.</div>
        )}
        {items.map((item) => (
          <a
            key={item.link}
            href={item.link}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.45rem 0.6rem",
              borderRadius: "10px",
              background: "rgba(15,23,42,0.02)",
              border: "1px solid var(--border-light)",
              color: "var(--text-primary)",
              textDecoration: "none",
              gap: "0.6rem",
            }}
          >
            <span style={{ fontSize: "calc(0.9rem - 2px)", fontWeight: 600, lineHeight: 1.3, flex: 1 }}>{item.title}</span>
            <span style={{ color: "var(--accent-primary)", fontWeight: 700, fontSize: "calc(0.82rem - 2px)", whiteSpace: "nowrap" }}>
              Aç
            </span>
          </a>
        ))}
      </div>
      <div
        style={{
          marginTop: "auto",
          paddingTop: "0.75rem",
          borderTop: "1px solid var(--border-light)",
          fontSize: "calc(0.75rem - 2px)",
          color: "var(--text-muted)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>Kaynak: sgk.gov.tr</span>
        <span>
          Son Güncelleme:{" "}
          {new Date().toLocaleDateString("tr-TR", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  );

  return (
    <section className="section" style={{ paddingTop: "20px" }}>
      <div className="container" style={{ display: "grid", gap: "1rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1rem",
            alignItems: "start",
          }}
        >
          {renderList(haberler, "Haberler")}
          {renderList(duyurular, "Duyurular")}
        </div>
      </div>
    </section>
  );
}
