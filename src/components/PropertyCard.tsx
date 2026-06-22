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
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: (index % 4) * 0.06 }}
      className="group cursor-pointer"
      onClick={() => onOpen(property)}
    >
      <div className="relative overflow-hidden rounded-2xl">
        <img
          src={property.image}
          alt={property.title}
          loading="lazy"
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
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
