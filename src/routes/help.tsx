import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, HelpCircle, Home, LifeBuoy, Search, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/help")({
  head: () => ({
    meta: [
      { title: "Help Center — Wanderly" },
      {
        name: "description",
        content: "Find answers about booking, hosting, payments, and account support.",
      },
      { property: "og:title", content: "Help Center — Wanderly" },
      {
        property: "og:description",
        content: "Find answers about booking, hosting, payments, and account support.",
      },
    ],
  }),
  component: HelpPage,
});

const topics = [
  { icon: Home, title: "Booking a stay", desc: "Search, reserve, and manage your trips." },
  { icon: User, title: "Your account", desc: "Profile, settings, and security." },
  { icon: CreditCard, title: "Payments & refunds", desc: "Payment methods, receipts, refunds." },
  { icon: Shield, title: "Safety & trust", desc: "Verification and safe travel tips." },
];

const faqs = [
  {
    q: "How do I book a stay?",
    a: "Browse listings on the home page, click a property to view details, then choose your dates and confirm. You'll get an instant confirmation in this demo.",
  },
  {
    q: "How does my wishlist work?",
    a: "Tap the heart icon on any listing to save it. Your wishlist is stored on your device and the count appears in the top navigation menu.",
  },
  {
    q: "Can I cancel a reservation?",
    a: "Yes. Each listing shows its cancellation policy. Go to your trips, select the booking, and choose Cancel to start a refund where eligible.",
  },
  {
    q: "How do I become a host?",
    a: "Click 'Become a Host' in the menu to list your space. You'll add photos, set your price and availability, and publish your listing.",
  },
  {
    q: "What payment methods are accepted?",
    a: "Major credit and debit cards are supported, along with select digital wallets depending on your region.",
  },
  {
    q: "How do I contact support?",
    a: "Use the 'Contact us' button below. Our support team is available 24/7 to help with any issue.",
  },
];

function HelpPage() {
  const [query, setQuery] = useState("");
  const filtered = faqs.filter(
    (f) =>
      !query.trim() ||
      f.q.toLowerCase().includes(query.toLowerCase()) ||
      f.a.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center gap-2 text-primary">
            <LifeBuoy className="h-7 w-7" />
            <span className="text-xl font-extrabold tracking-tight">Help Center</span>
          </Link>
          <Button variant="ghost" size="sm" asChild className="rounded-full">
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
            </Link>
          </Button>
        </div>
      </header>

      <section className="border-b bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-extrabold sm:text-4xl"
          >
            How can we help?
          </motion.h1>
          <div className="relative mx-auto mt-6 max-w-xl">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search help articles…"
              className="h-12 rounded-full pl-11 shadow-sm"
            />
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold">Browse by topic</h2>
        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((t) => (
            <div
              key={t.title}
              className="rounded-xl border p-5 transition-shadow hover:shadow-md"
            >
              <t.icon className="h-7 w-7 text-primary" />
              <h3 className="mt-3 font-semibold">{t.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 flex items-center gap-2 text-xl font-bold">
          <HelpCircle className="h-5 w-5 text-primary" /> Frequently asked questions
        </h2>
        {filtered.length === 0 ? (
          <p className="mt-6 text-muted-foreground">No articles match your search.</p>
        ) : (
          <Accordion type="single" collapsible className="mt-4">
            {filtered.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        <div className="mt-12 rounded-2xl border bg-muted/30 p-8 text-center">
          <h3 className="text-lg font-bold">Still need help?</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Our support team is here for you 24/7.
          </p>
          <Button className="mt-4 rounded-full" asChild>
            <a href="mailto:support@example.com">Contact us</a>
          </Button>
        </div>
      </main>
    </div>
  );
}
