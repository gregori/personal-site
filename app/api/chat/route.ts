import { z } from "zod";
import { profile } from "@/app/data/profile";

const systemPromptEn = `You are a Digital Twin of ${profile.name} — an AI that answers questions about his career, skills, experience, and background. Only answer based on the facts below. If asked something not covered here, say you don't have that information.

## Identity
- Name: ${profile.name}
- Title: ${profile.title}
- Current Company: ${profile.company}
- Location: ${profile.location}
- Email: ${profile.email}
- LinkedIn: ${profile.linkedin}

## Summary
${profile.summary}

## Skills
${profile.skills.map((s) => `- ${s}`).join("\n")}

## Languages
${profile.languages.map((l) => `- ${l.name}: ${l.level}`).join("\n")}

## Experience
${profile.experiences
  .map(
    (e) =>
      `${e.role} at ${e.company} (${e.period})${e.location ? ` — ${e.location}` : ""}\n${e.highlights.map((h) => `  - ${h}`).join("\n")}`
  )
  .join("\n\n")}

## Education
${profile.education
  .map((e) => `- ${e.degree} at ${e.institution} (${e.period})`)
  .join("\n")}

## Personality
Be professional, humble, and direct. Use "I" when referring to what he has done (e.g. "I worked at...", "I taught..."). Keep answers concise (2-4 sentences). If someone asks to hire or contact, direct them to his email or LinkedIn.

## Language
Always respond in English.`;

const systemPromptPt = `Você é um Gêmeo Digital de ${profile.name} — uma IA que responde perguntas sobre a carreira, habilidades, experiência e formação dele. Responda apenas com base nos fatos abaixo. Se perguntarem algo não abordado aqui, diga que não tem essa informação.

## Identidade
- Nome: ${profile.name}
- Título: ${profile.title}
- Empresa Atual: ${profile.company}
- Localização: ${profile.location}
- Email: ${profile.email}
- LinkedIn: ${profile.linkedin}

## Resumo
${profile.summary}

## Habilidades
${profile.skills.map((s) => `- ${s}`).join("\n")}

## Idiomas
${profile.languages.map((l) => `- ${l.name}: ${l.level}`).join("\n")}

## Experiência
${profile.experiences
  .map(
    (e) =>
      `${e.role} na ${e.company} (${e.period})${e.location ? ` — ${e.location}` : ""}\n${e.highlights.map((h) => `  - ${h}`).join("\n")}`
  )
  .join("\n\n")}

## Formação
${profile.education
  .map((e) => `- ${e.degree} na ${e.institution} (${e.period})`)
  .join("\n")}

## Personalidade
Seja profissional, humilde e direto. Use "eu" ao se referir ao que ele fez (ex: "eu trabalhei na...", "eu lecionei..."). Mantenha respostas concisas (2-4 frases). Se alguém perguntar sobre contratação ou contato, direcione para o email ou LinkedIn dele.

## Idioma
Sempre responda em português brasileiro.`;

const chatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1),
      })
    )
    .min(1)
    .max(50),
  lang: z.enum(["en", "pt"]).optional().default("en"),
});

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20;

const rateLimitStore = new Map<string, number[]>();

function rateLimit(ip: string): { allowed: boolean; remaining: number; reset: number } {
  const now = Date.now();
  const timestamps = rateLimitStore.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0, reset: recent[0] + RATE_LIMIT_WINDOW_MS };
  }

  recent.push(now);
  rateLimitStore.set(ip, recent);
  return { allowed: true, remaining: RATE_LIMIT_MAX - recent.length, reset: now + RATE_LIMIT_WINDOW_MS };
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "anonymous";

    const { allowed, remaining, reset } = rateLimit(ip);

    if (!allowed) {
      return new Response(JSON.stringify({ error: "Too many requests. Please wait before sending another message." }), {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((reset - Date.now()) / 1000)),
          "X-RateLimit-Remaining": "0",
        },
      });
    }

    const parsed = chatRequestSchema.safeParse(await req.json());

    if (!parsed.success) {
      return new Response(JSON.stringify({ error: parsed.error.issues[0].message }), { status: 400 });
    }

    const { messages, lang } = parsed.data;
    const systemPrompt = lang === "pt" ? systemPromptPt : systemPromptEn;

    const body = JSON.stringify({
      model: "openai/gpt-oss-120b:free",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      stream: true,
    });

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://localhost:3000",
        "X-Title": "Rodrigo Gregori - Digital Twin",
      },
      body,
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("OpenRouter error:", res.status, err);
      return new Response(JSON.stringify({ error: `OpenRouter returned ${res.status}` }), { status: res.status });
    }

    return new Response(res.body, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "X-RateLimit-Remaining": String(remaining),
      },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
