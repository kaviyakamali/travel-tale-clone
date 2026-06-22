import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const KEY = "wishlist";

export function useWishlist() {
  const [ids, setIds] = useState<number[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(KEY);
      if (stored) setIds(JSON.parse(stored));
    } catch {
      /* ignore */
    }
  }, []);

  const persist = (next: number[]) => {
    setIds(next);
    localStorage.setItem(KEY, JSON.stringify(next));
  };

  const toggle = useCallback(
    (id: number) => {
      setIds((prev) => {
        const exists = prev.includes(id);
        const next = exists ? prev.filter((x) => x !== id) : [...prev, id];
        localStorage.setItem(KEY, JSON.stringify(next));
        toast[exists ? "info" : "success"](
          exists ? "Removed from wishlist" : "Saved to wishlist",
        );
        return next;
      });
    },
    [],
  );

  const isSaved = useCallback((id: number) => ids.includes(id), [ids]);

  return { ids, toggle, isSaved, count: ids.length, persist };
}
