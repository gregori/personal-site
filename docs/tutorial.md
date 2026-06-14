# Rodrigo Gregori — Portfolio Site

Site pessoal profissional com currículo via LinkedIn, portfólio (placeholder) e um **Digital Twin** (chat IA) que responde perguntas sobre a carreira do Rodrigo.

**Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, OpenRouter API

---

## Quick Start

```bash
npm install        # já instalado
npm run dev        # http://localhost:3000
npm run build      # produção
```

> O servidor dev é iniciado com `detached: true` para não travar o terminal.
> Se precisar matar: `taskkill /F /PID $(cat server.pid)` ou `Stop-Process -Name node`.

---

## Arquitetura

```
app/
├── api/chat/route.ts    → proxy OpenRouter (streaming)
├── components/
│   ├── Navbar.tsx        → navegação fixa + seletor EN/PT
│   ├── Hero.tsx          → seção principal (nome, título, CTA)
│   ├── About.tsx         → sobre + skills + idiomas
│   ├── Journey.tsx       → timeline de carreira + educação
│   ├── PortfolioGrid.tsx → cards de projetos (placeholder)
│   ├── Footer.tsx        → links rápidos, email, LinkedIn
│   └── ChatWidget.tsx    → floating bubble com chat IA
├── contexts/
│   └── LanguageContext   → provider EN/PT com persistência localStorage
├── data/
│   └── profile.ts       → dados extraídos do LinkedIn PDF
├── i18n/
│   └── translations.ts  → textos EN e PT de todos os componentes
├── layout.tsx           → wrapper global (fontes, LanguageProvider, ChatWidget)
├── page.tsx             → composição das seções
└── globals.css          → animações CSS, tema escuro, scrollbar
```

<details>
<summary><strong>📁 Por que essa estrutura?</strong></summary>

- **Sem `src/`** — Next.js recomenda App Router na raiz pra projetos menores
- **`data/profile.ts`** centraliza todas as informações do LinkedIn; pra atualizar o site, edite só esse arquivo
- **`i18n/translations.ts`** separa apresentação de dados — o profile tem os fatos, as traduções têm o texto localizado
- **Componentes individuais** em `components/` permite testar e modificar cada seção isoladamente
</details>

---

## Decisões Técnicas

### Tailwind CSS v4

Usamos a sintaxe `@import "tailwindcss"` (v4), sem `tailwind.config.js`. As cores e fontes são definidas com `@theme inline` em `globals.css`:

```css
@theme inline {
  --color-background: #07070d;
  --color-accent: #00d4ff;
  --color-accent-purple: #a855f7;
  --color-card: #0f0f1a;
  --color-muted: #6b6b80;
}
```

Todas as animações são CSS puro (`@keyframes`) — evitamos dependência de framer-motion que não instalou corretamente no ambiente.

<details>
<summary><strong>📁 Temas e animações disponíveis</strong></summary>

- `animate-float` — orbs flutuantes no Hero
- `animate-pulse-glow` — pulsação suave (usada no status do chat)
- `animate-slide-up / slide-right / slide-left` — entrada de elementos
- `animate-fade-in / scale-in` — fade e escala
- `reveal` + Intersection Observer — scroll-reveal em todas as seções
- `.gradient-text` — gradiente ciano → roxo animado
- `.bg-grid` / `.bg-dot` — padrões de fundo
</details>

### Internacionalização (i18n)

Sem lib externa — contexto React + objeto de traduções:

- **`LanguageContext`** guarda `lang` ("en" | "pt") no estado e persiste em `localStorage`
- **`useLanguage()`** hook expõe `{ lang, setLang, t }` onde `t` é o objeto de tradução completo
- **`translations.ts`** contém `en` e `pt` tipados com `Translation`
- Na navbar, botões **EN | PT** chamam `setLang`
- Ao trocar idioma sem conversa ativa, o greeting do chat atualiza automaticamente

### Digital Twin (Chat IA)

<details>
<summary><strong>📁 Fluxo completo</strong></summary>

1. Usuário digita → `ChatWidget` faz `POST /api/chat` com `{ messages, lang }`
2. API route monta system prompt com perfil completo do Rodrigo (em EN ou PT)
3. Chama OpenRouter com `openai/gpt-oss-120b:free` em **streaming**
4. Resposta é repassada como `text/event-stream` para o cliente
5. ChatWidget lê o stream linha a linha, parseia JSON das linhas `data:` e atualiza a UI incrementalmente

System prompt inclui: identidade, resumo, skills, idiomas, toda a experiência (com highlights) e formação. O modelo é instruído a responder em **1ª pessoa** ("I worked at...") e no idioma correspondente.
</details>

### Estilo "Enterprise meets edgy"

- **Escuro** (`#07070d`) com acento **ciano elétrico** (`#00d4ff`) e **roxo** (`#a855f7`)
- Cards com vidro fosco (`backdrop-blur`) e bordas sutis
- Gradientes animados em títulos e bordas
- Grid e dot patterns no fundo das seções
- Scrollbar customizada fina
- Transições suaves em hover (`duration-300`)
- Ícone do chat flutuante no canto inferior direito

---

## Como Manter

### Atualizar perfil (currículo)

Edite `app/data/profile.ts`:

```ts
// Adicionar nova experiência
experiences: [
  {
    role: "Nova Role",
    company: "Nova Empresa",
    period: "Mês Ano — Presente",
    location: "Cidade, País",
    highlights: ["Feito 1", "Feito 2"],
  },
]
```

Se adicionar/remover experiências, ajuste também `highlightKeys` em `Journey.tsx` e os respectivos textos em `i18n/translations.ts`.

### Adicionar projetos ao portfólio

Em `translations.ts`, seção `portfolio.projects` — cada projeto tem `{ title, tag, desc }`. A tag "Coming Soon" / "Em Breve" pode ser alterada para "Live" ou "GitHub" quando estiverem prontos.

### Mudar modelo do chat

Em `app/api/chat/route.ts`, altere:

```ts
model: "openai/gpt-oss-120b:free"
```

Para qualquer modelo disponível no [OpenRouter](https://openrouter.ai/models).

### Publicar

**Recomendado: Vercel** (gratuito, suporte nativo a Next.js + API routes).

```bash
npx vercel --prod
```

Ou conecte o repositório GitHub em [vercel.com](https://vercel.com). Configure a env var `OPENROUTER_API_KEY` no dashboard.

> ⚠ GitHub Pages **não funciona** — o site tem API route dinâmica (`/api/chat`).

---

## Variáveis de Ambiente

| Variável | Obrigatória | Descrição |
|---|---|---|
| `OPENROUTER_API_KEY` | Sim | Chave da API OpenRouter para o Digital Twin |

---

## Dependências

| Pacote | Versão | Motivo |
|---|---|---|
| `next` | 16.2.9 | Framework |
| `react` / `react-dom` | 19.2.4 | UI |
| `tailwindcss` | 4 | CSS utility-first |
| `typescript` | 5 | Tipagem |

Nenhuma dependência extra de animação ou i18n — tudo feito com CSS puro e Context API.
