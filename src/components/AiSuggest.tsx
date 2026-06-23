import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { suggestDestinations } from "@/lib/ai.functions";

interface Suggestion {
  destination: string;
  category: string;
  reason: string;
  searchQuery: string;
}

interface AiSuggestProps {
  onPick: (searchQuery: string, category: string) => void;
}

const PROMPTS = [
  "Quiet cabin in the mountains",
  "Beach honeymoon with a pool",
  "Off-grid adventure under the stars",
];

export function AiSuggest({ onPick }: AiSuggestProps) {
  const suggest = useServerFn(suggestDestinations);
  const [mood, setMood] = useState("");
  const [loading, setLoading] = useState(false);
  const [intro, setIntro] = useState("");
  const [results, setResults] = useState<Suggestion[]>([]);

  const run = async (value: string) => {
    const text = value.trim();
    if (!text || loading) return;
    setLoading(true);
    setResults([]);
    setIntro("");
    try {
      const out = await suggest({ data: { mood: text } });
      setIntro(out.intro);
      setResults(out.suggestions);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(
        msg.includes("429")
          ? "AI is busy right now — try again shortly."
          : msg.includes("402")
            ? "AI credits exhausted."
            : "Couldn't fetch suggestions. Try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/10 via-background to-accent/10 p-6 sm:p-8"
      >
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="h-5 w-5" />
          <span className="text-sm font-semibold uppercase tracking-wide">AI Trip Concierge</span>
        </div>
        <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
          Describe your dream trip, get instant ideas
        </h2>
        <p className="mt-1 text-muted-foreground">
          Tell us the vibe and our AI matches you to the perfect stays.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            run(mood);
          }}
          className="mt-5 flex flex-col gap-3 sm:flex-row"
        >
          <Input
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            placeholder="e.g. cozy snowy retreat for two"
            className="h-12 flex-1 rounded-full bg-background/80 px-5 shadow-sm"
          />
          <Button type="submit" disabled={loading} className="h-12 rounded-full px-6 font-semibold">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? "Thinking…" : "Suggest"}
          </Button>
        </form>

        <div className="mt-3 flex flex-wrap gap-2">
          {PROMPTS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                setMood(p);
                run(p);
              }}
              className="rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              {p}
            </button>
          ))}
        </div>

        <AnimatePresence>
          {(intro || results.length > 0) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6"
            >
              {intro && <p className="mb-4 text-sm font-medium">{intro}</p>}
              <div className="grid gap-3 sm:grid-cols-2">
                {results.map((s, i) => (
                  <motion.button
                    key={`${s.destination}-${i}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => onPick(s.searchQuery, s.category)}
                    className="group flex items-start justify-between gap-3 rounded-2xl border bg-background/80 p-4 text-left transition-all hover:border-primary hover:shadow-md"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{s.destination}</h3>
                        <Badge variant="secondary" className="text-[10px]">{s.category}</Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{s.reason}</p>
                    </div>
                    <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
