import { createFileRoute } from "@tanstack/react-router";
import { generateText } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const CATEGORY_NAMES = [
  "Amazing Views",
  "Beachfront",
  "Cabins",
  "Tiny Homes",
  "Trending",
  "Farms",
  "Pools",
  "Treehouses",
  "Luxury",
  "Camping",
];

function extractJson(text: string): Record<string, unknown> {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON in AI response");
  return JSON.parse(raw.slice(start, end + 1)) as Record<string, unknown>;
}

export const Route = createFileRoute("/api/suggest")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as { mood?: unknown };
          const mood = typeof body.mood === "string" ? body.mood.trim().slice(0, 300) : "";
          if (!mood) return Response.json({ error: "Mood is required" }, { status: 400 });

          const key = process.env.LOVABLE_API_KEY;
          if (!key) return Response.json({ error: "Missing API key" }, { status: 500 });

          const gateway = createLovableAiGatewayProvider(key);
          const { text } = await generateText({
            model: gateway("google/gemini-3-flash-preview"),
            prompt:
              `You are a travel concierge for a vacation rental app called Wanderly. ` +
              `Based on the traveller's vibe: "${mood}", suggest up to 4 dream destinations. ` +
              `For each, pick the single best matching category strictly from this list: ${CATEGORY_NAMES.join(", ")}. ` +
              `Respond with ONLY valid minified JSON, no markdown, in this exact shape: ` +
              `{"intro":string,"suggestions":[{"destination":string,"category":string,"reason":string,"searchQuery":string}]}. ` +
              `"searchQuery" must be a short city or place keyword (1-2 words). ` +
              `"reason" is one warm sentence (max 18 words). "intro" is one friendly summary sentence.`,
          });

          const parsed = extractJson(text);
          const list = Array.isArray(parsed.suggestions) ? parsed.suggestions : [];
          const suggestions = list.slice(0, 4).map((s: Record<string, unknown>) => ({
            destination: String(s?.destination ?? ""),
            category: String(s?.category ?? ""),
            reason: String(s?.reason ?? ""),
            searchQuery: String(s?.searchQuery ?? ""),
          }));

          return Response.json({
            intro: String(parsed.intro ?? "Here are a few stays picked just for you."),
            suggestions,
          });
        } catch (e) {
          const msg = e instanceof Error ? e.message : "Unknown error";
          return Response.json({ error: msg }, { status: 500 });
        }
      },
    },
  },
});
