type NewsItem = {
  title: string;
  link: string;
  date?: string;
  summary?: string;
  source?: string;
};
import { NewsListClient } from "./news-list-client";

// Investing.com RSS (Piyasalar ve Analizler - Türkçe)
const RSS_URL = "https://tr.investing.com/rss/news.rss";

async function fetchNews(): Promise<NewsItem[]> {
  try {
    const res = await fetch(RSS_URL, {
      next: { revalidate: 1800 }, // 30 dk
    });
    const xml = await res.text();
    const items = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/g)).map((m) => m[1]);

    return items.slice(0, 12).map((item) => {
      const get = (tag: string) => item.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`))?.[1]?.trim();
      const strip = (val?: string) => val?.replace(/<!\[CDATA\[|\]\]>/g, "").replace(/<[^>]*>/g, "").trim();

      // Simple date formatting if needed, or stick to raw string with a label
      const rawDate = strip(get("pubDate"));

      return {
        title: strip(get("title")) || "Haber",
        link: strip(get("link")) || "#",
        date: rawDate,
        summary: strip(get("description")),
        source: "Investing.com",
      };
    });
    } catch {
    return [];
  }
}

export async function NewsSection() {
  const news = await fetchNews();

  return (
    <section className="section" style={{ background: "var(--bg-secondary)" }}>
      <div className="container" style={{ display: "grid", gap: "2.5rem" }}>
        <div className="section-header">
          <span className="eyebrow">Güncel Ekonomi Haberleri</span>
          <h2 className="section-title">Piyasadan Son Başlıklar</h2>
          <p className="section-desc">
            Güvenilir kaynaklardan derlenen ekonomi haberleri. Başlıklar 30 dakikada bir yenilenir.
          </p>
        </div>

        <NewsListClient
          items={news.length ? news : [{ title: "Şu an haber alınamadı", link: "#", summary: "Lütfen daha sonra tekrar deneyin." }]}
        />
      </div>
    </section>
  );
}
