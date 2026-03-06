import "./globals.css";
import "./responsive.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { AiChatbotFloating } from "@/components/ai-chatbot-floating";
import { MobilePortalShell } from "@/components/mobile-portal-shell";
import { SidePanel } from "@/components/side-panel";
import { BotIdClient } from "botid/client";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500"], display: "swap", variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Mega Mali Müşavirlik | Ali Mercan",
    template: "%s | Mega Mali Müşavirlik",
  },
  description:
    "Vergi, SGK, bordro ve finansal raporlama süreçlerinde şeffaf, ölçülebilir ve hızlı çözümler sunan mali müşavirlik ve danışmanlık.",
  keywords: [
    "mali müşavirlik",
    "vergi danışmanlığı",
    "SGK işlemleri",
    "bordro yönetimi",
    "finansal raporlama",
    "denetim",
    "muhasebe",
    "teşvik danışmanlığı",
    "Gaziantep",
  ],
  authors: [{ name: "Ali Mercan" }],
  creator: "Ali Mercan",
  publisher: "Mega Mali Müşavirlik",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Mega Mali Müşavirlik | Ali Mercan",
    description:
      "Vergi, SGK, bordro ve finansal raporlama süreçlerinde şeffaf, ölçülebilir ve hızlı çözümler sunan mali müşavirlik ve danışmanlık.",
    type: "website",
    locale: "tr_TR",
    siteName: "Mega Mali Müşavirlik",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mega Mali Müşavirlik | Ali Mercan",
    description:
      "Vergi, SGK, bordro ve finansal raporlama süreçlerinde şeffaf, ölçülebilir ve hızlı çözümler sunan mali müşavirlik ve danışmanlık.",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <BotIdClient
          protect={[
            {
              path: "/api/contact",
              method: "POST",
            },
          ]}
        />
      </head>
      <body className={`${inter.variable}`}>
        {children}
        <MobilePortalShell>
          <SidePanel variant="mobile" />
        </MobilePortalShell>
        <AiChatbotFloating />
        <Analytics />
      </body>
    </html>
  );
}
