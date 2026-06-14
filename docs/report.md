# Project Critical Analysis Report

## Project Overview

**cursor-site** — Personal portfolio website for Rodrigo Gregori, a Software Engineer Specialist with nearly 20 years of experience. Built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4.

---

## Architecture

### Tech Stack
| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js | 16.2.9 (App Router) |
| Runtime | React | 19.2.4 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS | ^4 (CSS-first config) |
| Linting | ESLint | ^9 (eslint-config-next) |
| Fonts | next/font/google | Inter, JetBrains Mono |

### Project Structure
```
cursor-site/
├── app/
│   ├── api/chat/route.ts        # OpenRouter streaming chat API
│   ├── components/              # 6 client components
│   ├── contexts/LanguageContext # i18n context (EN/PT)
│   ├── data/profile.ts          # Centralized profile data
│   ├── i18n/translations.ts     # Full translation dictionary
│   ├── globals.css              # Tailwind v4 theme + animations
│   ├── layout.tsx               # Root layout + providers
│   └── page.tsx                 # Home page composition
├── public/                      # Static assets
├── .env                         # OPENROUTER_API_KEY
└── Configuration files          # tsconfig, eslint, next.config, etc.
```

### Component Architecture
All UI components are **Client Components** (`"use client"`) with:
- **IntersectionObserver** for scroll-reveal animations (About, Journey, PortfolioGrid)
- **LocalStorage** persistence for language preference
- **Streaming SSE** chat via OpenRouter API (gpt-oss-120b:free)
- **CSS Custom Properties** for dynamic theming (mouse-tracking gradients)

### Data Flow
```
profile.ts (source of truth)
    → translations.ts (i18n strings + localized highlights)
    → Components consume via useLanguage() hook
    → Chat API injects profile into system prompt
```

---

## What's Developed

### ✅ Core Features
1. **Responsive Single-Page Portfolio** — Hero, About, Journey (Timeline), Portfolio, Footer
2. **Bilingual Support (EN/PT)** — Full translation coverage including dynamic experience highlights
3. **Digital Twin Chat Widget** — Streaming AI chat with OpenRouter, language-aware, abortable requests
4. **Rich Animations** — CSS keyframes + IntersectionObserver reveals + mouse-following gradients
5. **Theme System** — Dark theme with cyan/purple accent, custom scrollbar, grid/dot backgrounds
6. **Accessibility** — Semantic HTML, ARIA labels, focus states, keyboard navigation

### ✅ API Layer
- **POST /api/chat** — Proxies to OpenRouter with streaming SSE response
- System prompts injected with full profile data (EN/PT)
- Error handling with user-facing fallbacks

### ✅ Developer Experience
- Strict TypeScript (`strict: true`)
- Path aliases (`@/*`)
- ESLint with Next.js core-web-vitals + TypeScript configs
- Incremental compilation

---

## Linting Errors & Warnings

### 🔴 Errors (3)
| File | Line | Issue | Rule |
|------|------|-------|------|
| `ChatWidget.tsx` | 44 | `setMessages` called synchronously in `useEffect` | `react-hooks/set-state-in-effect` |
| `ChatWidget.tsx` | 51 | `setMessages` called synchronously in `useEffect` (initial greeting) | `react-hooks/set-state-in-effect` |
| `LanguageContext.tsx` | 22 | `setLangState` called synchronously in `useEffect` (localStorage read) | `react-hooks/set-state-in-effect` |

### 🟡 Warnings (4)
| File | Line | Issue | Rule |
|------|------|-------|------|
| `About.tsx` | 18 | `lang` destructured but unused | `@typescript-eslint/no-unused-vars` |
| `ChatWidget.tsx` | 33 | `abortController` state declared but never read | `@typescript-eslint/no-unused-vars` |
| `ChatWidget.tsx` | 53 | Missing deps: `messages.length`, `t.chat.greeting` | `react-hooks/exhaustive-deps` |
| `ChatWidget.tsx` | 139 | Missing dep: `lang` in `useCallback` | `react-hooks/exhaustive-deps` |

### Root Cause
The errors stem from **initialization patterns** where state is set after reading from external sources (localStorage, initial render). React 19's stricter hooks rules flag these as potential cascading renders.

---

## Best Practices Assessment

