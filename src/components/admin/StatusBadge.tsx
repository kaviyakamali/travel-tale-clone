import { cn } from "@/lib/utils";

const map: Record<string, string> = {
  Confirmed: "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Active: "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Verified: "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  Pending: "bg-amber-500/12 text-amber-600 dark:text-amber-400 border-amber-500/20",
  Cancelled: "bg-destructive/12 text-destructive border-destructive/20",
  Suspended: "bg-destructive/12 text-destructive border-destructive/20",
  Rejected: "bg-destructive/12 text-destructive border-destructive/20",
  Inactive: "bg-muted text-muted-foreground border-border",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        map[status] ?? "bg-muted text-muted-foreground border-border",
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}
