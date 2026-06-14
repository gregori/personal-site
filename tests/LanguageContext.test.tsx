import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { LanguageProvider, useLanguage } from "@/app/contexts/LanguageContext";

function TestConsumer() {
  const { lang, t, setLang } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="greeting">{t.chat.greeting}</span>
      <button data-testid="set-pt" onClick={() => setLang("pt")}>
        PT
      </button>
    </div>
  );
}

describe("LanguageContext", () => {
  it("provides default language as English", () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId("lang").textContent).toBe("en");
  });

  it("provides English greeting", () => {
    render(
      <LanguageProvider>
        <TestConsumer />
      </LanguageProvider>
    );
    expect(screen.getByTestId("greeting").textContent).toContain("Digital Twin");
  });

  it("throws when used outside provider", () => {
    expect(() => render(<TestConsumer />)).toThrow(
      "useLanguage must be used within LanguageProvider"
    );
  });
});
