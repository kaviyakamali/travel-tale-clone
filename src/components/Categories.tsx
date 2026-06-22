import { motion } from "framer-motion";
import {
  Droplets,
  Flame,
  Gem,
  Home,
  Mountain,
  Tent,
  TreePine,
  Trees,
  Waves,
  Wheat,
  type LucideIcon,
} from "lucide-react";
import { categories } from "@/data/properties";

const iconMap: Record<string, LucideIcon> = {
  Mountain,
  Waves,
  TreePine,
  Home,
  Flame,
  Wheat,
  Droplets,
  Trees,
  Gem,
  Tent,
};

interface CategoriesProps {
  active: string;
  onSelect: (c: string) => void;
}

export function Categories({ active, onSelect }: CategoriesProps) {
  return (
    <section className="sticky top-16 z-30 border-b bg-background/90 backdrop-blur">
      <div className="no-scrollbar mx-auto flex max-w-7xl gap-6 overflow-x-auto px-4 py-4 sm:px-6 lg:px-8">
        {[{ name: "All", icon: "Flame" }, ...categories].map((cat) => {
          const Icon = iconMap[cat.icon] ?? Flame;
          const isActive = active === cat.name;
          return (
            <motion.button
              key={cat.name}
              whileTap={{ scale: 0.92 }}
              onClick={() => onSelect(cat.name)}
              className={`group flex shrink-0 flex-col items-center gap-2 border-b-2 pb-2 transition-colors ${
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="h-6 w-6 transition-transform group-hover:scale-110" />
              <span className="whitespace-nowrap text-xs font-medium">{cat.name}</span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
