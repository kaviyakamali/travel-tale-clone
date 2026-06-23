import { SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export type SortOption = "recommended" | "price-asc" | "price-desc" | "rating";

export interface Filters {
  priceMax: number;
  minGuests: number;
  superhostOnly: boolean;
  sort: SortOption;
}

export const DEFAULT_FILTERS: Filters = {
  priceMax: 1200,
  minGuests: 1,
  superhostOnly: false,
  sort: "recommended",
};

interface AdvancedFiltersProps {
  filters: Filters;
  onChange: (f: Filters) => void;
  activeCount: number;
}

export function AdvancedFilters({ filters, onChange, activeCount }: AdvancedFiltersProps) {
  const set = <K extends keyof Filters>(key: K, value: Filters[K]) =>
    onChange({ ...filters, [key]: value });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative gap-2 rounded-full">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {activeCount > 0 && (
            <Badge className="ml-1 h-5 min-w-5 justify-center rounded-full px-1 text-[10px]">
              {activeCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Refine your search to find the perfect stay.</SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-8 overflow-y-auto py-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Max price / night</Label>
              <span className="text-sm font-semibold">${filters.priceMax}</span>
            </div>
            <Slider
              min={100}
              max={1200}
              step={20}
              value={[filters.priceMax]}
              onValueChange={([v]) => set("priceMax", v)}
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Minimum guests</Label>
              <span className="text-sm font-semibold">{filters.minGuests}+</span>
            </div>
            <Slider
              min={1}
              max={12}
              step={1}
              value={[filters.minGuests]}
              onValueChange={([v]) => set("minGuests", v)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Superhosts only</Label>
              <p className="text-xs text-muted-foreground">Top-rated, experienced hosts</p>
            </div>
            <Switch
              checked={filters.superhostOnly}
              onCheckedChange={(v) => set("superhostOnly", v)}
            />
          </div>

          <div className="space-y-3">
            <Label>Sort by</Label>
            <Select value={filters.sort} onValueChange={(v) => set("sort", v as SortOption)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-asc">Price: low to high</SelectItem>
                <SelectItem value="price-desc">Price: high to low</SelectItem>
                <SelectItem value="rating">Top rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <SheetFooter>
          <Button variant="ghost" onClick={() => onChange(DEFAULT_FILTERS)}>
            Reset all
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
