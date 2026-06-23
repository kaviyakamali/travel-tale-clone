import { Heart, Share, Star, Users, BedDouble, Bath } from "lucide-react";
import type { Property } from "@/data/properties";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookingCard } from "./BookingCard";
import { toast } from "sonner";

interface Props {
  property: Property | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  saved: boolean;
  onToggleWishlist: (id: number) => void;
}

export function PropertyDetailsDialog({
  property,
  open,
  onOpenChange,
  saved,
  onToggleWishlist,
}: Props) {
  if (!property) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] gap-0 overflow-y-auto p-0 sm:max-w-2xl">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="pr-8 text-xl">{property.title}</DialogTitle>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1 text-foreground">
              <Star className="h-3.5 w-3.5 fill-current" /> {property.rating}
            </span>
            · {property.reviews} reviews · {property.location}
          </p>
        </DialogHeader>

        <div className="mt-4 grid grid-cols-3 gap-1 px-6">
          <img
            src={property.gallery[0]}
            alt={property.title}
            className="col-span-2 row-span-2 aspect-square h-full w-full rounded-l-xl object-cover"
          />
          {property.gallery.slice(1, 3).map((g, i) => (
            <img
              key={i}
              src={g}
              alt={`${property.title} ${i + 2}`}
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          ))}
        </div>

        <div className="space-y-4 p-6">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {property.guests} guests</span>
            <span className="flex items-center gap-1.5"><BedDouble className="h-4 w-4" /> {property.beds} beds</span>
            <span className="flex items-center gap-1.5"><Bath className="h-4 w-4" /> {property.baths} baths</span>
            {property.superhost && <Badge variant="secondary">Superhost</Badge>}
          </div>

          <Separator />

          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={property.hostAvatar} alt={property.host} />
              <AvatarFallback>{property.host[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-semibold">Hosted by {property.host}</p>
              <p className="text-xs text-muted-foreground">Available {property.dates}</p>
            </div>
          </div>

          <p className="text-sm leading-relaxed text-muted-foreground">{property.description}</p>

          <Separator />

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 rounded-full"
              onClick={() => onToggleWishlist(property.id)}
            >
              <Heart className={`h-4 w-4 ${saved ? "fill-primary text-primary" : ""}`} />
              {saved ? "Saved" : "Save"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="gap-2 rounded-full"
              onClick={() => toast.success("Link copied!")}
            >
              <Share className="h-4 w-4" /> Share
            </Button>
          </div>

          <BookingCard property={property} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
