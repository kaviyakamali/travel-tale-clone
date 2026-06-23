import { createServerFn } from "@tanstack/react-start";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

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

const SuggestInput = z.object({ mood: z.string().min(1).max(300) });

export interface Suggestion {
  destination: string;
  category: string;
  reason: string;
  searchQuery: string;
}

export interface SuggestResult {
  intro: string;
  suggestions: Suggestion[];
}

function extractJson(text: string): unknown {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON found in AI response");
  return JSON.parse(raw.slice(start, end + 1));
}

export const suggestDestinations = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => SuggestInput.parse(input))
  .handler(async ({ data }): Promise<SuggestResult> => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const gateway = createLovableAiGatewayProvider(key);

    const { text } = await generateText({
      model: gateway("google/gemini-3-flash-preview"),
      prompt:
        `You are a travel concierge for a vacation rental app called Wanderly. ` +
        `Based on the traveller's vibe: "${data.mood}", suggest up to 4 dream destinations. ` +
        `For each, pick the single best matching category strictly from this list: ${CATEGORY_NAMES.join(", ")}. ` +
        `Respond with ONLY valid minified JSON, no markdown, in this exact shape: ` +
        `{"intro":string,"suggestions":[{"destination":string,"category":string,"reason":string,"searchQuery":string}]}. ` +
        `"searchQuery" must be a short city or place keyword (1-2 words). ` +
        `"reason" is one warm sentence (max 18 words). "intro" is one friendly summary sentence.`,
    });

    const parsed = extractJson(text) as Partial<SuggestResult>;
    const suggestions = Array.isArray(parsed.suggestions)
      ? parsed.suggestions.slice(0, 4).map((s) => ({
          destination: String(s?.destination ?? ""),
          category: String(s?.category ?? ""),
          reason: String(s?.reason ?? ""),
          searchQuery: String(s?.searchQuery ?? ""),
        }))
      : [];

    return {
      intro: String(parsed.intro ?? "Here are a few stays picked just for you."),
      suggestions,
    };
  });
