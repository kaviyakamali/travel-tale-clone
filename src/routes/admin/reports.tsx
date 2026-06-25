import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  CalendarCheck, Users, DollarSign, Building2, FileText, FileSpreadsheet, FileType,
} from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/reports")({ component: ReportsPage });

const reports = [
  { title: "Booking Report", desc: "Reservations, occupancy & cancellations", icon: CalendarCheck, accent: "oklch(0.62 0.18 25)", count: "3,425 records" },
  { title: "User Report", desc: "Signups, activity & demographics", icon: Users, accent: "oklch(0.65 0.16 250)", count: "15,240 records" },
  { title: "Revenue Report", desc: "Income, payouts & profit margins", icon: DollarSign, accent: "oklch(0.68 0.15 160)", count: "$1.02M total" },
  { title: "Property Report", desc: "Listings, performance & ratings", icon: Building2, accent: "oklch(0.72 0.15 70)", count: "1,280 records" },
];

const formats = [
  { label: "PDF", icon: FileText },
  { label: "Excel", icon: FileSpreadsheet },
  { label: "CSV", icon: FileType },
];

function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reports" subtitle="Generate and export platform reports" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {reports.map((r, i) => (
          <motion.div key={r.title} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-lg">
              <CardHeader className="flex flex-row items-center gap-3 space-y-0">
                <div className="grid h-12 w-12 place-items-center rounded-xl" style={{ background: `color-mix(in oklab, ${r.accent} 14%, transparent)`, color: r.accent }}>
                  <r.icon className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-base">{r.title}</CardTitle>
                  <p className="text-xs text-muted-foreground">{r.count}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">{r.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {formats.map((f) => (
                    <Button
                      key={f.label}
                      variant="outline"
                      size="sm"
                      className="gap-1.5"
                      onClick={() => toast.success(`${r.title} exported as ${f.label}`)}
                    >
                      <f.icon className="h-4 w-4" /> {f.label}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
