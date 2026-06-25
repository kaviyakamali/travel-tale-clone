import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: number;
  icon: LucideIcon;
  data?: { x: number; y: number }[];
  index?: number;
  accent?: string;
}

export function StatCard({ title, value, change, icon: Icon, data, index = 0, accent = "var(--primary)" }: StatCardProps) {
  const positive = (change ?? 0) >= 0;
  const gradId = `stat-grad-${title.replace(/\s+/g, "")}`;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      <Card className="group relative overflow-hidden p-5 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-muted-foreground">{title}</p>
            <p className="mt-1 text-2xl font-extrabold tracking-tight">{value}</p>
          </div>
          <div
            className="grid h-11 w-11 shrink-0 place-items-center rounded-xl"
            style={{ backgroundColor: `color-mix(in oklab, ${accent} 14%, transparent)`, color: accent }}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <div className="mt-3 flex items-end justify-between gap-2">
          {change !== undefined ? (
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold",
                positive ? "bg-emerald-500/12 text-emerald-600 dark:text-emerald-400" : "bg-destructive/12 text-destructive",
              )}
            >
              {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
              {positive ? "+" : ""}{change}%
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">Live total</span>
          )}

          {data && (
            <div className="h-9 w-24">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={accent} stopOpacity={0.4} />
                      <stop offset="100%" stopColor={accent} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="y" stroke={accent} strokeWidth={2} fill={`url(#${gradId})`} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
