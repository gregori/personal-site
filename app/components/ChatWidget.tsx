"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLanguage } from "@/app/contexts/LanguageContext";

type Message = {
  role: "user" | "assistant";
  content: string;
};

function ChatMessage({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-accent text-background rounded-br-md"
            : "bg-card border border-card-border text-foreground rounded-bl-md"
        }`}
      >
        {msg.content}
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { lang, t } = useLanguage();

  const greeting = useMemo(
    () => ({ role: "assistant" as const, content: t.chat.greeting }),
    [t.chat.greeting]
  );
  const allMessages = useMemo(() => [greeting, ...chatMessages], [greeting, chatMessages]);

  useEffect(() => {
    if (allMessages.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");

    const userMessage: Message = { role: "user", content: text };
    const newChatMessages: Message[] = [...chatMessages, userMessage];
    setChatMessages(newChatMessages);
    setLoading(true);

    const controller = new AbortController();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { role: "assistant", content: t.chat.greeting },
            ...newChatMessages,
          ].map((m) => ({ role: m.role, content: m.content })),
          lang: lang,
        }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Error ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let assistantContent = "";

      setChatMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;
            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta?.content;
              if (delta) {
                assistantContent += delta;
                setChatMessages((prev) => {
                  const next = [...prev];
                  next[next.length - 1] = { role: "assistant", content: assistantContent };
                  return next;
                });
              }
            } catch {
              // skip invalid JSON lines
            }
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      setChatMessages((prev) => [
        ...prev,
        { role: "assistant", content: t.chat.error },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, chatMessages, loading, lang, t.chat.error, t.chat.greeting]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setChatMessages([]);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        type="button"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-background shadow-lg shadow-accent/20 transition-all duration-300 hover:shadow-accent/40 hover:scale-105 active:scale-95"
        aria-label="Toggle Digital Twin chat"
      >
        {open ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      <div
        className={`fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] origin-bottom-right transition-all duration-300 ease-out ${
          open
            ? "scale-100 opacity-100 pointer-events-auto"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col overflow-hidden rounded-2xl border border-card-border bg-background/95 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-3 border-b border-card-border px-5 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-accent to-accent-purple text-[10px] font-bold text-background">
              RG
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{t.chat.title}</p>
              <p className="text-[10px] text-muted flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${loading ? "bg-accent animate-pulse-glow" : "bg-green-400"}`} />
                {loading ? t.chat.thinking : t.chat.online}
              </p>
            </div>
            <button
              onClick={clearChat}
              type="button"
              className="ml-auto text-xs text-muted hover:text-foreground transition-colors"
              title="Clear conversation"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 px-5 py-4 max-h-[400px] min-h-[200px]">
            {allMessages.map((msg, i) => (
              <ChatMessage key={i} msg={msg} />
            ))}
            <div ref={bottomRef} />
          </div>

          <div className="border-t border-card-border px-4 py-3">
            <div className="flex items-center gap-2 rounded-xl border border-card-border bg-card/50 px-3 py-2 focus-within:border-accent/40 transition-colors">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t.chat.placeholder}
                disabled={loading}
                className="flex-1 bg-transparent text-sm text-foreground placeholder-muted outline-none disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                type="button"
                disabled={!input.trim() || loading}
                className="flex h-7 w-7 items-center justify-center rounded-lg bg-accent text-background transition-opacity hover:opacity-90 disabled:opacity-30"
                aria-label="Send message"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
