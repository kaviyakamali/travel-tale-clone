import { useMemo, useState } from "react";
import { addDays, differenceInCalendarDays, format } from "date-fns";
import { CalendarIcon, Minus, Plus, Star } from "lucide-react";
import type { DateRange } from "react-day-picker";
import type { Property } from "@/data/properties";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export function BookingCard({ property }: { property: Property }) {
  const [range, setRange] = useState<DateRange | undefined>({
    from: addDays(new Date(), 3),
    to: addDays(new Date(), 8),
  });
  const [guests, setGuests] = useState(2);

  const nights = useMemo(() => {
    if (range?.from && range?.to) {
      return Math.max(1, differenceInCalendarDays(range.to, range.from));
    }
    return 0;
  }, [range]);

  const subtotal = nights * property.price;
  const cleaning = nights ? 65 : 0;
  const serviceFee = Math.round(subtotal * 0.12);
  const total = subtotal + cleaning + serviceFee;

  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="flex items-baseline justify-between">
        <p>
          <span className="text-xl font-bold">${property.price}</span>
          <span className="text-muted-foreground"> / night</span>
        </p>
        <span className="flex items-center gap-1 text-sm">
          <Star className="h-3.5 w-3.5 fill-current" /> {property.rating} · {property.reviews}
        </span>
      </div>

      <div className="mt-4 space-y-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !range?.from && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {range?.from
                ? range.to
                  ? `${format(range.from, "MMM d")} – ${format(range.to, "MMM d")}`
                  : format(range.from, "MMM d")
                : "Select dates"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={range}
              onSelect={setRange}
              numberOfMonths={1}
              disabled={{ before: new Date() }}
              initialFocus
              className={cn("pointer-events-auto p-3")}
            />
          </PopoverContent>
        </Popover>

        <div className="flex items-center justify-between rounded-lg border px-4 py-2.5">
          <div>
            <p className="text-sm font-medium">Guests</p>
            <p className="text-xs text-muted-foreground">Max {property.guests}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 rounded-full"
              disabled={guests <= 1}
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
              aria-label="Decrease guests"
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-5 text-center text-sm font-semibold">{guests}</span>
            <Button
              size="icon"
              variant="outline"
              className="h-8 w-8 rounded-full"
              disabled={guests >= property.guests}
              onClick={() => setGuests((g) => Math.min(property.guests, g + 1))}
              aria-label="Increase guests"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {nights > 0 && (
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>${property.price} × {nights} nights</span>
            <span>${subtotal}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Cleaning fee</span>
            <span>${cleaning}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Service fee</span>
            <span>${serviceFee}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </div>
      )}

      <Button
        className="mt-4 w-full rounded-full font-semibold"
        disabled={nights === 0}
        onClick={() =>
          toast.success(
            `Reserved ${property.title} for ${guests} guest${guests > 1 ? "s" : ""}, ${nights} nights — $${total}! 🎉`,
          )
        }
      >
        Reserve
      </Button>
      <p className="mt-2 text-center text-xs text-muted-foreground">You won't be charged yet</p>
    </div>
  );
}
