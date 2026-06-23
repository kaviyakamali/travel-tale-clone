import { createServerFn } from "@tanstack/react-start";
import { generateText, Output } from "ai";
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

export const suggestDestinations = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => SuggestInput.parse(input))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");

    const gateway = createLovableAiGatewayProvider(key);

    const { output } = await generateText({
      model: gateway("google/gemini-3-flash-preview"),
      output: Output.object({
        schema: z.object({
          intro: z.string(),
          suggestions: z
            .array(
              z.object({
                destination: z.string(),
                category: z.string(),
                reason: z.string(),
                searchQuery: z.string(),
              }),
            )
            .max(4),
        }),
      }),
      prompt:
        `You are a travel concierge for a vacation rental app called Wanderly. ` +
        `Based on the traveller's vibe: "${data.mood}", suggest up to 4 dream destinations. ` +
        `For each, pick the single best matching category strictly from this list: ${CATEGORY_NAMES.join(", ")}. ` +
        `"searchQuery" must be a short city or place keyword (1-2 words) a user could type to filter listings. ` +
        `"reason" is one warm sentence (max 18 words). "intro" is one friendly sentence summarising the picks.`,
    });

    return output;
  });
