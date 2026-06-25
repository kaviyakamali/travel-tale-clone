import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { UserCheck, Users, ShieldCheck, Gauge, Check, X, FileText, Star } from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/admin/StatCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { hosts as seed, sparkline, type Host } from "@/lib/admin-data";

export const Route = createFileRoute("/admin/hosts")({ component: HostsPage });

function HostsPage() {
  const [rows, setRows] = useState<Host[]>(seed);

  const act = (id: string, verified: Host["verified"]) => {
    setRows((r) => r.map((h) => (h.id === id ? { ...h, verified } : h)));
    toast[verified === "Verified" ? "success" : "warning"](
      `Host ${verified === "Verified" ? "approved" : "rejected"}`,
    );
  };

  const active = rows.filter((h) => h.verified === "Verified").length;
  const pending = rows.filter((h) => h.verified === "Pending").length;
  const avgScore = Math.round(rows.reduce((a, h) => a + h.score, 0) / rows.length);

  return (
    <div className="space-y-6">
      <PageHeader title="Hosts" subtitle="Manage hosts and verification workflow" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Hosts" value={String(rows.length)} icon={Users} accent="oklch(0.65 0.16 250)" data={sparkline(1)} index={0} />
        <StatCard title="Active Hosts" value={String(active)} change={6} icon={UserCheck} accent="oklch(0.68 0.15 160)" data={sparkline(2)} index={1} />
        <StatCard title="Pending Verification" value={String(pending)} icon={ShieldCheck} accent="oklch(0.72 0.15 70)" data={sparkline(3)} index={2} />
        <StatCard title="Avg. Performance" value={`${avgScore}%`} change={4} icon={Gauge} accent="oklch(0.6 0.16 300)" data={sparkline(4)} index={3} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {rows.map((h, i) => (
          <motion.div key={h.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="text-white" style={{ background: `oklch(0.6 0.16 ${h.hue})` }}>
                    {h.name.split(" ").map((n) => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <CardTitle className="truncate text-base">{h.name}</CardTitle>
                  <p className="text-xs text-muted-foreground">{h.properties} properties</p>
                </div>
                <StatusBadge status={h.verified} />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Earnings</p>
                    <p className="font-bold">${h.earnings.toLocaleString()}</p>
                  </div>
                  <div className="rounded-lg bg-muted/50 p-3">
                    <p className="text-xs text-muted-foreground">Rating</p>
                    <p className="flex items-center gap-1 font-bold"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />4.8</p>
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Performance Score</span>
                    <span className="font-semibold">{h.score}%</span>
                  </div>
                  <Progress value={h.score} className="h-2" />
                </div>
                {h.verified === "Pending" ? (
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 gap-1" onClick={() => act(h.id, "Verified")}><Check className="h-4 w-4" />Approve</Button>
                    <Button size="sm" variant="outline" className="flex-1 gap-1" onClick={() => act(h.id, "Rejected")}><X className="h-4 w-4" />Reject</Button>
                    <Button size="sm" variant="ghost" onClick={() => toast.info("Opening documents")}><FileText className="h-4 w-4" /></Button>
                  </div>
                ) : (
                  <Button size="sm" variant="outline" className="w-full gap-1" onClick={() => toast.info("Opening documents")}><FileText className="h-4 w-4" />View Documents</Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