### ✅ Strengths
| Area | Observation |
|------|-------------|
| **Separation of Concerns** | Profile data isolated in `profile.ts`; translations in dedicated file; components consume via context |
| **Type Safety** | Full TypeScript coverage; interfaces for Experience, Education; strict mode enabled |
| **Performance** | `useCallback` for event handlers; passive scroll listeners; CSS animations over JS where possible |
| **i18n Design** | Single source of truth; localized highlights mapped via keys; language persists in localStorage |
| **Animation Strategy** | CSS-first animations (GPU-accelerated); IntersectionObserver for scroll reveals (performant) |
| **Chat UX** | Streaming SSE with abort controller; optimistic UI updates; loading states; clear conversation |
| **Theme System** | CSS custom properties for dynamic values (mouse position); Tailwind v4 `@theme` for design tokens |

### ⚠️ Areas for Improvement
| Area | Issue | Recommendation |
|------|-------|----------------|
| **Hooks Compliance** | 3 `setState` in `useEffect` errors | Use lazy initializers: `useState(() => localStorage.getItem(...))` for LanguageContext; initialize messages with greeting directly in `useState` |
| **Unused State** | `abortController` state not read | Remove state; keep `AbortController` in ref if needed for cleanup |
| **Dependency Arrays** | 2 missing deps warnings | Add `lang` to `sendMessage` deps; fix effect deps or restructure initialization |
| **Unused Variable** | `lang` in About.tsx | Prefix with `_` or remove from destructure |
| **Error Boundaries** | None implemented | Add React Error Boundary for chat widget isolation |
| **Testing** | No test setup | Add Vitest + React Testing Library; test context, API route, components |
| **SEO/Metadata** | Basic metadata only | Add Open Graph, Twitter cards, JSON-LD structured data |
| **Analytics** | None | Consider privacy-friendly analytics (Plausible, Umami) |
| **Bundle Analysis** | Not configured | Add `@next/bundle-analyzer` for CI checks |

### 🔧 Code Quality Issues
1. **ChatWidget.tsx:38** — `prevLang` ref updated but `messages` in closure may be stale; consider functional update form
2. **ChatWidget.tsx:99** — `setMessages` with callback form would avoid stale `assistantContent` closure
3. **LanguageContext.tsx:32-38** — Early return with Provider creates duplicate provider logic; consider single return with conditional value
4. **translations.ts** — Large object (278 lines); consider splitting by namespace for maintainability

---

## Security Considerations

| Aspect | Status |
|--------|--------|
| **API Key** | Stored in `.env` (not committed); accessed via `process.env.OPENROUTER_API_KEY` |
| **CORS** | OpenRouter called server-side; no client exposure |
| **XSS** | User input rendered as text (not HTML); safe |
| **Rate Limiting** | None on `/api/chat` — consider adding |
| **Input Validation** | Basic array check only; add Zod schema |

---

## Performance Metrics (Estimated)

| Metric | Expectation |
|--------|-------------|
| **First Contentful Paint** | ~1.2s (fonts + CSS) |
| **Largest Contentful Paint** | ~1.8s (Hero section) |
| **Total Bundle** | ~150-200 KB gzipped (Next.js + React + components) |
| **Animations** | 60fps (CSS transforms/opacity only) |

---

## Recommendations Priority

### High (Fix Before Deploy)
1. Fix 3 ESLint errors (hooks violations)
2. Add rate limiting to `/api/chat`
3. Validate API input with Zod

### Medium (Next Sprint)
1. Resolve 4 warnings (unused vars, deps)
2. Add Error Boundary for ChatWidget
3. Implement SEO metadata (OG, JSON-LD)
4. Split translations.ts by namespace

### Low (Technical Debt)
1. Add test suite (Vitest + RTL)
2. Bundle analyzer in CI
3. Analytics integration
4. Refactor LanguageContext provider pattern

---

## Conclusion

The project is **well-architected** for a personal portfolio with modern tooling (Next.js 16, React 19, Tailwind v4). The component composition, i18n strategy, and animation system demonstrate senior-level frontend practices.

**Main blocker**: The 3 ESLint errors must be resolved — they indicate React 19 incompatibilities that could cause hydration mismatches or performance issues in production.

**Overall Grade**: **B+** — Strong foundation, minor compliance issues, ready for polish.