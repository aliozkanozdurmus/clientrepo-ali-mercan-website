import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
import { checkBotId } from "botid/server";

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASS,
} = process.env;

const CONTACT_TO = SMTP_USER ?? "info@megamalimusavirlik.com.tr";

function requiredEnv() {
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
    return "SMTP ayarları eksik.";
  }
  return null;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: NextRequest) {
  const missing = requiredEnv();
  if (missing) {
    return NextResponse.json({ error: missing }, { status: 500 });
  }

  const { isBot } = await checkBotId();
  if (isBot) {
    return NextResponse.json({ error: "Bot doğrulaması başarısız." }, { status: 401 });
  }

  let body: {
    name?: string;
    email?: string;
    message?: string;
    website?: string;
    startedAt?: number;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";
  const website = body.website?.trim() ?? "";
  const startedAt = Number(body.startedAt ?? 0);
  const receivedAt = new Date();

  if (website) {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Eksik alanlar var." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "E-posta adresi geçersiz." }, { status: 400 });
  }

  if (name.length > 80 || email.length > 120 || message.length > 1000) {
    return NextResponse.json({ error: "Alan uzunlukları aşıldı." }, { status: 400 });
  }

  if (Number.isFinite(startedAt) && Date.now() - startedAt < 2500) {
    return NextResponse.json({ error: "Lütfen doğrulamayı tamamlayın." }, { status: 400 });
  }

  const forwardedFor = req.headers.get("x-forwarded-for") || "";
  const ip = forwardedFor.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";

  try {
    const smtpPort = parseInt(SMTP_PORT || "587", 10);
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      }
    });

    const subject = `İletişim Formu: ${name}`;

    // Sadece en temel bilgileri bırakıyoruz
    const text = [
      `Ad Soyad: ${name}`,
      `E-posta: ${email}`,
      "",
      "Mesaj:",
      message,
      "",
      `Tarih: ${receivedAt.toLocaleString("tr-TR")}`,
      `Gönderen IP: ${ip}`
    ].join("\n");

    const html = `
    <div style="font-family: sans-serif; padding: 20px; color: #333;">
      <h2 style="color: #0f172a;">Yeni İletişim Mesajı</h2>
      <p><strong>Ad Soyad:</strong> ${name}</p>
      <p><strong>E-posta:</strong> ${email}</p>
      <p><strong>Mesaj:</strong></p>
      <div style="background: #f4f4f4; padding: 15px; border-radius: 5px; white-space: pre-wrap;">${message}</div>
      <hr style="margin-top: 20px; border: 0; border-top: 1px solid #eee;" />
      <p style="font-size: 12px; color: #666;">Tarih: ${receivedAt.toLocaleString("tr-TR")} | IP: ${ip}</p>
    </div>
    `;

    await transporter.sendMail({
      from: `"Web Sitesi İletişim" <${SMTP_USER}>`,
      to: CONTACT_TO,
      replyTo: email,
      subject,
      text,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Email send error:", err);
    return NextResponse.json(
      { error: "Gönderim Hatası: " + (err.message || "Bilinmiyor") },
      { status: 500 }
    );
  }
}
