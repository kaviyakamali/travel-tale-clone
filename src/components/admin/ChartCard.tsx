import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function ChartCard({ title, action, children, className, delay = 0 }: ChartCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={className}
    >
      <Card className="h-full overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-base font-bold">{title}</CardTitle>
          {action}
        </CardHeader>
        <CardContent className={cn("pt-2")}>{children}</CardContent>
      </Card>
    </motion.div>
  );
}

export const chartTooltipStyle = {
  backgroundColor: "var(--popover)",
  border: "1px solid var(--border)",
  borderRadius: "12px",
  color: "var(--popover-foreground)",
  fontSize: "12px",
  boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
};

export const PIE_COLORS = [
  "oklch(0.62 0.18 25)",
  "oklch(0.68 0.15 160)",
  "oklch(0.65 0.16 250)",
  "oklch(0.72 0.15 70)",
  "oklch(0.6 0.16 300)",
];
