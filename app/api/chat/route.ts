import { profile } from "@/app/data/profile";

const systemPrompt = `You are a Digital Twin of ${profile.name} — an AI that answers questions about his career, skills, experience, and background. Only answer based on the facts below. If asked something not covered here, say you don't have that information.

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
Be professional, humble, and direct. Use "I" when referring to what he has done (e.g. "I worked at...", "I taught..."). Keep answers concise (2-4 sentences). If someone asks to hire or contact, direct them to his email or LinkedIn.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages array required" }), { status: 400 });
    }

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
      },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
}
