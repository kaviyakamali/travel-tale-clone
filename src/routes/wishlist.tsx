import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, MapPin, Star } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PropertyDetailsDialog } from "@/components/PropertyDetailsDialog";
import { Button } from "@/components/ui/button";
import { properties, type Property } from "@/data/properties";
import { useWishlist } from "@/hooks/useWishlist";
import { getCoords, osmEmbedUrl } from "@/lib/geo";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — Wanderly" },
      {
        name: "description",
        content: "All your saved stays in one place, mapped out and ready to book.",
      },
      { property: "og:title", content: "Your Wishlist — Wanderly" },
      {
        property: "og:description",
        content: "All your saved stays in one place, mapped out and ready to book.",
      },
    ],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { ids, toggle, isSaved, count } = useWishlist();
  const [selected, setSelected] = useState<Property | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [active, setActive] = useState<Property | null>(null);

  const saved = useMemo(
    () => properties.filter((p) => ids.includes(p.id)),
    [ids],
  );

  const focus = active ?? saved[0] ?? null;
  const mapUrl = focus
    ? (() => {
        const [lat, lng] = getCoords(focus.location);
        return osmEmbedUrl(lat, lng);
      })()
    : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar search="" onSearch={() => {}} wishlistCount={count} />

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Button variant="ghost" size="sm" asChild className="mb-4 rounded-full">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to stays
          </Link>
        </Button>

        <div className="mb-6 flex items-center gap-3">
          <Heart className="h-7 w-7 fill-primary text-primary" />
          <div>
            <h1 className="text-2xl font-extrabold sm:text-3xl">Your Wishlist</h1>
            <p className="text-muted-foreground">
              {saved.length} {saved.length === 1 ? "stay" : "stays"} saved
            </p>
          </div>
        </div>

        {saved.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center gap-3 py-24 text-center"
          >
            <Heart className="h-12 w-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold">No saved stays yet</h3>
            <p className="max-w-sm text-muted-foreground">
              Tap the heart on any stay to save it here and see it on the map.
            </p>
            <Button asChild className="mt-2 rounded-full">
              <Link to="/">Explore stays</Link>
            </Button>
          </motion.div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
            {/* List */}
            <div className="space-y-4">
              {saved.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  onMouseEnter={() => setActive(p)}
                  className={`flex cursor-pointer gap-4 rounded-2xl border p-3 transition-colors ${
                    focus?.id === p.id ? "border-primary bg-muted/40" : "hover:bg-muted/30"
                  }`}
                  onClick={() => {
                    setSelected(p);
                    setDialogOpen(true);
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="h-28 w-28 shrink-0 rounded-xl object-cover sm:h-32 sm:w-40"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="truncate font-semibold">{p.location}</h3>
                      <span className="flex shrink-0 items-center gap-1 text-sm">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        {p.rating}
                      </span>
                    </div>
                    <p className="truncate text-sm text-muted-foreground">{p.title}</p>
                    <p className="mt-auto text-sm">
                      <span className="font-semibold">${p.price}</span>
                      <span className="text-muted-foreground"> night</span>
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggle(p.id);
                      }}
                      className="mt-1 flex w-fit items-center gap-1 text-xs font-semibold text-primary hover:underline"
                    >
                      <Heart className="h-3.5 w-3.5 fill-primary" /> Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map */}
            <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-8rem)]">
              <div className="relative h-[360px] overflow-hidden rounded-2xl border lg:h-full">
                {mapUrl && (
                  <iframe
                    key={focus?.id}
                    title="Wishlist map"
                    src={mapUrl}
                    className="h-full w-full"
                    loading="lazy"
                  />
                )}
                {focus && (
                  <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2 rounded-xl bg-background/95 p-3 shadow-md backdrop-blur">
                    <MapPin className="h-4 w-4 shrink-0 text-primary" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{focus.location}</p>
                      <p className="truncate text-xs text-muted-foreground">{focus.title}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />

      <PropertyDetailsDialog
        property={selected}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        saved={selected ? isSaved(selected.id) : false}
        onToggleWishlist={toggle}
      />
    </div>
  );
}
