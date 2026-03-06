"use client";

import { useState, useEffect } from "react";
import { X, Sparkles, Send, MessageCircle } from "lucide-react";
import ReactMarkdown from "react-markdown";

type Message = {
  id: number;
  from: "bot" | "user";
  text: string;
};

type AiChatbotProps = {
  variant?: "floating" | "embedded";
};

export function AiChatbot({ variant = "floating" }: AiChatbotProps) {
  const isEmbedded = variant === "embedded";
  const [suggestions] = useState<string[]>(() => {
    try {
      const s = process.env.NEXT_PUBLIC_AI_OPENING_QUESTIONS;
      if (s) {
        const parsed = JSON.parse(s);
        return Array.isArray(parsed) ? parsed : [];
      }
    } catch {
      return [];
    }
    return [];
  });

  const [isOpen, setIsOpen] = useState(isEmbedded);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSend = async (overrideText?: string) => {
    const textToSend = typeof overrideText === "string" ? overrideText : input.trim();
    if (!textToSend || isLoading) return;

    const userMessage: Message = { id: Date.now(), from: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    if (!overrideText) setInput("");

    setIsLoading(true);

    const botMessageId = Date.now() + 1;
    let botMessageAdded = false;

    try {
      const history = messages
        .filter((m) => m.text.trim() !== "")
        .concat(userMessage)
        .slice(-8)
        .map((m) => ({
          role: m.from === "bot" ? "assistant" : "user",
          content: m.text,
        }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok || !res.body) throw new Error("Failed to get response");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                accumulatedText += parsed.content;

                if (!botMessageAdded) {
                  setMessages((prev) => [...prev, { id: botMessageId, from: "bot", text: accumulatedText }]);
                  botMessageAdded = true;
                  setIsLoading(false);
                } else {
                  setMessages((prev) =>
                    prev.map((m) => (m.id === botMessageId ? { ...m, text: accumulatedText } : m))
                  );
                }
              }
            } catch {
              // Ignore malformed stream chunk
            }
          }
        }
      }

      if (!accumulatedText) {
        setMessages((prev) => [...prev, { id: botMessageId, from: "bot", text: "Şu an yanıt veremiyorum." }]);
      }
    } catch {
      const errorMsg = "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.";
      if (botMessageAdded) {
        setMessages((prev) => prev.map((m) => (m.id === botMessageId ? { ...m, text: errorMsg } : m)));
      } else {
        setMessages((prev) => [...prev, { id: botMessageId, from: "bot", text: errorMsg }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen && !isEmbedded) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="chatbot-trigger"
        style={{
          height: 56,
          padding: isMobile ? "0" : "0 24px",
          width: isMobile ? 56 : "auto",
          borderRadius: "18px",
          background: "linear-gradient(135deg, #fdfbf7 0%, #f5f0e1 100%)",
          color: "var(--accent-primary)",
          border: "1px solid rgba(196, 154, 79, 0.2)",
          boxShadow: isMobile
            ? "0 4px 12px -2px rgba(196, 154, 79, 0.15)"
            : "0 10px 30px -8px rgba(196, 154, 79, 0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          cursor: "pointer",
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
        aria-label="AI Asistanı Aç"
      >
        <Sparkles size={isMobile ? 26 : 22} strokeWidth={1.5} />
        {!isMobile && (
          <span style={{ fontWeight: 600, fontSize: "calc(0.95rem - 2px)", letterSpacing: "-0.01em" }}>
            Yapay Zeka Asistanı
          </span>
        )}
        <style jsx>{`
          .chatbot-trigger:hover {
            transform: translateY(-4px) scale(1.02);
            box-shadow: 0 15px 40px -10px rgba(196, 154, 79, 0.35);
            background: linear-gradient(135deg, #ffffff 0%, #fdfbf7 100%);
            border-color: rgba(196, 154, 79, 0.4);
          }
        `}</style>
      </button>
    );
  }

  return (
    <div
      className="chatbot-window"
      style={{
        width: isEmbedded ? "100%" : "min(400px, calc(100vw - 32px))",
        background: "#ffffff",
        border: "1px solid var(--border-light)",
        borderRadius: "24px",
        boxShadow: "0 30px 80px -20px rgba(12, 18, 32, 0.15)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        maxHeight: isMobile ? "min(480px, 55vh)" : "min(650px, 85vh)",
        animation: "slideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem 1.5rem",
          background: "linear-gradient(to right, #fdfbf7, #fff)",
          borderBottom: "1px solid rgba(15, 23, 42, 0.05)",
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "14px",
              background: "rgba(196, 154, 79, 0.08)",
              display: "grid",
              placeItems: "center",
              color: "var(--accent-primary)",
              border: "1px solid rgba(196, 154, 79, 0.1)",
            }}
          >
            <Sparkles size={24} strokeWidth={1.5} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: isMobile ? "calc(0.85rem - 2px)" : "calc(1.05rem - 2px)", color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
              Yapay Zeka Asistanı
            </div>
            <div style={{ fontSize: isMobile ? "calc(0.62rem - 2px)" : "calc(0.78rem - 2px)", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981" }} />
              Aktif Danışman
            </div>
          </div>
        </div>
        {!isEmbedded && (
          <button
            onClick={() => setIsOpen(false)}
            style={{
              background: "#f8fafc",
              border: "1px solid var(--border-light)",
              borderRadius: "12px",
              width: 36,
              height: 36,
              display: "grid",
              placeItems: "center",
              cursor: "pointer",
              color: "var(--text-secondary)",
              transition: "all 0.2s",
            }}
            aria-label="Kapat"
          >
            <X size={18} strokeWidth={1.8} />
          </button>
        )}
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "1.5rem",
          background: "#fff",
        }}
      >
        {messages.length === 0 && (
          <div style={{ textAlign: "center", padding: isMobile ? "2rem 0.5rem" : "2.5rem 1rem" }}>
            <div style={{
              width: isMobile ? 48 : 60,
              height: isMobile ? 48 : 60,
              background: "#fdfbf7",
              borderRadius: isMobile ? "16px" : "20px",
              display: "grid",
              placeItems: "center",
              margin: isMobile ? "0 auto 1.1rem" : "0 auto 1.5rem",
              color: "var(--accent-primary)",
              border: "1px solid rgba(196, 154, 79, 0.1)"
            }}>
              <MessageCircle size={isMobile ? 24 : 30} strokeWidth={1.5} />
            </div>
            <div style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.5rem", fontSize: isMobile ? "calc(0.9rem - 2px)" : "calc(1rem - 2px)" }}>
              Size nasıl yardımcı olabilirim?
            </div>
            <div style={{ color: "var(--text-muted)", fontSize: isMobile ? "calc(0.78rem - 2px)" : "calc(0.88rem - 2px)", lineHeight: 1.5 }}>
              Mali süreçler, teşvikler veya danışmanlık hizmetlerimizle ilgili sorularınızı sorabilirsiniz.
            </div>
          </div>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            style={{
              alignSelf: m.from === "user" ? "flex-end" : "flex-start",
              background: m.from === "user"
                ? "var(--accent-primary)"
                : "#f8fafc",
              color: m.from === "user" ? "#fff" : "var(--text-primary)",
              padding: "0.85rem 1.1rem",
              borderRadius: m.from === "user" ? "20px 20px 4px 20px" : "20px 20px 20px 4px",
              maxWidth: "88%",
              lineHeight: 1.6,
              fontSize: isMobile ? "calc(0.85rem - 2px)" : "calc(0.95rem - 2px)",
              border: m.from === "user" ? "none" : "1px solid rgba(15, 23, 42, 0.05)",
              boxShadow: m.from === "user"
                ? "0 8px 20px -8px rgba(196, 154, 79, 0.4)"
                : "none",
            }}
          >
            <ReactMarkdown
              components={{
                p: ({ ...props }) => <p style={{ marginBottom: "0.5rem" }} {...props} />,
                ul: ({ ...props }) => <ul style={{ paddingLeft: "1.2rem", marginBottom: "0.5rem" }} {...props} />,
                ol: ({ ...props }) => <ol style={{ paddingLeft: "1.2rem", marginBottom: "0.5rem" }} {...props} />,
                li: ({ ...props }) => <li style={{ marginBottom: "0.3rem" }} {...props} />,
                strong: ({ ...props }) => <strong style={{ fontWeight: 700 }} {...props} />,
                a: ({ ...props }) => <a style={{ color: m.from === 'user' ? '#fff' : 'var(--accent-primary)', textDecoration: 'underline' }} {...props} />
              }}
            >
              {m.text}
            </ReactMarkdown>
          </div>
        ))}

        {isLoading && (
          <div
            style={{
              alignSelf: "flex-start",
              padding: "1rem 1.25rem",
              borderRadius: "18px 18px 18px 4px",
              background: "#f8fafc",
              display: "flex",
              gap: "0.4rem",
              alignItems: "center"
            }}
          >
            <div className="typing-dot" style={{ animationDelay: "0s" }} />
            <div className="typing-dot" style={{ animationDelay: "0.2s" }} />
            <div className="typing-dot" style={{ animationDelay: "0.4s" }} />
          </div>
        )}

        {messages.length === 0 && suggestions.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "1rem" }}>
            <div style={{ fontSize: isMobile ? "calc(0.7rem - 2px)" : "calc(0.75rem - 2px)", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.04em" }}>
              Önerilen Sorular
            </div>
            <div style={{ display: "grid", gap: "0.5rem" }}>
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "14px",
                    background: "#ffffff",
                    border: "1px solid var(--border-light)",
                    fontSize: isMobile ? "calc(0.8rem - 2px)" : "calc(0.88rem - 2px)",
                    color: "var(--text-secondary)",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = "var(--accent-primary)";
                    e.currentTarget.style.background = "#fdfbf7";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = "var(--border-light)";
                    e.currentTarget.style.background = "#ffffff";
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div
        style={{
          padding: "1.25rem 1.5rem 1.5rem",
          background: "#ffffff",
          borderTop: "1px solid rgba(15, 23, 42, 0.05)",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "0.6rem",
            alignItems: "center",
            background: "#f8fafc",
            padding: "0.5rem",
            borderRadius: "16px",
            border: "1px solid rgba(15, 23, 42, 0.05)",
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Nasıl yardımcı olabilirim?"
            style={{
              flex: 1,
              height: 42,
              background: "transparent",
              border: "none",
              padding: "0 0.75rem",
              outline: "none",
            fontSize: isMobile ? "calc(0.85rem - 2px)" : "calc(0.95rem - 2px)",
              color: "var(--text-primary)",
            }}
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            style={{
              width: 42,
              height: 42,
              borderRadius: "12px",
              background: input.trim()
                ? "var(--accent-primary)"
                : "rgba(15, 23, 42, 0.05)",
              color: "#fff",
              border: "none",
              display: "grid",
              placeItems: "center",
              cursor: input.trim() ? "pointer" : "default",
              transition: "all 0.2s",
            }}
            aria-label="Gönder"
          >
            <Send size={18} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .typing-dot {
          width: 5px;
          height: 5px;
          background: var(--accent-primary);
          border-radius: 50%;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        @keyframes bounce {
          0%, 80%, 100% { 
            transform: scale(0.6);
            opacity: 0.4;
          }
          40% { 
            transform: scale(1.1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
