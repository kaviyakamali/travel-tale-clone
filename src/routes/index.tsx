import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AiSuggest } from "@/components/AiSuggest";
import { Categories } from "@/components/Categories";
import { AdvancedFilters, DEFAULT_FILTERS, type Filters } from "@/components/AdvancedFilters";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertySkeleton } from "@/components/PropertySkeleton";
import { PropertyDetailsDialog } from "@/components/PropertyDetailsDialog";
import { Experiences } from "@/components/Experiences";
import { Hosting } from "@/components/Hosting";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { properties, type Property } from "@/data/properties";
import { useWishlist } from "@/hooks/useWishlist";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wanderly — Book unique homes & experiences" },
      {
        name: "description",
        content:
          "Discover and book unique stays and experiences around the world — beachfronts, cabins, treehouses, luxury villas and more, with AI-powered trip suggestions.",
      },
      { property: "og:title", content: "Wanderly — Book unique homes & experiences" },
      {
        property: "og:description",
        content: "Discover and book unique stays and experiences around the world.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Property | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toggle, isSaved, count } = useWishlist();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const activeFilterCount = useMemo(() => {
    let n = 0;
    if (filters.priceMax < DEFAULT_FILTERS.priceMax) n++;
    if (filters.minGuests > DEFAULT_FILTERS.minGuests) n++;
    if (filters.superhostOnly) n++;
    if (filters.sort !== DEFAULT_FILTERS.sort) n++;
    return n;
  }, [filters]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = properties.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const matchesSearch =
        !q ||
        p.location.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      const matchesPrice = p.price <= filters.priceMax;
      const matchesGuests = p.guests >= filters.minGuests;
      const matchesSuperhost = !filters.superhostOnly || p.superhost;
      return matchesCategory && matchesSearch && matchesPrice && matchesGuests && matchesSuperhost;
    });

    const sorted = [...list];
    if (filters.sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    else if (filters.sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    else if (filters.sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [search, category, filters]);

  const openDetails = (p: Property) => {
    setSelected(p);
    setDialogOpen(true);
  };

  const handleAiPick = (searchQuery: string, cat: string) => {
    setSearch(searchQuery);
    const known = properties.some((p) => p.category === cat);
    setCategory(known ? cat : "All");
    document.getElementById("stays")?.scrollIntoView({ behavior: "smooth" });
  };

  const resetAll = () => {
    setSearch("");
    setCategory("All");
    setFilters(DEFAULT_FILTERS);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar search={search} onSearch={setSearch} wishlistCount={count} />
      <Hero />
      <AiSuggest onPick={handleAiPick} />
      <Categories active={category} onSelect={setCategory} />

      <main id="stays" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              {category === "All" ? "Stays for you" : category}
            </h2>
            <p className="text-muted-foreground">{filtered.length} homes available</p>
          </div>
          <AdvancedFilters
            filters={filters}
            onChange={setFilters}
            activeCount={activeFilterCount}
          />
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <PropertySkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center gap-3 py-24 text-center"
          >
            <SearchX className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold">No stays found</h3>
            <p className="text-muted-foreground">Try a different destination or relax your filters.</p>
            <Button variant="outline" className="rounded-full" onClick={resetAll}>
              Clear all
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p, i) => (
              <PropertyCard
                key={p.id}
                property={p}
                index={i}
                saved={isSaved(p.id)}
                onToggleWishlist={toggle}
                onOpen={openDetails}
              />
            ))}
          </div>
        )}
      </main>

      <Experiences />
      <Hosting />
      <Footer />

      <PropertyDetailsDialog
        property={selected}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        saved={selected ? isSaved(selected.id) : false}
        onToggleWishlist={toggle}
      />
      <ScrollToTop />
    </div>
  );
}
