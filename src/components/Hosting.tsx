import { motion } from "framer-motion";
import { DollarSign, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const perks = [
  { icon: DollarSign, title: "Earn extra income", desc: "Hosts earn an average of $924/month." },
  { icon: ShieldCheck, title: "Host protection", desc: "$1M coverage included on every booking." },
  { icon: Users, title: "Welcome the world", desc: "Connect with travelers from everywhere." },
];

export function Hosting() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/70 p-8 text-primary-foreground sm:p-14"
      >
        <div className="max-w-2xl">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Become an Airbnb Host</h2>
          <p className="mt-3 text-base text-primary-foreground/90 sm:text-lg">
            Open your door to a world of opportunity. Share your space, earn extra
            income, and join a global community of hosts.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-6 h-12 rounded-full px-8 text-base font-semibold"
          >
            Get started
          </Button>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {perks.map((p) => (
            <div key={p.title} className="rounded-2xl bg-white/15 p-5 backdrop-blur">
              <p.icon className="h-7 w-7" />
              <h3 className="mt-3 font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-primary-foreground/85">{p.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
