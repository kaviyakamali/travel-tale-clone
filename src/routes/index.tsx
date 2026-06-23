import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { SearchX } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Categories } from "@/components/Categories";
import { PropertyCard } from "@/components/PropertyCard";
import { PropertySkeleton } from "@/components/PropertySkeleton";
import { PropertyDetailsDialog } from "@/components/PropertyDetailsDialog";
import { Experiences } from "@/components/Experiences";
import { Hosting } from "@/components/Hosting";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { properties, type Property } from "@/data/properties";
import { useWishlist } from "@/hooks/useWishlist";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Wanderly — Book unique homes &amp; experiences" },
      {
        name: "description",
        content:
          "Discover and book unique stays and experiences around the world — beachfronts, cabins, treehouses, luxury villas and more.",
      },
      { property: "og:title", content: "Wanderly — Book unique homes &amp; experiences" },
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
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Property | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toggle, isSaved, count } = useWishlist();

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      const matchesCategory = category === "All" || p.category === category;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        p.location.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [search, category]);

  const openDetails = (p: Property) => {
    setSelected(p);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar search={search} onSearch={setSearch} wishlistCount={count} />
      <Hero />
      <Categories active={category} onSelect={setCategory} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              {category === "All" ? "Stays for you" : category}
            </h2>
            <p className="text-muted-foreground">{filtered.length} homes available</p>
          </div>
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
            <p className="text-muted-foreground">Try a different destination or category.</p>
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
