import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import { DollarSign, TrendingUp, Wallet, PiggyBank, Sparkles, Download } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/admin/StatCard";
import { ChartCard, chartTooltipStyle } from "@/components/admin/ChartCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { revenueMonthly, sparkline } from "@/lib/admin-data";

export const Route = createFileRoute("/admin/revenue")({ component: RevenuePage });

const forecast = [
  ...revenueMonthly.map((r) => ({ month: r.month, actual: r.revenue, projected: null as number | null })),
  { month: "Jan*", actual: null, projected: 138000 },
  { month: "Feb*", actual: null, projected: 148000 },
  { month: "Mar*", actual: null, projected: 161000 },
];

function RevenuePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Revenue"
        subtitle="Income, profit and financial forecasts"
        actions={<Button onClick={() => toast.success("Revenue report exported")} className="gap-2"><Download className="h-4 w-4" />Export</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Revenue" value="$1.02M" change={25} icon={DollarSign} accent="oklch(0.62 0.18 25)" data={sparkline(1)} index={0} />
        <StatCard title="Net Profit" value="$428K" change={19} icon={PiggyBank} accent="oklch(0.68 0.15 160)" data={sparkline(2)} index={1} />
        <StatCard title="Pending Payouts" value="$64K" icon={Wallet} accent="oklch(0.72 0.15 70)" data={sparkline(3)} index={2} />
        <StatCard title="Avg. Monthly" value="$85K" change={11} icon={TrendingUp} accent="oklch(0.65 0.16 250)" data={sparkline(4)} index={3} />
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background">
          <CardContent className="flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground"><Sparkles className="h-6 w-6" /></div>
            <div className="flex-1">
              <p className="text-sm font-bold">Revenue Forecast</p>
              <p className="text-sm text-muted-foreground">Based on current trends, revenue is projected to reach <span className="font-bold text-foreground">$161K by March</span> — a 28% increase over the current quarter.</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <ChartCard title="Monthly Income & Forecast">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={forecast}>
              <defs>
                <linearGradient id="r-actual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Area type="monotone" dataKey="actual" name="Actual" stroke="var(--primary)" strokeWidth={2.5} fill="url(#r-actual)" connectNulls />
              <Area type="monotone" dataKey="projected" name="Projected" stroke="oklch(0.72 0.15 70)" strokeWidth={2.5} strokeDasharray="6 4" fill="none" connectNulls />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="Profit Overview">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueMonthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip contentStyle={chartTooltipStyle} cursor={{ fill: "var(--muted)", opacity: 0.4 }} />
              <Bar dataKey="profit" fill="oklch(0.68 0.15 160)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}
