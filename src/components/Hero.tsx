import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section className="relative mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl">
        <img
          src={heroImg}
          alt="Luxury cliffside villa with infinity pool overlooking the ocean at sunset"
          width={1920}
          height={1080}
          className="h-[460px] w-full object-cover sm:h-[540px]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
        <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-12 lg:p-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Over 7M stays worldwide
            </span>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
              Find your next <span className="text-primary">unforgettable</span> stay
            </h1>
            <p className="mt-4 max-w-lg text-base text-white/85 sm:text-lg">
              From beachfront bungalows to cliffside villas — book unique homes and
              experiences hosted by locals around the world.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="h-12 rounded-full px-7 text-base font-semibold">
                <Search className="mr-2 h-5 w-5" /> Start exploring
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="h-12 rounded-full px-7 text-base font-semibold"
              >
                Browse experiences
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
