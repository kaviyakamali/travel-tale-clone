import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Users,
  Building2,
  CalendarCheck,
  DollarSign,
  Home,
  Clock,
  Sparkles,
  TrendingUp,
  CloudSun,
  Activity as ActivityIcon,
  CheckCircle2,
  Star,
  ArrowRight,
  CreditCard,
  UserPlus,
  Server,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { StatCard } from "@/components/admin/StatCard";
import { ChartCard, chartTooltipStyle, PIE_COLORS } from "@/components/admin/ChartCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  revenueMonthly,
  bookingAnalytics,
  categoryDistribution,
  userGrowth,
  sparkline,
  bookings,
  activityFeed,
  aiInsights,
  topProperties,
} from "@/lib/admin-data";

export const Route = createFileRoute("/admin/")({ component: DashboardPage });

const activityIcon = {
  booking: CalendarCheck,
  payment: CreditCard,
  host: UserPlus,
  user: Users,
  system: Server,
};

function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [liveRevenue, setLiveRevenue] = useState(125430);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const i = setInterval(() => setLiveRevenue((v) => v + Math.floor(Math.random() * 120)), 3500);
    return () => clearInterval(i);
  }, []);

  const stats = useMemo(
    () => [
      { title: "Total Users", value: "15,240", change: 12, icon: Users, accent: "oklch(0.65 0.16 250)", data: sparkline(1) },
      { title: "Total Properties", value: "1,280", change: 8, icon: Building2, accent: "oklch(0.68 0.15 160)", data: sparkline(2) },
      { title: "Active Bookings", value: "3,425", change: 18, icon: CalendarCheck, accent: "oklch(0.72 0.15 70)", data: sparkline(3) },
      { title: "Revenue", value: `$${liveRevenue.toLocaleString()}`, change: 25, icon: DollarSign, accent: "oklch(0.62 0.18 25)", data: sparkline(4) },
      { title: "Available Properties", value: "850", icon: Home, accent: "oklch(0.6 0.16 300)", data: sparkline(5) },
      { title: "Pending Approvals", value: "47", icon: Clock, accent: "oklch(0.7 0.16 40)", data: sparkline(6) },
    ],
    [liveRevenue],
  );

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">Dashboard Overview</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" /></span>
              Live · updating in real-time
            </span>
          </p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((s, i) => (
          <StatCard key={s.title} index={i} {...s} />
        ))}
      </div>

      {/* AI insights banner */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background">
          <CardContent className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-bold">AI Insights</p>
                <p className="text-xs text-muted-foreground">Smart predictions for your platform</p>
              </div>
            </div>
            <div className="grid flex-1 gap-3 sm:grid-cols-2">
              {aiInsights.slice(0, 2).map((ins) => (
                <div key={ins.title} className="rounded-xl border border-border/60 bg-background/60 p-3 backdrop-blur">
                  <p className="text-xs font-semibold text-primary">{ins.title}</p>
                  <p className="mt-0.5 text-sm">{ins.text}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartCard title="Revenue Overview" className="lg:col-span-2" delay={0.05}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueMonthly}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip contentStyle={chartTooltipStyle} formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} />
                <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2.5} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Category Distribution" delay={0.1}>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryDistribution} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3}>
                  {categoryDistribution.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={chartTooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1.5">
            {categoryDistribution.map((c, i) => (
              <div key={c.name} className="flex items-center gap-2 text-xs">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                <span className="text-muted-foreground">{c.name}</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title="Booking Analytics" delay={0.15}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingAnalytics}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={chartTooltipStyle} cursor={{ fill: "var(--muted)", opacity: 0.4 }} />
                <Bar dataKey="bookings" fill="var(--primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="User Growth" delay={0.2}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowth}>
                <defs>
                  <linearGradient id="ug" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.65 0.16 250)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="oklch(0.65 0.16 250)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Area type="monotone" dataKey="users" stroke="oklch(0.65 0.16 250)" strokeWidth={2.5} fill="url(#ug)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Revenue Comparison" delay={0.25}>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueMonthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Line type="monotone" dataKey="revenue" name="2026" stroke="var(--primary)" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="lastYear" name="2025" stroke="oklch(0.7 0.03 250)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Lower widgets */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Recent bookings */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base font-bold">Recent Bookings</CardTitle>
            <Button asChild variant="ghost" size="sm" className="gap-1">
              <Link to="/admin/bookings">View all <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-2">
            {bookings.slice(0, 5).map((b) => (
              <div key={b.id} className="flex items-center gap-3 rounded-xl border border-border/50 p-3 transition-colors hover:bg-muted/40">
                <Avatar className="h-9 w-9">
                  <AvatarFallback className="text-xs">{b.customer.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{b.customer}</p>
                  <p className="truncate text-xs text-muted-foreground">{b.property}</p>
                </div>
                <p className="hidden text-sm font-bold sm:block">${b.amount.toLocaleString()}</p>
                <StatusBadge status={b.status} />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Activity timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-bold">
              <ActivityIcon className="h-4 w-4 text-primary" /> Activity Feed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative space-y-4 before:absolute before:left-[15px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-border">
              {activityFeed.map((a) => {
                const Icon = activityIcon[a.type];
                return (
                  <div key={a.id} className="relative flex gap-3">
                    <div className="z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="pt-0.5">
                      <p className="text-sm leading-snug">{a.text}</p>
                      <p className="text-xs text-muted-foreground">{a.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Top properties */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-bold">
              <TrendingUp className="h-4 w-4 text-primary" /> Top Performing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {topProperties.map((p, i) => (
              <div key={p.id} className="flex items-center gap-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-muted text-xs font-bold">{i + 1}</span>
                <div className="h-9 w-9 shrink-0 rounded-lg" style={{ background: `oklch(0.7 0.12 ${p.hue})` }} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{p.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{p.location}</p>
                </div>
                <span className="flex items-center gap-1 text-sm font-bold"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />{p.rating}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Weather + calendar */}
        <Card className="overflow-hidden">
          <CardHeader><CardTitle className="text-base font-bold">Today</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between rounded-xl bg-gradient-to-br from-sky-400/20 to-primary/10 p-4">
              <div>
                <p className="text-3xl font-extrabold">24°C</p>
                <p className="text-xs text-muted-foreground">Sunny · San Francisco</p>
              </div>
              <CloudSun className="h-12 w-12 text-amber-500" />
            </div>
            <MiniCalendar />
          </CardContent>
        </Card>

        {/* System health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base font-bold">
              <Server className="h-4 w-4 text-primary" /> System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "API Uptime", value: 99.98, color: "oklch(0.68 0.15 160)" },
              { label: "Server Load", value: 42, color: "oklch(0.72 0.15 70)" },
              { label: "Storage Used", value: 67, color: "oklch(0.65 0.16 250)" },
              { label: "DB Performance", value: 88, color: "oklch(0.6 0.16 300)" },
            ].map((m) => (
              <div key={m.label}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{m.label}</span>
                  <span className="font-semibold">{m.value}%</span>
                </div>
                <Progress value={m.value} className="h-2" />
              </div>
            ))}
            <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 p-2.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="h-4 w-4" /> All systems operational
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MiniCalendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();
  const cells = [...Array(first).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  return (
    <div>
      <p className="mb-2 text-sm font-semibold">
        {today.toLocaleString("default", { month: "long" })} {year}
      </p>
      <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-muted-foreground">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1 text-center text-xs">
        {cells.map((d, i) => (
          <span
            key={i}
            className={`grid h-7 place-items-center rounded-md ${
              d === today.getDate() ? "bg-primary font-bold text-primary-foreground" : d ? "hover:bg-muted" : ""
            }`}
          >
            {d ?? ""}
          </span>
        ))}
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-9 w-64" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-28 rounded-xl" />
        ))}
      </div>
      <Skeleton className="h-24 rounded-xl" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Skeleton className="h-80 rounded-xl lg:col-span-2" />
        <Skeleton className="h-80 rounded-xl" />
      </div>
    </div>
  );
}
