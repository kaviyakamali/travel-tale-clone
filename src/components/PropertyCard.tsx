import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import type { Property } from "@/data/properties";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  property: Property;
  saved: boolean;
  onToggleWishlist: (id: number) => void;
  onOpen: (p: Property) => void;
  index?: number;
}

export function PropertyCard({
  property,
  saved,
  onToggleWishlist,
  onOpen,
  index = 0,
}: PropertyCardProps) {
  const images = property.gallery.length ? property.gallery : [property.image];
  const [active, setActive] = useState(0);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.06 }}
      whileHover={{ y: -4 }}
      className="group cursor-pointer"
      onClick={() => onOpen(property)}
      onMouseLeave={() => setActive(0)}
    >
      <div className="relative overflow-hidden rounded-2xl shadow-sm transition-shadow duration-300 group-hover:shadow-xl">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={property.title}
            loading="lazy"
            className={`aspect-square w-full object-cover transition-all duration-500 group-hover:scale-105 ${
              i === active ? "opacity-100" : "absolute inset-0 opacity-0"
            }`}
          />
        ))}

        {/* subtle gradient on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {property.superhost && (
          <Badge variant="secondary" className="absolute left-3 top-3 bg-background/90 font-semibold">
            Superhost
          </Badge>
        )}
        <button
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(property.id);
          }}
          className="absolute right-3 top-3 rounded-full p-1.5 transition-transform hover:scale-110 active:scale-90"
        >
          <Heart
            className={`h-6 w-6 drop-shadow ${
              saved ? "fill-primary text-primary" : "fill-black/30 text-white"
            }`}
          />
        </button>

        {/* gallery dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {images.map((src, i) => (
              <button
                key={src}
                aria-label={`Show image ${i + 1}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(i);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-4 bg-white" : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-3 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate font-semibold">{property.location}</h3>
          <span className="flex shrink-0 items-center gap-1 text-sm">
            <Star className="h-3.5 w-3.5 fill-current" />
            {property.rating}
          </span>
        </div>
        <p className="truncate text-sm text-muted-foreground">{property.title}</p>
        <div className="flex items-center gap-2 pt-1">
          <Avatar className="h-5 w-5">
            <AvatarImage src={property.hostAvatar} alt={property.host} />
            <AvatarFallback className="text-[10px]">{property.host[0]}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground">Hosted by {property.host}</span>
        </div>
        <p className="pt-1 text-sm">
          <span className="font-semibold">${property.price}</span>
          <span className="text-muted-foreground"> night</span>
        </p>
      </div>
    </motion.article>
  );
}
