import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  CalendarCheck, CreditCard, UserPlus, ShieldAlert, Bell, CheckCheck, Server,
} from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { notifications as seed, type NotifType } from "@/lib/admin-data";

export const Route = createFileRoute("/admin/notifications")({ component: NotificationsPage });

const icons: Record<NotifType, typeof Bell> = {
  Bookings: CalendarCheck,
  Payments: CreditCard,
  "New Users": UserPlus,
  "Host Requests": ShieldAlert,
  "System Alerts": Server,
};

const tabs: ("All" | NotifType)[] = ["All", "Bookings", "Payments", "New Users", "Host Requests", "System Alerts"];

function NotificationsPage() {
  const [rows, setRows] = useState(seed);
  const [tab, setTab] = useState<string>("All");

  const filtered = useMemo(() => (tab === "All" ? rows : rows.filter((n) => n.type === tab)), [rows, tab]);
  const unread = rows.filter((n) => n.unread).length;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        subtitle={`${unread} unread notifications`}
        actions={
          <Button variant="outline" className="gap-2" onClick={() => setRows((r) => r.map((n) => ({ ...n, unread: false })))}>
            <CheckCheck className="h-4 w-4" /> Mark all read
          </Button>
        }
      />

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList className="flex h-auto flex-wrap justify-start">
          {tabs.map((t) => (
            <TabsTrigger key={t} value={t}>{t}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="space-y-3">
        {filtered.map((n, i) => {
          const Icon = icons[n.type];
          return (
            <motion.div key={n.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
              <Card className={cn("transition-colors hover:bg-muted/40", n.unread && "border-primary/30 bg-primary/[0.03]")}>
                <CardContent className="flex items-start gap-4 p-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{n.title}</p>
                      {n.unread && <span className="h-2 w-2 rounded-full bg-primary" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{n.detail}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge variant="secondary" className="text-[10px]">{n.type}</Badge>
                    <span className="whitespace-nowrap text-xs text-muted-foreground">{n.time}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
