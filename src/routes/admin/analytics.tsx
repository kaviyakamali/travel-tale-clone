import { createFileRoute } from "@tanstack/react-router";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart,
  RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend,
} from "recharts";
import { TrendingUp, Users, CalendarCheck, DollarSign } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/admin/StatCard";
import { ChartCard, chartTooltipStyle, PIE_COLORS } from "@/components/admin/ChartCard";
import {
  revenueMonthly, bookingAnalytics, categoryDistribution, userGrowth, sparkline,
} from "@/lib/admin-data";

export const Route = createFileRoute("/admin/analytics")({ component: AnalyticsPage });

const radial = [
  { name: "Occupancy", value: 78, fill: "oklch(0.62 0.18 25)" },
  { name: "Repeat", value: 64, fill: "oklch(0.68 0.15 160)" },
  { name: "Conversion", value: 52, fill: "oklch(0.65 0.16 250)" },
];

function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" subtitle="Deep insights into platform performance" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Conversion Rate" value="4.8%" change={0.6} icon={TrendingUp} accent="oklch(0.62 0.18 25)" data={sparkline(1)} index={0} />
        <StatCard title="Avg. Session" value="6m 42s" change={3} icon={Users} accent="oklch(0.65 0.16 250)" data={sparkline(2)} index={1} />
        <StatCard title="Occupancy Rate" value="78%" change={5} icon={CalendarCheck} accent="oklch(0.68 0.15 160)" data={sparkline(3)} index={2} />
        <StatCard title="Avg. Order Value" value="$1,640" change={9} icon={DollarSign} accent="oklch(0.72 0.15 70)" data={sparkline(4)} index={3} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartCard title="Revenue Overview" className="lg:col-span-2">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueMonthly}>
                <defs>
                  <linearGradient id="a-rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={2.5} fill="url(#a-rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Key Metrics">
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="30%" outerRadius="100%" data={radial} startAngle={90} endAngle={-270}>
                <RadialBar dataKey="value" cornerRadius={8} background />
                <Legend iconType="circle" layout="vertical" verticalAlign="bottom" wrapperStyle={{ fontSize: 12 }} />
                <Tooltip contentStyle={chartTooltipStyle} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Booking Analytics">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingAnalytics}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={chartTooltipStyle} cursor={{ fill: "var(--muted)", opacity: 0.4 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="bookings" fill="var(--primary)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="cancelled" fill="oklch(0.7 0.03 250)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="User Growth">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowth}>
                <defs>
                  <linearGradient id="a-ug" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.65 0.16 250)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="oklch(0.65 0.16 250)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Area type="monotone" dataKey="users" stroke="oklch(0.65 0.16 250)" strokeWidth={2.5} fill="url(#a-ug)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Category Distribution">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryDistribution} dataKey="value" nameKey="name" outerRadius={90} label>
                  {categoryDistribution.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={chartTooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <ChartCard title="Revenue Comparison (2026 vs 2025)">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueMonthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "var(--muted-foreground)" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip contentStyle={chartTooltipStyle} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="revenue" name="2026" stroke="var(--primary)" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="profit" name="Profit" stroke="oklch(0.68 0.15 160)" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="lastYear" name="2025" stroke="oklch(0.7 0.03 250)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>
    </div>
  );
}
